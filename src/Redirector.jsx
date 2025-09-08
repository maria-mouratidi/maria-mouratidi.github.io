import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Redirector() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();

  // Map every short path to its real URL
const redirects = {
  github: "https://github.com/maria-mouratidi",
  linkedin: "www.linkedin.com/in/maria-mouratidi",
  gmail: "mailto:mouratidi.m@gmail.com",
  // "react-basics": "https://abshetty.in/learnMERN",
};


  useEffect(() => {
    const url = redirects[slug.toLowerCase()];
    if (url) {
      window.location.replace(url);
    } else {
      // If invalid path, redirect back to homepage after slight delay
      setTimeout(() => navigate("/"), 1000);
    }
  }, [slug, navigate]);

  return <h2 style={{ textAlign: "center" }}>Redirecting&hellip;</h2>;
}
