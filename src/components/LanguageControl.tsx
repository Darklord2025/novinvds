import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
export default function LanguageControl() {
  const { language, setLanguage } = useLanguage();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "fa" ? "en" : "fa")}
      aria-label={
        language === "fa" ? "Switch to English" : "تغییر زبان به فارسی"
      }
    >
      <Languages size={17} />
      <span>{language === "fa" ? "EN" : "فارسی"}</span>
    </Button>
  );
}
