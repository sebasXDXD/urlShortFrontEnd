// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react"; // Importa useEffect

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

// Importa la función getLinks
import { getLinks } from "../../services/links";

function Tables() {
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [linksData, setLinksData] = useState([]);
  const columns = [
    { Header: "ID", accessor: "id", width: "10%" },
    { Header: "Name", accessor: "name", width: "20%" },
    { Header: "Redirect To", accessor: "redirect_to", width: "40%" },
    { Header: "Created At", accessor: "created_at", width: "20%" },
    { Header: "User ID", accessor: "user_created_id", width: "10%" },
  ];

  // Usa useEffect para cargar los datos cuando el componente se monte
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLinks();
        setLinksData(data); // Guarda los datos en el estado
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchData();
  }, []);

  // Transforma los datos para el DataTable
  const rows = linksData.map((link) => ({
    id: link.id,
    name: (
      <a href={link.redirect_to} target="_blank" rel="noopener noreferrer">
        {link.name}
      </a>
    ),
    redirect_to: link.redirect_to,
    created_at: new Date(link.created_at).toLocaleString(),
    user_created_id: link.user_created_id,
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Links
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Pages
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
