// src/components/CustomAppBar.js
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function CustomAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="subtitle2" component="div">
            Date | <span style={{ fontWeight: "bold" }}>July 8, 2018</span>
          </Typography>
          <Typography variant="subtitle2" component="div">
            Client | <span style={{ fontWeight: "bold" }}>Bob</span>
          </Typography>
          <Typography variant="subtitle2" component="div">
            Type | <span style={{ fontWeight: "bold" }}>Oranges</span>
          </Typography>
          <Typography variant="subtitle2" component="div">
            Location |{" "}
            <span style={{ fontWeight: "bold" }}>North California</span>
          </Typography>
          <Typography variant="subtitle2" component="div">
            Average Tree Age - <span style={{ fontWeight: "bold" }}>14 y</span>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
