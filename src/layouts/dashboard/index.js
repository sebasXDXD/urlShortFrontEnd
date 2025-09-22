import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import LinksSummaryCard from "layouts/dashboard/components/LinksSummaryCard";
import RecentLinksTable from "layouts/dashboard/components/RecentLinksTable";

// 👇 importar servicios reales
import {
  getLinksStats,
  getClicksByMonth,
  getTopLinks,
  getLinksCreatedByMonth,
  getRecentLinks,
} from "../../services/links";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [clicksByMonth, setClicksByMonth] = useState(null);
  const [topLinks, setTopLinks] = useState(null);
  const [linksCreatedByMonth, setLinksCreatedByMonth] = useState(null);
  const [recentLinks, setRecentLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, c, t, l, r] = await Promise.all([
          getLinksStats(),
          getClicksByMonth(),
          getTopLinks(),
          getLinksCreatedByMonth(),
          getRecentLinks(),
        ]);

        console.log("Stats response:", s);
        console.log("Clicks by month response:", c);
        console.log("Top links response:", t);
        console.log("Links created by month response:", l);
        console.log("Recent links response:", r);

        setStats(s);
        setClicksByMonth({
          labels: c.map((i) => i.month),
          datasets: { label: "Clicks", data: c.map((i) => i.clicks) },
        });
        setTopLinks({
          labels: t.map((i) => i.name),
          datasets: { label: "Clicks", data: t.map((i) => i.clicks) },
        });
        setLinksCreatedByMonth({
          labels: l.map((i) => i.month),
          datasets: { label: "Links", data: l.map((i) => i.count) },
        });
        setRecentLinks(r);
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      }
    };
    fetchData();
  }, []);

  if (!stats) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox p={3}>Cargando estadísticas...</MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* --- Top stats */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="link"
                title="Total Links"
                count={stats.TotalCreated}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "este mes",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="bar_chart"
                title="Clicks Totales"
                count={stats.TotalClicks}
                percentage={{
                  color: "success",
                  amount: "",
                  label: `Top: ${stats.MostClickedURL} (${stats.MostClickedCount})`,
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="check_circle"
                title="Links Activos"
                count={stats.TotalCreated}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "vigentes",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="today"
                title="Nuevos este mes"
                count={stats.TotalCreated}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "creados (sin filtro por mes)",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        {/* --- Charts row */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {/* Clicks por mes */}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Clicks por mes"
                  description="Tendencia de clicks en tus enlaces (últimos meses)"
                  date="actualizado recientemente"
                  chart={clicksByMonth}
                />
              </MDBox>
            </Grid>

            {/* Top enlaces */}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="success"
                  title="Top 5 enlaces"
                  description="Comparativa de los enlaces con más clicks"
                  date="actualizado recientemente"
                  chart={topLinks}
                />
              </MDBox>
            </Grid>

            {/* Links creados por mes */}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Links creados por mes"
                  description="Número de enlaces creados cada mes"
                  date="actualizado recientemente"
                  chart={linksCreatedByMonth}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        {/* --- Links resumen y tabla */}
        <MDBox mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={3}>
              <LinksSummaryCard stats={stats} />
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <RecentLinksTable links={recentLinks} />
            </Grid>
          </Grid>
        </MDBox>

        {/* --- Resto dashboard */}
        {/* <MDBox mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
