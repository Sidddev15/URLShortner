import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";

export default function HistoryTable({ history = [] }) {
  if (!history.length) return null;

  // Now pass the URL directly to handleCopy
  const handleCopy = (url) => {
    copy(url);
    toast.info("Copied!");
  };

  return (
    <Paper elevation={4} sx={{ mt: 5, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recent Shortened URLs
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Original URL</TableCell>
              <TableCell>Shortened URL</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ maxWidth: 200, wordBreak: "break-word" }}>
                  {item.longUrl}
                </TableCell>
                <TableCell>
                  <a href={item.shortUrl} target="_blank" rel="noreferrer">
                    {item.shortUrl}
                  </a>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Copy">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleCopy(item.shortUrl)}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Open">
                    <IconButton
                      size="small"
                      color="success"
                      onClick={() => window.open(item.shortUrl, "_blank")}
                    >
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
