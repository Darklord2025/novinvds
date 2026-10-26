import type { ServiceKind, UnifiedService } from "@/data/userServices";

export type ServiceFilter = ServiceKind | "daily" | "all";
export const serviceFilters = [
  "all",
  "vps",
  "dedicated",
  "hourly",
  "daily",
  "multilocation",
  "hosting",
  "license",
  "network",
  "addon",
  "support",
] as const;

export function matchesServiceFilter(
  service: UnifiedService,
  filter: ServiceFilter,
) {
  if (filter === "all") return true;
  if (filter === "daily") return service.billingCycle === "Daily";
  return service.kind === filter;
}
