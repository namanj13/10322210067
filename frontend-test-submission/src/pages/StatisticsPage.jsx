import React from "react";
import { Container, Typography, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

export default function StatisticsPage() {
  const data = JSON.parse(localStorage.getItem("shortLinks") || "{}");
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Shortened URLs Stats</Typography>
      {Object.entries(data).map(([code, info]) => (
        <div key={code} style={{ marginBottom: "2rem" }}>
          <Typography variant="h6">http://localhost:3000/{code}</Typography>
          <Typography>Original: {info.originalUrl}</Typography>
          <Typography>Created: {info.createdAt}</Typography>
          <Typography>Expires: {info.expiresAt}</Typography>
          <Typography>Total Clicks: {info.clicks.length}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {info.clicks.map((click, idx) => (
                <TableRow key={idx}>
                  <TableCell>{click.timestamp}</TableCell>
                  <TableCell>{click.source}</TableCell>
                  <TableCell>{click.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </Container>
  );
}
