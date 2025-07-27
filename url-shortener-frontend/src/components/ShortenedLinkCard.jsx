import React from "react";
import {
  Paper,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Stack,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
import { QRCodeCanvas } from "qrcode.react";

export default function ShortenedLinkCard({ data }) {
  if (!data) return null;
  const { longUrl, shortUrl } = data;

  const handleCopy = () => {
    copy(shortUrl);
    toast.info("Short link copied to clipboard!");
  };

  return (
    <Paper elevation={4} sx={{ mt: 4, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        🎉 Your link is ready!
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Original:
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ wordBreak: "break-all" }}>
        {longUrl}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Shortened:
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </Typography>

        <Tooltip title="Copy to clipboard">
          <IconButton color="primary" onClick={handleCopy}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Open link">
          <IconButton
            color="success"
            onClick={() => window.open(shortUrl, "_blank")}
          >
            <OpenInNewIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box mt={3} textAlign="center">
        <Typography variant="subtitle2" gutterBottom>
          Scan QR Code
        </Typography>
        <QRCodeCanvas value={shortUrl} size={128} />
      </Box>
    </Paper>
  );
}
