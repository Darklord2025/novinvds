import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
const files = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.tsx?$/.test(p)) files.push(p);
  }
}
walk("src");
const dict = {};
const target = [];
const missing = new Set();
const norm = (s) => s.trim().replace(/\s+/g, " ");
const persian = (s) => /[\u0600-\u06ff]/.test(s);
for (const file of files) {
  const source = fs.readFileSync(file, "utf8"),
    ast = ts.createSourceFile(
      file,
      source,
      ts.ScriptTarget.Latest,
      true,
      file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
  function pairs(n) {
    if (
      ts.isCallExpression(n) &&
      n.expression.getText(ast) === "s" &&
      n.arguments.length === 2 &&
      n.arguments.every(ts.isStringLiteral)
    )
      dict[norm(n.arguments[0].text)] = n.arguments[1].text;
    if (
      ts.isConditionalExpression(n) &&
      ts.isStringLiteral(n.whenTrue) &&
      ts.isStringLiteral(n.whenFalse) &&
      persian(n.whenTrue.text) &&
      !persian(n.whenFalse.text)
    )
      dict[norm(n.whenTrue.text)] = n.whenFalse.text;
    ts.forEachChild(n, pairs);
  }
  pairs(ast);
  if (
    !file.endsWith(".tsx") ||
    file.includes(path.join("components", "ui")) ||
    file.includes("contexts") ||
    source.includes("usePanelCopy") ||
    source.includes("useLanguage") ||
    !persian(source)
  )
    continue;
  const edits = [];
  function visit(n) {
    if (
      !source.includes("LegacyLocale") &&
      ts.isReturnStatement(n) &&
      n.expression
    ) {
      let expression = n.expression;
      while (ts.isParenthesizedExpression(expression))
        expression = expression.expression;
      if (
        ts.isJsxElement(expression) ||
        ts.isJsxFragment(expression) ||
        ts.isJsxSelfClosingElement(expression)
      ) {
        let key = "";
        if (
          ts.isJsxElement(expression) ||
          ts.isJsxSelfClosingElement(expression)
        ) {
          const attrs = ts.isJsxElement(expression)
            ? expression.openingElement.attributes
            : expression.attributes;
          const k = attrs.properties.find(
            (a) => ts.isJsxAttribute(a) && a.name.text === "key",
          );
          if (k) key = " " + k.getText(ast);
        }
        edits.push(
          {
            at: n.expression.getStart(ast),
            text: "<LegacyLocale" + key + ">{",
          },
          { at: n.expression.end, text: "}</LegacyLocale>" },
        );
      }
    }
    if (ts.isJsxText(n)) {
      const t = norm(n.text);
      if (persian(t)) missing.add(t);
    }
    if (ts.isStringLiteral(n) && persian(n.text)) missing.add(norm(n.text));
    ts.forEachChild(n, visit);
  }
  visit(ast);
  if (edits.length) {
    edits.sort((a, b) => b.at - a.at);
    let output = source;
    for (const e of edits)
      output = output.slice(0, e.at) + e.text + output.slice(e.at);
    output = "import LegacyLocale from '@/components/LegacyLocale';\n" + output;
    target.push(file);
    fs.writeFileSync(file, output);
  }
}
const extraPath='src/data/siteEnglish.ts';const existing=fs.existsSync(extraPath)?fs.readFileSync(extraPath,'utf8'):'';
const extra={};if(existing){const ast=ts.createSourceFile(extraPath,existing,ts.ScriptTarget.Latest,true);function read(n){if(ts.isVariableDeclaration(n)&&n.name.getText(ast)==='siteEnglish'&&n.initializer&&ts.isObjectLiteralExpression(n.initializer))for(const p of n.initializer.properties)if(ts.isPropertyAssignment(p)&&ts.isStringLiteral(p.initializer))extra[p.name.text]=p.initializer.text;ts.forEachChild(n,read);}read(ast);}
Object.assign(dict, extra);
fs.writeFileSync(
  "src/data/siteEnglish.ts",
  "export const siteEnglish:Record<string,string>=" +
    JSON.stringify(dict, null, 2) +
    ";\n",
);
fs.writeFileSync(
  "__review/translation-missing.json",
  JSON.stringify([...missing].filter((v) => !dict[v]).sort(), null, 2),
);
console.log(
  JSON.stringify({
    wrapped: target.length,
    dictionary: Object.keys(dict).length,
    untranslated: [...missing].filter((v) => !dict[v]).length,
  }),
);
