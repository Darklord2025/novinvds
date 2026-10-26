export interface OsProduct {
  id: string;
  name: string;
  family: "linux" | "windows" | "appliance" | "hypervisor";
  versions: string[];
  editions?: string[];
  source: string;
  legacy?: string[];
}
// Reviewed 2026-10-21. These are requestable release families, not installed provider images.
export const osCatalog: OsProduct[] = [
  {
    id: "ubuntu",
    name: "Ubuntu",
    family: "linux",
    versions: ["26.04 LTS", "24.04 LTS", "22.04 LTS", "20.04 LTS"],
    legacy: ["20.04 LTS"],
    source: "https://documentation.ubuntu.com/release-notes/",
  },
  {
    id: "debian",
    name: "Debian",
    family: "linux",
    versions: ["13", "12", "11"],
    legacy: ["11"],
    source: "https://www.debian.org/releases/",
  },
  {
    id: "alma",
    name: "AlmaLinux",
    family: "linux",
    versions: ["10", "9", "8"],
    source: "https://wiki.almalinux.org/release-notes/",
  },
  {
    id: "rocky",
    name: "Rocky Linux",
    family: "linux",
    versions: ["10", "9", "8"],
    source: "https://rockylinux.org/download",
  },
  {
    id: "centos",
    name: "CentOS Stream",
    family: "linux",
    versions: ["10", "9", "8"],
    legacy: ["8"],
    source: "https://www.centos.org/centos-stream/",
  },
  {
    id: "fedora",
    name: "Fedora Server",
    family: "linux",
    versions: ["44", "43", "39", "38"],
    legacy: ["39", "38"],
    source: "https://fedoraproject.org/server/download/",
  },
  {
    id: "opensuse",
    name: "openSUSE",
    family: "linux",
    versions: ["Leap 16.0", "Leap 15.6", "Leap 15.5", "Tumbleweed"],
    legacy: ["Leap 15.6", "Leap 15.5"],
    source: "https://get.opensuse.org/leap/16.0",
  },
  {
    id: "arch",
    name: "Arch Linux",
    family: "linux",
    versions: ["Rolling"],
    source: "https://archlinux.org/download/",
  },
  {
    id: "windows-server",
    name: "Windows Server",
    family: "windows",
    versions: ["2025", "2022", "2019", "2016"],
    editions: ["Standard", "Datacenter"],
    source:
      "https://learn.microsoft.com/en-us/windows-server/get-started/editions-comparison",
  },
  {
    id: "windows-client",
    name: "Windows client",
    family: "windows",
    versions: ["11 26H2", "11 25H2", "11 24H2", "10 22H2", "10 LTSC 2021"],
    legacy: ["10 22H2"],
    editions: ["Pro", "Enterprise"],
    source:
      "https://learn.microsoft.com/en-us/windows/release-health/windows11-release-information",
  },
  {
    id: "routeros",
    name: "MikroTik RouterOS",
    family: "appliance",
    versions: ["7.x stable", "7.x long-term", "6.x legacy"],
    legacy: ["6.x legacy"],
    source: "https://mikrotik.com/download",
  },
  {
    id: "proxmox",
    name: "Proxmox VE",
    family: "hypervisor",
    versions: ["9.2", "8.4", "7.4"],
    legacy: ["7.4"],
    source:
      "https://www.proxmox.com/en/downloads/proxmox-virtual-environment/iso",
  },
  {
    id: "esxi",
    name: "VMware ESX / ESXi",
    family: "hypervisor",
    versions: ["9.x", "8.0 U3", "7.0 U3"],
    legacy: ["7.0 U3"],
    source: "https://www.vmware.com/products/cloud-infrastructure/vsphere",
  },
];
export interface OsSelection {
  family: string;
  product: string;
  version: string;
  edition: string;
}
export const emptyOs: OsSelection = {
  family: "linux",
  product: "",
  version: "",
  edition: "",
};
export function osEditions(p: OsProduct, version: string) {
  return p.id === "windows-client" && version.includes("LTSC")
    ? ["Enterprise"]
    : p.editions || [];
}
export function validOs(s: OsSelection) {
  const p = osCatalog.find((p) => p.id === s.product && p.family === s.family);
  return (
    !!p &&
    p.versions.includes(s.version) &&
    (!osEditions(p, s.version).length ||
      osEditions(p, s.version).includes(s.edition))
  );
}
export function osLabel(s: OsSelection) {
  return [osCatalog.find((p) => p.id === s.product)?.name, s.version, s.edition]
    .filter(Boolean)
    .join(" ");
}
export const controlPanels = [
  {
    id: "cp",
    name: "cPanel / WHM",
    price: 450000,
    license: "commercial",
    products: ["alma", "rocky", "ubuntu"],
    versions: ["8", "9", "22.04 LTS", "24.04 LTS"],
    source: "https://docs.cpanel.net/installation-guide/system-requirements/",
  },
  {
    id: "da",
    name: "DirectAdmin",
    price: 250000,
    license: "commercial",
    products: ["alma", "rocky", "debian", "ubuntu"],
    versions: ["8", "9", "10", "12", "13", "22.04 LTS", "24.04 LTS"],
    source:
      "https://docs.directadmin.com/getting-started/installation/overview.html",
  },
  {
    id: "plesk",
    name: "Plesk",
    price: 350000,
    license: "commercial",
    products: ["ubuntu", "debian", "alma", "rocky", "windows-server"],
    versions: ["22.04 LTS", "24.04 LTS", "12", "8", "9", "2022", "2025"],
    source:
      "https://docs.plesk.com/release-notes/obsidian/system-requirements/",
  },
  {
    id: "aapanel",
    period: "once",
    name: "aaPanel Community",
    price: 150000,
    license: "free",
    products: ["ubuntu", "debian"],
    versions: ["22.04 LTS", "24.04 LTS", "12", "13"],
    source: "https://www.aapanel.com/new/download.html",
  },
  {
    id: "aapanel-pro",
    name: "aaPanel Pro",
    price: 390000,
    period: "monthly",
    license: "commercial",
    products: ["ubuntu", "debian"],
    versions: ["22.04 LTS", "24.04 LTS", "12", "13"],
    source: "https://www.aapanel.com/new/pricing.html",
  },
  {
    id: "hestia",
    name: "HestiaCP",
    price: 0,
    license: "free",
    products: ["ubuntu", "debian"],
    versions: ["26.04 LTS", "24.04 LTS", "22.04 LTS", "12", "13"],
    source: "https://hestiacp.com/docs/introduction/getting-started",
  },
  {
    id: "cloudpanel",
    name: "CloudPanel",
    price: 0,
    license: "free",
    products: ["ubuntu", "debian"],
    versions: ["26.04 LTS", "24.04 LTS", "22.04 LTS", "12", "13"],
    source: "https://www.cloudpanel.io/docs/v2/requirements/",
  },
  {
    id: "cyberpanel",
    name: "CyberPanel / OpenLiteSpeed",
    price: 0,
    license: "free",
    products: ["ubuntu", "alma"],
    versions: ["22.04 LTS", "8", "9"],
    source: "https://cyberpanel.net/KnowledgeBase/home/install-cyberpanel/",
  },
  {
    id: "virtualmin",
    name: "Virtualmin GPL",
    price: 0,
    license: "free",
    products: ["ubuntu", "debian", "alma", "rocky"],
    versions: ["22.04 LTS", "24.04 LTS", "12", "13", "8", "9"],
    source: "https://www.virtualmin.com/docs/os-support/",
  },
];
export function panelsFor(s: OsSelection) {
  return validOs(s)
    ? controlPanels.filter(
        (p) => p.products.includes(s.product) && p.versions.includes(s.version),
      )
    : [];
}
