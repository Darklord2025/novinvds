import { Button } from "@/components/ui/button";
import { categoryLabel } from "@/lib/panel-model";
import { serviceFilters, type ServiceFilter } from "@/lib/service-filters";
import { usePanelCopy } from "./PanelPrimitives";

export default function ServiceFilters({
  value,
  onChange,
}: {
  value: ServiceFilter;
  onChange: (value: ServiceFilter) => void;
}) {
  const { fa, s } = usePanelCopy();
  return (
    <div
      role="group"
      aria-label={s("فیلتر نوع سرویس", "Service type filter")}
      dir={fa ? "rtl" : "ltr"}
      className="flex flex-wrap gap-2"
    >
      {serviceFilters.map((id) => (
        <Button
          key={id}
          size="sm"
          variant={value === id ? "default" : "outline"}
          className="rounded-full text-xs"
          aria-pressed={value === id}
          onClick={() => onChange(id)}
        >
          {id === "all"
            ? s("همه", "All")
            : id === "daily"
              ? s("روزانه", "Daily")
              : categoryLabel(id, fa)}
        </Button>
      ))}
    </div>
  );
}
