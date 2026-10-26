import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {resolveSupportContext,issuesFor,validateSupportContext,technicalTeam,supportIssues} from '../supabase/functions/_shared/support-routing.ts';
import {knowledgeArticles} from '../src/data/knowledgeArticles.ts';
test('troubleshooting matches the selected service and department, including no-service requests',()=>{
 assert.deepEqual(issuesFor('technical','domain').map(v=>v.id),['dns']);
 assert.deepEqual(issuesFor('technical','hosting').map(v=>v.id),['website','dns']);
 assert.deepEqual(issuesFor('technical','dedicated').map(v=>v.id),['connection']);
 assert.equal(issuesFor('technical').length,0);
 assert.ok(issuesFor('billing').some(v=>v.id==='payment'));
 assert.notEqual(technicalTeam('hosting')[0],technicalTeam('dedicated')[0]);
 assert.throws(()=>validateSupportContext('billing',{resourceKind:'domain',issueId:'connection'}));
 assert.throws(()=>validateSupportContext('invented',{}));
 assert.doesNotThrow(()=>validateSupportContext('technical',{resourceKind:'domain',issueId:'other'}));
 assert.doesNotThrow(()=>validateSupportContext('billing',{}),'legacy account-only tickets remain valid');
 for(const issue of supportIssues)assert.ok(knowledgeArticles.some(a=>a.id===issue.article),'broken troubleshooting guide '+issue.article);
});
test('PWA worker never intercepts private routes, APIs, cross-origin requests or mutations',async()=>{
 const handlers={};let stored=[],deleted=[];
 const sandbox={URL,Response,fetch:async()=>{throw Error('Offline');},caches:{open:async()=>({addAll:async urls=>stored.push(...urls)}),match:async()=>new Response('offline public help'),keys:async()=>['novinvds-public-offline-old','unrelated-app'],delete:async key=>deleted.push(key)},self:{location:{origin:'https://novinvds.test'},clients:{claim:async()=>{}},addEventListener:(name,fn)=>handlers[name]=fn}};
 vm.runInNewContext(readFileSync('public/sw.js','utf8'),sandbox);
 await new Promise((resolve,reject)=>handlers.install({waitUntil:p=>p.then(resolve,reject)}));
 assert.deepEqual([...stored],['/offline.html','/brand/app-192.png']);
 await new Promise((resolve,reject)=>handlers.activate({waitUntil:p=>p.then(resolve,reject)}));
 assert.deepEqual(deleted,['novinvds-public-offline-old']);
 for(const path of ['/user-panel','/shop/account','/shop/account?section=orders','/auth','/recover','/api/test','/functions/v1/panel-action','/auth/callback','/unknown']){
  let intercepted=false;handlers.fetch({request:{method:'GET',mode:'navigate',url:'https://novinvds.test'+path},respondWith:()=>intercepted=true});assert.equal(intercepted,false,path);
 }
 for(const request of [{method:'POST',mode:'navigate',url:'https://novinvds.test/'},{method:'GET',mode:'cors',url:'https://novinvds.test/services'},{method:'GET',mode:'navigate',url:'https://other.test/'}]){
  let intercepted=false;handlers.fetch({request,respondWith:()=>intercepted=true});assert.equal(intercepted,false);
 }
 let response;handlers.fetch({request:{method:'GET',mode:'navigate',url:'https://novinvds.test/hosting-plans?profile=test'},respondWith:p=>response=p});assert.equal(await(await response).text(),'offline public help');
});
test('install manifest icons exist at declared sizes and launch into the public site',()=>{
 const manifest=JSON.parse(readFileSync('public/manifest.webmanifest','utf8').replace(/^\uFEFF/,''));assert.equal(manifest.start_url,'/');assert.equal(manifest.display,'standalone');
 for(const icon of manifest.icons){const png=readFileSync('public'+icon.src);assert.equal(png.readUInt32BE(16),Number(icon.sizes.split('x')[0]));assert.equal(png.readUInt32BE(20),Number(icon.sizes.split('x')[1]));}
});

test('ticket context rejects unowned resources and ignores forged service labels and kinds',async()=>{
 const own=async id=>{if(id!=='mine')throw Error('Not owned');return {id:'mine',kind:'hosting',name:'My website'};};
 await assert.rejects(()=>resolveSupportContext('technical',{resourceId:'someone-else',issueId:'website'},own));
 const result=await resolveSupportContext('technical',{resourceId:'mine',resourceKind:'domain',resourceName:'Forged',issueId:'website'},own);
 assert.equal(result.resourceKind,'hosting');assert.equal(result.resourceName,'My website');
 await assert.rejects(()=>resolveSupportContext('technical',{resourceId:'mine',issueId:'connection'},own));
 assert.deepEqual(await resolveSupportContext('sales',{resourceName:'Forged',resourceKind:'dedicated',issueId:'other'},own),{issueId:'other'});
});
