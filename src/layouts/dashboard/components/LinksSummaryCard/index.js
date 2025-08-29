// src/layouts/dashboard/components/LinksSummaryCard/index.js
import React, { useEffect, useState } from "react";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { getLinksStats } from "services/links.mock";

export default function LinksSummaryCard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetch = async () => {
      try {
        const d = await getLinksStats();
        if (!mounted) return;
        setStats(d);
      } catch (err) {
        // opcional: mostrar snackbar / logger central
        // console.error("Error cargando stats de links:", err);
      }
    };

    fetch();

    return () => {
      mounted = false;
    };
  }, []);

  if (!stats) return null;

  return (
    <ComplexStatisticsCard
      color="info"
      icon="link"
      title="Mis Links"
      count={stats.totalLinks}
      percentage={{
        color: "success",
        amount: `${stats.linksThisMonth}`,
        label: "este mes",
      }}
      description={`Clicks totales: ${stats.totalClicks} • Top: ${stats.topLink.name} (${stats.topLink.clicks})`}
    />
  );
}
