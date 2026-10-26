import { localizedDigits } from "@/lib/localized-number";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { siteEnglish } from "@/data/siteEnglish";
export function englishText(text: string) {
  const clean = text.trim().replace(/\s+/g, " ");
  const translated = siteEnglish[clean];
  const result =
    translated === undefined ? text : text.replace(text.trim(), translated);
  return result.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}
// Translate declarative presentation only. Values, IDs, events, account data and DOM stay intact.
export default function LegacyLocale({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguage();
  function visit(node: React.ReactNode): React.ReactNode {
    if (typeof node === "string")
      return language === "fa"
        ? localizedDigits(node, true)
        : englishText(node);
    if (Array.isArray(node)) return node.map(visit);
    if (!React.isValidElement(node)) return node;
    const props: Record<string, unknown> = {};
    for (const key of [
      "title",
      "description",
      "label",
      "placeholder",
      "alt",
      "aria-label",
      "content",
    ])
      if (typeof node.props[key] === "string")
        props[key] =
          language === "fa"
            ? localizedDigits(node.props[key], true)
            : englishText(node.props[key]);
    if (language === "en" && node.props.dir === "rtl") props.dir = "ltr";
    if (typeof node.props.className === "string")
      props.className = node.props.className
        .replace(/\btext-(?:right|left)\b/g, "text-start")
        .replace(/\bml-/g, "me-")
        .replace(/\bmr-/g, "ms-");
    if (node.props.children !== undefined)
      props.children = visit(node.props.children);
    return React.cloneElement(node, props);
  }
  return <>{visit(children)}</>;
}
