import {shopAddressInput,shopEnquiryInput,mayCancelShopOrder} from "../supabase/functions/_shared/shop-model.ts";
import {authDestination} from "../src/lib/signup-activation.ts";
import test from 'node:test';
import assert from 'node:assert/strict';
import {publicVariants,variantsFor} from '../src/data/publicCatalog.ts';
import {publicRegions,locationCountries,offerMode,offerCountry,countriesForOffers,choicesForCountry,countryOfferHref,vpsLocationCountry} from '../src/data/publicGeography.ts';
import {locations} from '../src/data/vpsCatalog.ts';
import {routedDepartment,supportCategoryForKind,resolveSupportContext,issuesFor} from '../supabase/functions/_shared/support-routing.ts';
import {equipmentTotals,equipmentProfiles} from '../src/data/equipmentStore.ts';
import {serviceAddons} from '../src/data/serviceAddons.ts';
test('every server/hosting catalog profile remains reachable through category, region and country',()=>{
 for(const family of ['vps','dedicated','hosting']){
  const all=variantsFor(family);
  for(const option of all){const mode=offerMode(option),countries=countriesForOffers(all,mode);assert.ok(countries.length,option.id);assert.ok(countries.some(c=>choicesForCountry(all,mode,c.id).some(v=>v.id===option.id)),option.id+' is not reachable');}
 }
 const ids=locationCountries.map(v=>v.id);assert.equal(new Set(ids).size,ids.length);
 for(const country of locationCountries)assert.ok(publicRegions.some(r=>r.id===country.region));
 for(const location of locations)assert.ok(ids.includes(vpsLocationCountry(location.id)),location.id);
});
test('location links keep exact profile/country and reject unlisted pairings',()=>{
 const hosting=publicVariants.find(v=>v.id==='order-hosting-custom-country-ir');
 assert.equal(offerCountry(hosting),'ir');assert.throws(()=>countryOfferHref(hosting,'us'));
 const linux=publicVariants.find(v=>v.id==='order-vps-linux');
 const url=new URL(countryOfferHref(linux,'de'),'https://novin.test');assert.equal(url.searchParams.get('profile'),linux.id);assert.equal(url.searchParams.get('country'),'de');
 assert.ok(choicesForCountry(variantsFor('vps'),'linux','ir').every(v=>v.id.endsWith('-ir')));
});
test('technical tickets route to service-specific teams, and owned kind prevents misrouting',async()=>{
 for(const [kind,category] of [['vps','vps'],['cloud','vps'],['hourly','vps'],['multilocation','vps'],['dedicated','dedicated'],['hosting','hosting'],['domain','domain'],['addon','license'],['network','network']]){
  assert.equal(supportCategoryForKind(kind),category);assert.equal(routedDepartment('technical',kind),'technical-'+category);assert.equal(routedDepartment('billing',kind),'billing');
  const context=await resolveSupportContext('technical-'+category,{resourceId:'mine',issueId:'other'},async()=>({id:'mine',kind,name:'Owned service'}));assert.equal(context.resourceKind,kind);
 }
 await assert.rejects(()=>resolveSupportContext('technical-vps',{resourceId:'mine',issueId:'other'},async()=>({id:'mine',kind:'dedicated',name:'Owned dedicated'})));
 assert.equal(issuesFor('technical-hosting','hosting').some(v=>v.id==='website'),true);
});
test('IP is an add-on and public network offerings are remote work rather than VPS plans',()=>{
 for(const addon of serviceAddons.filter(v=>v.category==='network')){const v=publicVariants.find(v=>v.id==='addon-'+addon.id);assert.equal(v.family,'addons');assert.ok(v.href.startsWith('/addons?'));}
 assert.ok(variantsFor('network').length>=5);for(const v of variantsFor('network'))assert.ok(v.id.startsWith('remote-'));
});
test('equipment preview totals use integer quantities and 10% sample VAT without live inventory claims',()=>{
 const p=equipmentProfiles[0],result=equipmentTotals([{id:p.id,quantity:2}]);assert.equal(result.subtotal,p.price*2);assert.equal(result.tax,Math.round(result.subtotal*.1));assert.equal(result.total,result.subtotal+result.tax);
 for(const quantity of [0,-1,1.5,100,NaN])assert.throws(()=>equipmentTotals([{id:p.id,quantity}]));assert.throws(()=>equipmentTotals([{id:'invented',quantity:1}]));assert.equal(equipmentTotals([]).total,0);
});

test('store account uses existing safe auth return paths and no separate credential route',()=>{
 assert.equal(authDestination('/shop/account?section=orders'),'/shop/account?section=orders');assert.equal(authDestination('//evil.example/shop/account'),'/');assert.equal(authDestination('/auth?next=/shop/account'),'/user-panel');
});
test('store enquiry accepts requirements, never browser prices or fulfillment states',()=>{
 const result=shopEnquiryInput({description:'A real equipment requirement for review',quantity:2,total_toman:1,status:'paid',tracking:'fake',user_id:'other'});assert.deepEqual(result,{description:'A real equipment requirement for review',quantity:2,addressId:null});
 assert.throws(()=>shopEnquiryInput({description:'Too short',quantity:1}));for(const quantity of [0,-1,1.5,100])assert.throws(()=>shopEnquiryInput({description:'Equipment requirement',quantity}));
 assert.equal(mayCancelShopOrder('requested'),true);for(const status of ['paid','shipped','delivered','quoted','cancelled'])assert.equal(mayCancelShopOrder(status),false);
});
test('store addresses normalize localized postcodes and discard caller identity fields',()=>{
 const address=shopAddressInput({recipient:'Example Customer',city:'Tehran',street:'Example street number 123',postalCode:'۱۲۳۴۵۶۷۸۹۰',user_id:'other',id:'forged',country:'XX'});assert.equal(address.postalCode,'1234567890');assert.equal(address.country,'IR');assert.equal('user_id' in address,false);assert.equal('id' in address,false);assert.throws(()=>shopAddressInput({recipient:'A',city:'T',street:'Short',postalCode:'123'}));
});
