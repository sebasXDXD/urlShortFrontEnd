import React, { useEffect, useState } from "react";
import { getRecentLinks } from "services/links.mock";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function RecentLinksTable() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetch = async () => {
      try {
        const d = await getRecentLinks(5);
        if (!mounted) return;
        setLinks(d);
      } catch (err) {
        // opcional: manejar el error (snackbar, log, etc.)
        // console.error("Error al obtener links recientes:", err);
      }
    };

    fetch();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Links recientes
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Short</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>Creado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {links.map((l) => (
              <TableRow key={l.id}>
                <TableCell>{l.name}</TableCell>
                <TableCell sx={{ maxWidth: 420, overflow: "hidden", textOverflow: "ellipsis" }}>
                  {l.redirect_to}
                </TableCell>
                <TableCell>{new Date(l.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
