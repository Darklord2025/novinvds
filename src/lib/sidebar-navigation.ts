import type { SidebarItem } from "@/data/sidebarItems";
export function sidebarPath(items: SidebarItem[], id: string): string[] {
  for (const item of items) {
    if (item.id === id) return [item.id];
    if (item.submenu) {
      const child = sidebarPath(item.submenu, id);
      if (child.length) return [item.id, ...child];
    }
  }
  return [];
}
// Only the chosen ancestry stays expanded. Closing a branch clears its descendants.
export function toggleSidebarBranch(
  items: SidebarItem[],
  expanded: string[],
  id: string,
) {
  const path = sidebarPath(items, id);
  return expanded.includes(id) ? path.slice(0, -1) : path;
}
