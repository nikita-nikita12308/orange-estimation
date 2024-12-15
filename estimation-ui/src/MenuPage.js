import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  LinearProgress,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

// Для демонстрації підключення сокетів
import io from "socket.io-client";

// Підключення до сервера сокетів
const socket = io("http://localhost:8000");

const BlocksPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBlock, setLoadingBlock] = useState(null);
  const [socketData, setSocketData] = useState(null);

  const fetchBlocks = async () => {
    try {
      const response = await fetch("http://localhost:8000/block-info");
      const data = await response.json();
      setBlocks(data["plot-data"]);
    } catch (error) {
      console.error("Error fetching block data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/block-info")
      .then((response) => response.json())
      .then((data) => {
        setBlocks(data["plot-data"]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching block data:", error);
        setLoading(false);
      });

    socket.on("processing-status", (data) => {
      setSocketData(data);
      setBlocks((prevBlocks) =>
        prevBlocks.map((block) =>
          block.id === data.blockId
            ? {
                ...block,
                progress: data.progress,
                processed: data.status === "Processing complete",
              }
            : block
        )
      );
      if (data.status === "Processing complete") {
        fetchBlocks();
        setLoadingBlock(null); // Знімаємо блокування після завершення обробки
      }
    });

    return () => {
      socket.off("processing-status");
    };
  }, []);

  const handleStartProcessing = (blockId) => {
    if (loadingBlock === blockId) return;

    setLoadingBlock(blockId);

    fetch(`http://localhost:8000/handle-photo/${blockId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error starting processing:", error);
      });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      {/* Меню в лівому верхньому куті */}
      <Box sx={{ position: "absolute", top: 20, left: 20 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "orange" }}>
          Choose a Block
        </Typography>
      </Box>

      {/* Статус завантаження праворуч */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        {socketData ? (
          <Typography variant="h6" sx={{ color: "green" }}>
            {`${socketData.blockId} processed. Status: ${socketData.status}`}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={Math.round(socketData.progress)}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {!isNaN(socketData?.progress)
                    ? `${Math.round(socketData.progress)}%`
                    : " "}
                </Typography>
              </Box>
            </Box>
          </Typography>
        ) : (
          <></>
        )}
      </Box>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ marginTop: 10 }}
      >
        {blocks.map((block) => (
          <Grid item xs={12} sm={6} md={4} key={block.id}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={block.image}
                alt={`Image of ${block.id}`}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {block.id}
                </Typography>

                {/* Статус обробки */}
                <Box
                  sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                >
                  {block.processed ? (
                    <CheckCircleIcon sx={{ color: "green", marginRight: 1 }} />
                  ) : loadingBlock === block.id ? (
                    <CircularProgress size={20} sx={{ marginRight: 1 }} />
                  ) : (
                    <WarningIcon sx={{ color: "red", marginRight: 1 }} />
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      color: block.processed ? "green" : "red",
                    }}
                  >
                    {block.processed
                      ? "Data Processed"
                      : loadingBlock === block.id
                      ? "Processing..."
                      : "Data Not Processed"}
                  </Typography>
                </Box>

                {/* Кнопка для обробки даних */}
                {!block.processed && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    onClick={() => handleStartProcessing(block.id)} // Передаємо blockId
                    disabled={loadingBlock === block.id}
                  >
                    {loadingBlock === block.id
                      ? "Processing..."
                      : "Process Data"}
                  </Button>
                )}

                {/* Лінк на сторінку блоку, якщо дані оброблені */}
                {block.processed && (
                  <Button
                    component={Link}
                    to={`/home/${block.id}`}
                    variant="outlined"
                    color="secondary"
                    sx={{ marginTop: 2 }}
                  >
                    Go to Block
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlocksPage;
