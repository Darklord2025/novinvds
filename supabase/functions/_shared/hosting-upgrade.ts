export function proratedHostingUpgrade(
  currentPeriodToman: number,
  targetPeriodToman: number,
  periodStart: string,
  periodEnd: string,
  at: number = Date.now(),
) {
  if (
    ![currentPeriodToman, targetPeriodToman].every(
      (v) => Number.isSafeInteger(v) && v > 0,
    ) ||
    targetPeriodToman <= currentPeriodToman
  )
    throw Error("Only a higher priced upgrade is supported");
  const iso =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;
  if (!iso.test(periodStart) || !iso.test(periodEnd))
    throw Error("ISO billing timestamps required");
  const start = Date.parse(periodStart),
    end = Date.parse(periodEnd);
  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    !Number.isFinite(at) ||
    end <= start ||
    end - start > 370 * 86400000 ||
    at < start ||
    at >= end
  )
    throw Error("Verified active billing period required");
  const fraction = (end - at) / (end - start),
    subtotal = Math.ceil((targetPeriodToman - currentPeriodToman) * fraction),
    tax = Math.round(subtotal * 0.1);
  return {
    subtotal,
    tax,
    total: subtotal + tax,
    remainingDays: (end - at) / 86400000,
    periodDays: (end - start) / 86400000,
    fraction,
  };
}
