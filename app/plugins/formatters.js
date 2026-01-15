export default defineNuxtPlugin(() => {
  const formatDate = (value, opts = {}) => {
    if (!value) return "N/A";

    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return "N/A";

    return new Intl.DateTimeFormat(opts.locale || "en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      ...(opts.withTime && {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
    }).format(date);
  };

  const formatNumber = (value, opts = {}) => {
    if (value == null || value === "") return value;

    const cleaned = String(value).replace(/[,\s£$RM₹€]/g, "");
    const num = Number(cleaned);
    if (!Number.isFinite(num)) return value;

    const hasDecimals = num % 1 !== 0;

    return new Intl.NumberFormat(opts.locale || "en-US", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return {
    provide: {
      formatDate,
      formatNumber,
    },
  };
});
