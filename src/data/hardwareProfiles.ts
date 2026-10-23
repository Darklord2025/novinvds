export type Generation = 8 | 9 | 10 | 11 | 12;
export interface HardwareProfile {
  id: string;
  generation: Generation;
  board: string;
  memory: "DDR3" | "DDR4" | "DDR5";
  cpuFamily: string;
  cpuModels: string[];
  ramGB: number[];
  diskGB: number[];
  source: string;
  inventoryVerified: false;
}
const sources = {
  8: "https://www.hpe.com/psnow/doc/c04123238",
  9: "https://support.hpe.com/hpesc/public/docDisplay?docId=c04438844&docLocale=en_US&page=GUID-BAA6B1DE-DA3D-4791-9DF2-DECCBCF99398.html",
  10: "https://www.hpe.com/nz/en/collaterals/collateral.a00008180enw.html",
  11: "https://www.hpe.com/nl/en/collaterals/collateral.a50004307enw.html",
  12: "https://www.hpe.com/nl/en/collaterals/collateral.a00073551enw.html",
};
// DL380-family reference targets ONLY. Capacity choices are review targets, not DIMM/drive SKUs or validated configurations.
export const hardwareProfiles: HardwareProfile[] = [
  {
    id: "dl380p-g8",
    generation: 8,
    board: "DL380p Gen8 / v2 reference / board SKU unknown",
    memory: "DDR3",
    cpuFamily: "Xeon E5-2600 v2",
    cpuModels: ["Intel Xeon E5-2630 v2", "Intel Xeon E5-2640 v2"],
    ramGB: [16, 32, 64],
    diskGB: [250, 500, 1000],
    source:
      "https://support.hpe.com/hpesc/public/docDisplay?docId=c03235277&docLocale=en_US&page=GUID-E03B5B98-4537-4F81-8EE0-7F5A6517ADBD.html",
    inventoryVerified: false,
  },
  {
    id: "dl380-g9-v3",
    generation: 9,
    board: "DL380 Gen9 / v3 reference / board SKU unknown",
    memory: "DDR4",
    cpuFamily: "Xeon E5-2600 v3 (no mixed v3/v4)",
    cpuModels: ["Intel Xeon E5-2620 v3", "Intel Xeon E5-2640 v3"],
    ramGB: [16, 32, 64],
    diskGB: [250, 500, 1000],
    source: sources[9],
    inventoryVerified: false,
  },
  {
    id: "dl380-g9-v4",
    generation: 9,
    board: "DL380 Gen9 / v4 reference / board SKU unknown",
    memory: "DDR4",
    cpuFamily: "Xeon E5-2600 v4 (no mixed v3/v4)",
    cpuModels: ["Intel Xeon E5-2699 v4", "Intel Xeon E5-2698 v4"],
    ramGB: [16, 32, 64],
    diskGB: [250, 500, 1000],
    source: sources[9],
    inventoryVerified: false,
  },
  {
    id: "dl380-g10-first",
    generation: 10,
    board: "DL380 Gen10 / first Scalable / board SKU unknown",
    memory: "DDR4",
    cpuFamily: "1st Xeon Scalable",
    cpuModels: ["Intel Xeon Silver 4110", "Intel Xeon Silver 4108"],
    ramGB: [16, 32, 64],
    diskGB: [250, 500, 1000],
    source: sources[10],
    inventoryVerified: false,
  },
  {
    id: "dl380-g10-second",
    generation: 10,
    board: "DL380 Gen10 / second Scalable / board SKU unknown",
    memory: "DDR4",
    cpuFamily: "2nd Xeon Scalable",
    cpuModels: [
      "Intel Xeon Silver 4210",
      "Intel Xeon Silver 4208",
      "Intel Xeon Gold 6248R",
    ],
    ramGB: [16, 32, 64],
    diskGB: [250, 500, 1000],
    source: sources[10],
    inventoryVerified: false,
  },
  {
    id: "dl380-g11",
    generation: 11,
    board: "DL380 Gen11 / fifth Scalable / board SKU unknown",
    memory: "DDR5",
    cpuFamily: "4th/5th Xeon Scalable; selected models are 5th",
    cpuModels: [
      "Intel Xeon Silver 4510",
      "Intel Xeon Silver 4509Y",
      "Intel Xeon Gold 6530",
      "Intel Xeon Platinum 8592+",
    ],
    ramGB: [32, 64, 128],
    diskGB: [480, 960, 1920],
    source: sources[11],
    inventoryVerified: false,
  },
  {
    id: "dl380-g12",
    generation: 12,
    board: "DL380 Gen12 / board SKU unknown",
    memory: "DDR5",
    cpuFamily: "Xeon 6",
    cpuModels: [
      "Intel Xeon 6505P",
      "Intel Xeon 6520P",
      "Intel Xeon 6530P",
      "Intel Xeon 6747P",
      "Intel Xeon 6767P",
      "Intel Xeon 6787P",
    ],
    ramGB: [32, 64, 128],
    diskGB: [480, 960, 1920],
    source: sources[12],
    inventoryVerified: false,
  },
];
// Separate 1U reference profiles; do not reuse the DL380 chassis/drive limits.
const dl360Sources: Record<Generation, string> = {
  8: "https://www.hpe.com/psnow/doc/c04123167",
  9: "https://support.hpe.com/hpesc/public/api/document/c04441974",
  10: "https://support.hpe.com/hpesc/public/docDisplay?docId=a00018801en_us",
  11: "https://www.hpe.com/us/en/collaterals/collateral.a50004306enw.html",
  12: "https://www.hpe.com/psnow/doc/a50006984enw",
};
const dl360References = hardwareProfiles.map((p) => ({
  ...p,
  id: p.id.replace("dl380", "dl360"),
  board: p.board.replace("DL380", "DL360"),
  source: dl360Sources[p.generation],
}));
hardwareProfiles.push(...dl360References);
export interface HardwareSelection {
  generation: Generation;
  profileId: string;
  cpu: string;
  ramGB: number;
  diskGB: number;
}
export const emptyHardwareSelection = (
  generation: Generation,
): HardwareSelection => ({
  generation,
  profileId: "",
  cpu: "",
  ramGB: 0,
  diskGB: 0,
});
export function changeHardwareProfile(
  selection: HardwareSelection,
  profileId: string,
): HardwareSelection {
  const profile = hardwareProfiles.find(
    (p) => p.id === profileId && p.generation === selection.generation,
  );
  return {
    ...emptyHardwareSelection(selection.generation),
    profileId: profile?.id ?? "",
  };
}
export function validHardwareSelection(s: HardwareSelection) {
  const p = hardwareProfiles.find(
    (p) => p.id === s.profileId && p.generation === s.generation,
  );
  return (
    !!p &&
    p.cpuModels.includes(s.cpu) &&
    p.ramGB.includes(s.ramGB) &&
    s.ramGB >= 16 &&
    p.diskGB.includes(s.diskGB) &&
    s.diskGB >= 250
  );
}
export const inventoryFields = [
  "model",
  "board",
  "sku",
  "cpu",
  "ram",
  "drives",
  "backplane",
  "controller",
  "firmware",
  "power",
  "cooling",
] as const;
export type DeviceEvidence = Partial<
  Record<(typeof inventoryFields)[number], string>
> & { operatorVerified?: boolean };
export function hasDeviceEvidence(evidence: DeviceEvidence) {
  return (
    evidence.operatorVerified === true &&
    inventoryFields.every((k) => !!evidence[k]?.trim())
  );
}
