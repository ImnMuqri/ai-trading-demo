export default defineNuxtPlugin(() => {
  const formatDate = (value, opts = {}) => {
    if (!value) return "N/A";

    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return "N/A";

    return new Intl.DateTimeFormat(opts.locale || "en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      ...(opts.withTime && {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }),
    }).format(date);
  };

  const formatNumber = (value, opts = {}) => {
    if (value == null || value === "") return value;

    const cleaned = String(value).replace(/[,\s£$RM₹€]/g, "");
    const num = Number(cleaned);
    if (!Number.isFinite(num)) return value;

    return new Intl.NumberFormat(opts.locale || "en-US", {
      minimumFractionDigits: opts.minFraction ?? 0,
      maximumFractionDigits: opts.maxFraction ?? 2,
    }).format(num);
  };

  return {
    provide: {
      formatDate,
      formatNumber,
    },
  };
});
