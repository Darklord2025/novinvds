import { escapeMarkup } from "./affiliate";
export const bannerSizes = [
  "970x250",
  "970x90",
  "728x90",
  "468x60",
  "320x100",
  "320x50",
  "336x280",
  "300x250",
  "250x250",
  "200x200",
  "300x600",
  "160x600",
  "120x600",
  "1080x1080",
  "1080x1920",
  "1200x628",
] as const;
export type BannerCampaign = "cloud" | "dedicated" | "domain";
export function marketingBanner({
  size,
  campaign,
  fa,
  variant = "blue",
  animated = false,
  logoData = "",
}: {
  size: string;
  campaign: BannerCampaign;
  fa: boolean;
  variant?: string;
  animated?: boolean;
  logoData?: string;
}) {
  if (!bannerSizes.includes(size as any))
    throw Error("Unsupported banner size");
  const [w, h] = size.split("x").map(Number),
    wide = w / h > 3,
    tall = h / w > 1.7,
    tiny = h <= 100,
    base = Math.min(w, h),
    scale = base / 300;
  const colors =
    variant === "dark"
      ? ["#080f24", "#202a50", "#67e8f9"]
      : variant === "light"
        ? ["#eff6ff", "#dbeafe", "#2563eb"]
        : ["#123dcc", "#5b21b6", "#a3e635"];
  const light = variant === "light",
    fg = light ? "#172554" : "#ffffff",
    muted = light ? "#475569" : "#c7d2fe";
  const copy = {
    cloud: {
      fa: [
        "ایده‌ات را آنلاین کن",
        "زیرساختی برای رشد کسب‌وکار",
        "سرور مجازی و خدمات ابری",
        "انتخاب سرور",
      ],
      en: [
        "Bring your ideas online",
        "Infrastructure built for growth",
        "Virtual servers & cloud services",
        "Explore servers",
      ],
    },
    dedicated: {
      fa: [
        "قدرت، در اختیار تو",
        "منابع فیزیکی برای کارهای بزرگ",
        "پروفایل سخت‌افزار متناسب با نیاز",
        "بررسی سرور",
      ],
      en: [
        "Power. Under your control.",
        "Physical resources for big workloads",
        "Find a hardware profile for your needs",
        "Explore hardware",
      ],
    },
    domain: {
      fa: [
        "نامت را ماندگار کن",
        "شروع برند تو، با یک دامنه",
        "ثبت و انتقال دامنه در یک پنل",
        "انتخاب دامنه",
      ],
      en: [
        "Make your name matter",
        "Your brand starts with a domain",
        "Register & transfer in one place",
        "Find a domain",
      ],
    },
  }[campaign][fa ? "fa" : "en"];
  // SVG anchors follow text direction: RTL starts at the right edge.
  const anchor = "start",
    textX = fa ? (wide ? w * 0.65 : w * 0.91) : wide ? w * 0.28 : w * 0.09,
    bodyY = wide ? h * 0.42 : tall ? h * 0.39 : h * 0.43,
    headline = tiny ? Math.max(12, h * 0.22) : Math.min(w * 0.081, h * 0.1),
    ctaW = wide ? Math.min(w * 0.25, 170) : w * 0.74,
    ctaH = tiny ? h * 0.5 : Math.min(56 * Math.max(1, scale), h * 0.12),
    ctaX = wide ? w * 0.72 : (w - ctaW) / 2,
    ctaY = wide ? (h - ctaH) / 2 : tall ? h * 0.76 : h * 0.78,
    logoW = tiny
      ? Math.min(w * 0.22, h * 2)
      : Math.min(w * 0.52, 220 * Math.max(1, scale)),
    logoX = wide ? 14 : (w - logoW) / 2,
    logoY = wide ? (h - logoW / 5) / 2 : h * 0.08;
  const title = (
    t: string,
    y: number,
    size: number,
    color = fg,
    weight = 800,
  ) =>
    `<text x="${textX}" y="${y}" text-anchor="${anchor}" direction="${fa ? "rtl" : "ltr"}" unicode-bidi="embed" fill="${color}" font-family="Vazirmatn,Tahoma,Arial,sans-serif" font-weight="${weight}" font-size="${Math.min(size, (wide ? w * 0.36 : w * 0.82) / (Math.max(t.length, 1) * 0.56))}">${escapeMarkup(t)}</text>`;
  const rackX = wide ? w * 0.04 : tall ? w * 0.22 : w * 0.6,
    rackY = tall ? h * 0.52 : h * 0.48,
    rackW = tall ? w * 0.56 : w * 0.28,
    rackH = tall ? h * 0.16 : h * 0.24;
  const rack = wide
    ? ""
    : `<g opacity=".22" transform="translate(${rackX},${rackY})">${[0, 1, 2].map((i) => `<rect x="0" y="${i * rackH * 0.34}" width="${rackW}" height="${rackH * 0.25}" rx="${8 * scale}" fill="none" stroke="${colors[2]}" stroke-width="${2 * scale}"/><circle cx="${rackW * 0.09}" cy="${i * rackH * 0.34 + rackH * 0.125}" r="${3 * scale}" fill="${colors[2]}"/><path d="M${rackW * 0.6} ${i * rackH * 0.34 + rackH * 0.125}h${rackW * 0.22}" stroke="${fg}" stroke-width="${3 * scale}"/>`).join("")}</g>`;
  const logo = logoData
    ? `<rect x="${logoX - 8}" y="${logoY - 7}" width="${logoW + 16}" height="${logoW / 5 + 14}" rx="10" fill="white"/><image x="${logoX}" y="${logoY}" width="${logoW}" height="${logoW / 5}" href="${escapeMarkup(logoData)}"/>`
    : `<text x="${logoX}" y="${logoY + logoW / 6}" fill="${fg}" font-size="${logoW / 7}" font-family="Arial" font-weight="900">NOVIN VDS</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${escapeMarkup(copy[0])}"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/></linearGradient><radialGradient id="glow"><stop stop-color="${colors[2]}" stop-opacity=".45"/><stop offset="1" stop-color="${colors[2]}" stop-opacity="0"/></radialGradient><pattern id="grid" width="${30 * scale}" height="${30 * scale}" patternUnits="userSpaceOnUse"><path d="M${30 * scale} 0H0V${30 * scale}" fill="none" stroke="${fg}" stroke-opacity=".06" stroke-width="1"/></pattern></defs><style>${animated ? ".pulse{animation:pulse 3s ease-in-out infinite}@keyframes pulse{50%{opacity:.35;transform:translateY(-4px)}}@media(prefers-reduced-motion:reduce){.pulse{animation:none}}" : ""}</style><rect width="100%" height="100%" fill="url(#bg)"/><rect width="100%" height="100%" fill="url(#grid)"/><circle class="pulse" cx="${w * 0.95}" cy="${h * 0.04}" r="${Math.max(w, h) * 0.6}" fill="url(#glow)"/><circle cx="${-w * 0.12}" cy="${h * 1.1}" r="${w * 0.7}" fill="none" stroke="${fg}" stroke-opacity=".09" stroke-width="${Math.max(2, w * 0.04)}"/>${logo}${!tiny ? title("NOVINVDS / " + campaign.toUpperCase(), bodyY - headline * 1.65, Math.max(9, headline * 0.32), colors[2], 600) : ""}${title(copy[0], bodyY, headline)}${!tiny ? title(copy[1], bodyY + headline * 0.95, headline * 0.48, muted, 400) : ""}${!wide && !tiny ? title(copy[2], bodyY + headline * 1.75, headline * 0.35, muted, 400) : ""}${rack}<g><rect x="${ctaX}" y="${ctaY}" width="${ctaW}" height="${ctaH}" rx="${Math.min(14, ctaH * 0.27)}" fill="${colors[2]}"/><text x="${ctaX + ctaW / 2}" y="${ctaY + ctaH * 0.62}" text-anchor="middle" direction="${fa ? "rtl" : "ltr"}" fill="${light ? "white" : "#101b38"}" font-size="${Math.min(18 * Math.max(1, scale), ctaH * 0.38, (ctaW * 0.84) / ((copy[3].length + 2) * 0.56))}" font-family="Vazirmatn,Tahoma,Arial" font-weight="800">${escapeMarkup(copy[3])} ${fa ? "←" : "→"}</text></g>${!wide && h > 200 ? `<text x="${w / 2}" y="${h * 0.95}" text-anchor="middle" fill="${muted}" font-size="${Math.max(9, headline * 0.31)}" font-family="Arial">NOVINVDS</text>` : ""}</svg>`;
}
export async function brandLogoData() {
  const response = await fetch("/brand/novinvds-logo.png");
  if (!response.ok) throw Error("Brand logo unavailable");
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function bannerPng(svg: string): Promise<Blob> {
  const url = URL.createObjectURL(
    new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
  );
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) throw Error("Canvas unavailable");
    context.drawImage(image, 0, 0);
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(Error("PNG unavailable"))),
        "image/png",
      ),
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}
