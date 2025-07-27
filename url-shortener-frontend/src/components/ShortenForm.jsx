import React, { useState } from "react";
import { Box, TextField, Button, Paper } from "@mui/material";
import { toast } from "react-toastify";
import axios from "../api/axios"; // we'll define this in api/axios.js

export default function ShortenForm({ onShortenSuccess }) {
  const [longUrl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longUrl.trim()) {
      toast.warn("Please enter a URL");
      return;
    }

    if (!isValidUrl(longUrl)) {
      toast.error("Invalid URL format");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/shorten", { longUrl }); // adjust if route is different
      const shortened = res.data.shortUrl;

      toast.success("URL shortened successfully!");
      onShortenSuccess({ longUrl, shortUrl: shortened });

      setLongUrl("");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }}>
          <TextField
            label="Enter long URL"
            variant="outlined"
            fullWidth
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
