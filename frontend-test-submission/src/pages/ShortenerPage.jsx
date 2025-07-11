import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { generateShortcode, isValidURL } from "../utils/helpers";
import { logEvent } from "../../logging-middleware/LoggerMiddleware";


export default function ShortenerPage() {
  const [inputs, setInputs] = useState(
    Array.from({ length: 5 }, () => ({ url: "", validity: "", custom: "" }))
  );

  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const handleShorten = () => {
    const newResults = [];
    const stored = JSON.parse(localStorage.getItem("shortLinks") || "{}");
    const now = new Date();

    inputs.forEach(({ url, validity, custom }, index) => {
      if (!url || !isValidURL(url)) {
        logEvent("INVALID_URL", { index, url });
        alert(`Invalid URL at row ${index + 1}`);
        return;
      }

      let code;

      // ✅ Handle custom shortcode
      if (custom) {
        const validCustom = /^[a-zA-Z0-9]{3,10}$/.test(custom);
        if (!validCustom) {
          logEvent("INVALID_CUSTOM_CODE", { custom });
          alert(`Custom shortcode "${custom}" is invalid. Use 3-10 alphanumeric characters.`);
          return;
        }

        if (stored[custom]) {
          logEvent("SHORTCODE_COLLISION", { custom });
          alert(`Custom shortcode "${custom}" already exists. Please choose another.`);
          return;
        }

        code = custom;
      } else {
        // ✅ Generate a unique shortcode
        do {
          code = generateShortcode();
        } while (stored[code]);
      }

      const validMin = parseInt(validity) || 30;
      const createdAt = now.toISOString();
      const expiresAt = new Date(now.getTime() + validMin * 60000).toISOString();

      stored[code] = {
        originalUrl: url,
        createdAt,
        expiresAt,
        validity: validMin,
        clicks: [],
      };

      logEvent("SHORTEN_URL", { code, url, validity: validMin });
      newResults.push({ code, url, expiresAt });
    });

    localStorage.setItem("shortLinks", JSON.stringify(stored));
    setResults(newResults);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      {inputs.map((input, i) => (
        <Grid container spacing={2} key={i} mb={2}>
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Original URL"
              value={input.url}
              onChange={(e) => handleChange(i, "url", e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Validity (min)"
              value={input.validity}
              onChange={(e) => handleChange(i, "validity", e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Custom Code"
              value={input.custom}
              onChange={(e) => handleChange(i, "custom", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Button variant="contained" onClick={handleShorten}>
        Shorten URLs
      </Button>
      <Box mt={4}>
        {results.map((r, idx) => (
          <Typography key={idx}>
            Shortened URL:{" "}
            <a href={`/${r.code}`}>
              http://localhost:3000/{r.code}
            </a>{" "}
            (expires at: {r.expiresAt})
          </Typography>
        ))}
      </Box>
    </Container>
  );
}