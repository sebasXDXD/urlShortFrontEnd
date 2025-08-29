// src/services/links.mock.js
import { mockLinks, mockClicks } from "../mocks/dbMocks";

// devuelve todos los links (no borrados)
export const getLinks = async () => mockLinks.filter((l) => !l.is_deleted);

// últimos N links por created_at descendente
export const getRecentLinks = async (limit = 5) => {
  const sorted = [...mockLinks].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return sorted.filter((l) => !l.is_deleted).slice(0, limit);
};

// top N links por cantidad de clicks
export const getTopLinks = async (limit = 5) => {
  const counts = mockClicks.reduce((acc, c) => {
    acc[c.link_id] = (acc[c.link_id] || 0) + 1;
    return acc;
  }, {});

  const withCounts = mockLinks.map((l) => ({ ...l, clicks: counts[l.id] || 0 }));
  const sorted = withCounts.sort((a, b) => b.clicks - a.clicks);
  return sorted.slice(0, limit);
};

// estadísticas agregadas
export const getLinksStats = async () => {
  const totalLinks = mockLinks.filter((l) => !l.is_deleted).length;
  const now = new Date();

  const linksThisMonth = mockLinks.filter((l) => {
    const created = new Date(l.created_at);
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;

  const totalClicks = mockClicks.length;

  // topLink a partir de counts (sin usar for...of)
  const counts = mockClicks.reduce((acc, c) => {
    acc[c.link_id] = (acc[c.link_id] || 0) + 1;
    return acc;
  }, {});

  const topLink = mockLinks.reduce(
    (acc, l) => {
      const c = counts[l.id] || 0;
      return c > acc.clicks ? { name: l.name, clicks: c } : acc;
    },
    { name: "", clicks: 0 }
  );

  // clicks by month — últimos 9 meses (sin bucles con ++/--)
  const monthsArray = Array.from({ length: 9 }).map((_, idx) => {
    // queremos i = 8 .. 0  -> offset = 8 - idx
    const offset = 8 - idx;
    return new Date(now.getFullYear(), now.getMonth() - offset, 1);
  });

  const labels = monthsArray.map((d) => d.toLocaleString("default", { month: "short" }));

  const data = monthsArray.map(
    (m) =>
      mockClicks.filter((cl) => {
        const d = new Date(cl.created_at);
        return d.getFullYear() === m.getFullYear() && d.getMonth() === m.getMonth();
      }).length
  );

  const clicksByMonth = labels.map((lab, idx) => ({ month: lab, clicks: data[idx] }));

  return {
    totalLinks,
    linksThisMonth,
    totalClicks,
    topLink,
    clicksByMonth,
  };
};
