import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logEvent } from "../../logging-middleware/LoggerMiddleware";


export default function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const allLinks = JSON.parse(localStorage.getItem("shortLinks") || "{}");
    const link = allLinks[shortcode];

    if (!link) {
      alert("Short URL not found");
      logEvent("REDIRECT_FAILED", { reason: "Shortcode not found", shortcode });
      navigate("/");
      return;
    }

    const now = new Date();
    if (new Date(link.expiresAt) < now) {
      alert("This URL has expired.");
      logEvent("REDIRECT_FAILED", { reason: "Link expired", shortcode });
      navigate("/");
      return;
    }

    const click = {
      timestamp: now.toISOString(),
      source: document.referrer || "Direct",
      location: "Unknown"
    };

    link.clicks.push(click);
    allLinks[shortcode] = link;
    localStorage.setItem("shortLinks", JSON.stringify(allLinks));

    // ✅ Correct log usage
    logEvent("CLICK", {
      shortcode,
      timestamp: click.timestamp,
      source: click.source,
      location: click.location
    });

    window.location.href = link.originalUrl;
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
}
