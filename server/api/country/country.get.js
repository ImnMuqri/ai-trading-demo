const cache = new Map();

const CACHE_TTL = 1000 * 60 * 10; // 10 minutes

export default defineEventHandler(async () => {
  const cacheKey = "countries";
  const now = Date.now();

  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    return cached.data;
  }

  const res = await $fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca2",
  );

  const list = res
    .filter((c) => c?.name?.common && c?.cca2)
    .map((c) => ({
      label: String(c.name.common),
      value: String(c.cca2),
    }))
    .sort((a, b) =>
      a.label.localeCompare(b.label, "en", { sensitivity: "base" }),
    );

  const data = [{ label: "Show All", value: "All" }, ...list];

  cache.set(cacheKey, {
    data,
    expiresAt: now + CACHE_TTL,
  });

  return data;
});
