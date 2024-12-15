// src/components/CustomLayout.js
import * as React from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CircleIcon from "@mui/icons-material/Circle";
import ListSubheader from "@mui/material/ListSubheader";
import { useParams } from "react-router-dom";

// For AppBar
import CustomAppBar from "./components/CustomAppBar";
import MapElement from "./components/MapElement";
import MapPage from "./components/MapPage";
import { useTheme } from "@mui/material/styles"; // To access the theme
import { Tab } from "@mui/material";

export default function CustomLayout() {
  // Access the current theme (dark or light)
  const theme = useTheme();
  const { blockId } = useParams();

  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      {/* AppBar stays as is */}
      <CustomAppBar />

      <Grid container spacing={2} sx={{ height: "calc(100vh - 64px)" }}>
        <Grid
          item
          size={2}
          sx={{
            overflow: "auto",
            maxHeight: "100vh",
            paddingRight: 2,
            "&::-webkit-scrollbar": {
              width: "8px", // Adjust scrollbar width
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f0f0f0", // Track color
              borderRadius: "0px", // Rounded corners
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "background.paper", // Thumb color
              borderRadius: "0px",
              border: "2px solid #f0f0f0", // Adds padding around thumb
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "background.paper", // Thumb color on hover
            },
          }}
        >
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              maxHeight: 300,
              "& ul": { padding: 0 },
              "& .MuiListItem-root": {
                paddingY: 0.5, // Adjust vertical padding for smaller spacing
              },
              "& .MuiListItemText-primary": {
                fontSize: "0.875rem", // Adjust font size for primary text
              },
              "& .MuiListItemText-secondary": {
                fontSize: "0.75rem", // Adjust font size for secondary text
                color: "text.secondary", // Set a secondary color for secondary text
              },
            }}
          >
            <ListSubheader>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "orange",
                  display: "inline-block",
                  backgroundImage: "linear-gradient(orange, orange)", // Create an orange line
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 100%", // Align the line to the bottom of the text
                  backgroundSize: "30% 3px", // Set the underline width to 30% and height to 3px
                  paddingBottom: "4px", // Add space between the text and underline
                }}
              >
                {blockId}
              </Typography>
            </ListSubheader>
            <ListItem></ListItem>
            <ListItem>
              <ListItemText primary="2,558" secondary="Number of Oranges" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="98 trees (99.0%)"
                secondary="Detected Oranges"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="6 trees (1.0%)"
                secondary="Undetected Oranges"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="210" secondary="Estimated Yield" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="29" secondary="Trees" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="14" secondary="Mean Oranges per Tree" />
            </ListItem>
            <Divider />
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                maxHeight: 300,
                "& ul": { padding: 0 },
                "& .MuiListItem-root": {
                  paddingY: 0.3, // Adjust vertical padding for smaller spacing
                },
                "& .MuiListItemText-primary": {
                  fontSize: "0.775rem", // Adjust font size for primary text
                },
                "& .MuiListItemText-secondary": {
                  fontSize: "0.65rem", // Adjust font size for secondary text
                  color: "text.secondary", // Set a secondary color for secondary text
                },
              }}
            >
              <ListItem>
                <ListItemText primary="Values" secondary="" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <CircleIcon sx={{ color: "#ff0000", fontSize: 12 }} />{" "}
                </ListItemIcon>
                <ListItemText primary="Max" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <CircleIcon sx={{ color: "#ffa700", fontSize: 12 }} />{" "}
                </ListItemIcon>
                <ListItemText primary="0.80" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <CircleIcon sx={{ color: "#fff400", fontSize: 12 }} />{" "}
                </ListItemIcon>
                <ListItemText primary="0.60" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <CircleIcon sx={{ color: "#a3ff00", fontSize: 12 }} />{" "}
                </ListItemIcon>
                <ListItemText primary="0.50" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <CircleIcon sx={{ color: "#2cba00", fontSize: 12 }} />{" "}
                </ListItemIcon>
                <ListItemText primary="0.40" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <CircleIcon sx={{ color: "#005699", fontSize: 12 }} />{" "}
                </ListItemIcon>
                <ListItemText primary="0.30" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <CircleIcon sx={{ color: "#5304d4", fontSize: 12 }} />{" "}
                </ListItemIcon>
                <ListItemText primary="0.20" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <CircleIcon sx={{ color: "#aaaaaa", fontSize: 12 }} />{" "}
                </ListItemIcon>
                <ListItemText primary="Undetected" />
              </ListItem>
            </List>
          </List>
        </Grid>
        {/* Right part with map or other content */}
        <Grid
          item
          size={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            position: "relative",
          }}
        >
          {/* MapContainer with Map */}
          <MapPage sx={{ flexGrow: 1 }} />

          {/* Paper as the overlay for dark background */}
          <Paper
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: theme.palette.background.default, // Dark background for map area
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
