export function referralUrl(
  origin: string,
  code: string,
  path: string,
  campaign: string,
) {
  const base = new URL(origin);
  const target = new URL(path, base);
  if (
    target.origin !== base.origin ||
    !["http:", "https:"].includes(target.protocol)
  )
    throw Error("Invalid referral destination");
  target.searchParams.set("ref", code);
  target.searchParams.set("utm_source", "affiliate");
  target.searchParams.set("utm_medium", "referral");
  if (campaign) target.searchParams.set("utm_campaign", campaign.slice(0, 80));
  return target.href;
}
export const escapeMarkup = (v: string) =>
  v.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
