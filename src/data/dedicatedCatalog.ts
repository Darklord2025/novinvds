import { hardwareProfiles } from "./hardwareProfiles";
export type DriveType =
  | "SAS HDD"
  | "SATA HDD"
  | "SAS SSD"
  | "SATA SSD"
  | "NVMe SSD";
export const dedicatedModels = hardwareProfiles.map((p) => ({
  id: p.id,
  generation: p.generation,
  family: p.id.startsWith("dl360") ? "DL360" : "DL380",
  name: `HPE ${p.id.startsWith("dl360") ? "DL360" : "DL380"}${p.generation === 8 ? "p" : ""} Gen${p.generation} · ${p.cpuFamily}`,
  chassisOptions: p.id.startsWith("dl360")
    ? (["SFF8", "LFF4"] as const)
    : (["SFF8", "LFF12"] as const),
  maxGpuCount: p.id.startsWith("dl360") ? 1 : 2,
  profile: p,
  sockets: 2,
  dimmsPerCpu: p.generation >= 11 ? 16 : 12,
  ramModules:
    p.generation === 8
      ? [16]
      : p.generation === 9
        ? [16, 32]
        : p.generation === 10
          ? [16, 32, 64]
          : p.generation === 12 ? [32, 64, 128] : [16, 32, 64, 128],
  driveTypes: (p.generation < 10
    ? ["SAS HDD", "SATA HDD", "SAS SSD", "SATA SSD"]
    : [
        "SAS HDD",
        "SATA HDD",
        "SAS SSD",
        "SATA SSD",
        "NVMe SSD",
      ]) as DriveType[],
  basePrice: { 8: 900000, 9: 1400000, 10: 2800000, 11: 6500000, 12: 10500000 }[
    p.generation
  ],
}));
export interface DedicatedConfig {
  modelId: string;
  cpu: string;
  cpuCount: number;
  ramGB: number;
  ramCount: number;
  chassis: "SFF8" | "LFF4" | "LFF12";
  drives: { type: DriveType; capacityGB: number; count: number }[];
  nicGbps: number;
  nicCount: number;
  gpu: string;
  gpuCount: number;
  raid: string;
  psuCount: number;
  ipCount: number;
  bandwidthMbps: number;
  backupGB: number;
}
export function newDedicatedConfig(
  id = dedicatedModels[0].id,
): DedicatedConfig {
  const m = dedicatedModels.find((m) => m.id === id) || dedicatedModels[0];
  return {
    modelId: m.id,
    cpu: m.profile.cpuModels[0],
    cpuCount: 1,
    ramGB: m.ramModules[0],
    ramCount: 1,
    chassis: "SFF8",
    drives: [{ type: "SATA SSD", capacityGB: 480, count: 1 }],
    nicGbps: 1,
    nicCount: 1,
    gpu: "none",
    gpuCount: 0,
    raid: "none",
    psuCount: 2,
    ipCount: 1,
    bandwidthMbps: 1000,
    backupGB: 0,
  };
}
export function driveCapacities(
  type: DriveType,
  chassis: DedicatedConfig["chassis"],
) {
  return type === "SATA HDD"
    ? chassis.startsWith("LFF")
      ? [1000, 2000, 4000, 8000, 16000]
      : []
    : type === "SAS HDD"
      ? [600, 1200, 2400]
      : type === "NVMe SSD"
        ? [960, 1920, 3840, 7680]
        : [480, 960, 1920, 3840];
}
export function dedicatedErrors(c: DedicatedConfig) {
  const m = dedicatedModels.find((m) => m.id === c.modelId);
  if (!m) return ["model"];
  const e: string[] = [];
  const integer = (v: number, min: number, max: number) =>
    Number.isInteger(v) && v >= min && v <= max;
  if (
    !m.profile.cpuModels.includes(c.cpu) ||
    !integer(c.cpuCount, 1, m.sockets)
  )
    e.push("cpu");
  if (
    !m.ramModules.includes(c.ramGB) ||
    !integer(c.ramCount, 1, c.cpuCount * m.dimmsPerCpu) ||
    c.ramGB * c.ramCount < 16
  )
    e.push("ram");
  const drives = c.drives.reduce((s, d) => s + d.count, 0);
  if (
    !c.drives.length ||
    c.drives.length > 4 ||
    drives > dedicatedDriveLimit(c) ||
    !(m.chassisOptions as readonly string[]).includes(c.chassis) ||
    c.drives.some(
      (d) =>
        !m.driveTypes.includes(d.type) ||
        !driveCapacities(d.type, c.chassis).includes(d.capacityGB) ||
        !integer(d.count, 1, dedicatedDriveLimit(c)) ||
        (d.type === "NVMe SSD" && c.chassis !== "SFF8"),
    )
  )
    e.push("drives");
  const matching = c.drives.every(
    (d) =>
      d.type === c.drives[0].type && d.capacityGB === c.drives[0].capacityGB,
  );
  if (
    !["none", "RAID1", "RAID10"].includes(c.raid) ||
    (c.raid === "RAID1" && (drives < 2 || !matching)) ||
    (c.raid === "RAID10" && (drives < 4 || drives % 2 !== 0 || !matching))
  )
    e.push("raid");
  if (
    ![
      1,
      10,
      ...(m.generation >= 9 ? [25] : []),
      ...(m.generation >= 11 ? [100] : []),
    ].includes(c.nicGbps) ||
    !integer(c.nicCount, 1, 2) ||
    !["none", "16GB", "24GB", "48GB"].includes(c.gpu) ||
    !integer(c.gpuCount, 0, m.maxGpuCount) ||
    (c.gpu === "none") !== (c.gpuCount === 0) ||
    !integer(c.psuCount, 1, 2) ||
    !integer(c.ipCount, 1, 16) ||
    ![100, 1000, 10000].includes(c.bandwidthMbps) ||
    ![0, 100, 500, 1000].includes(c.backupGB)
  )
    e.push("extras");
  return e;
}
// Monthly rental proposals in Toman. Must be replaced by an operator/provider quote.
export function dedicatedUnitPrices(c: DedicatedConfig) {
  const m = dedicatedModels.find((m) => m.id === c.modelId)!;
  return {
    base: m.basePrice,
    cpu: Math.round(
      m.basePrice *
        (0.25 + Math.max(0, m.profile.cpuModels.indexOf(c.cpu)) * 0.11),
    ),
    ram:
      c.ramGB * (m.generation >= 11 ? 7000 : m.generation === 8 ? 2500 : 4000),
    nic: c.nicGbps * 12000,
    gpu:
      c.gpu === "none"
        ? 0
        : c.gpu === "16GB"
          ? 2800000
          : c.gpu === "24GB"
            ? 4800000
            : 8500000,
    psu: 180000,
    ip: 65000,
    backup: c.backupGB * 800,
    bandwidth:
      c.bandwidthMbps === 10000
        ? 1500000
        : c.bandwidthMbps === 100
          ? 0
          : 250000,
  };
}
export function driveUnitPrice(d: DedicatedConfig["drives"][number]) {
  return Math.round(
    d.capacityGB *
      {
        "SAS HDD": 120,
        "SATA HDD": 65,
        "SAS SSD": 340,
        "SATA SSD": 240,
        "NVMe SSD": 400,
      }[d.type],
  );
}
export function dedicatedEstimate(c: DedicatedConfig) {
  if (dedicatedErrors(c).length) throw Error("Invalid dedicated configuration");
  const p = dedicatedUnitPrices(c);
  return (
    p.base +
    p.cpu * c.cpuCount +
    p.ram * c.ramCount +
    c.drives.reduce((s, d) => s + driveUnitPrice(d) * d.count, 0) +
    p.nic * c.nicCount +
    p.gpu * c.gpuCount +
    p.psu * c.psuCount +
    p.ip * c.ipCount +
    p.backup +
    p.bandwidth
  );
}

export const dedicatedDriveLimit = (c: DedicatedConfig) =>
  c.chassis === "SFF8" ? 8 : c.chassis === "LFF4" ? 4 : 12;
