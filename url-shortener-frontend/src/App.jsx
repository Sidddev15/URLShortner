import { useState } from "react";
import { Container, Typography } from "@mui/material";
import ShortenForm from "./components/ShortenForm";
import ShortenedLinkCard from "./components/ShortenedLinkCard";
import HistoryTable from "./components/HistoryTable";

export default function App() {
  const [shortenedData, setShortenedData] = useState(null);
  const [history, setHistory] = useState([]);

  const handleShorten = (data) => {
    setShortenedData(data);
    setHistory((prev) => [data, ...prev].slice(0, 10)); //keep 10 max
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ mt: 5 }}>
        URL Shortener
      </Typography>

      <ShortenForm onShortenSuccess={setShortenedData} />

      {shortenedData && <ShortenedLinkCard data={shortenedData} />}
      <HistoryTable history={history} />
    </Container>
  );
}
