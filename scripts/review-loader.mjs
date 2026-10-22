import ts from 'typescript';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
const root = process.cwd();
export async function resolve(specifier, context, nextResolve) {
  let target;
  if (specifier.startsWith('@/')) target = path.join(root, 'src', specifier.slice(2));
  else if (specifier.startsWith('.') && context.parentURL?.startsWith('file:')) target = path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier);
  if (target) {
    for (const candidate of [target, target + '.ts', target + '.tsx']) {
      try { await access(candidate); if (/\.tsx?$/.test(candidate)) return {url:pathToFileURL(candidate).href,shortCircuit:true}; } catch {}
    }
  }
  return nextResolve(specifier, context);
}
export async function load(url, context, nextLoad) {
  if (/\.tsx?$/.test(url)) {
    const source = await readFile(fileURLToPath(url), 'utf8');
    return {format:'module',shortCircuit:true,source:ts.transpileModule(source,{compilerOptions:{
      target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX,
    }}).outputText};
  }
  return nextLoad(url, context);
}
