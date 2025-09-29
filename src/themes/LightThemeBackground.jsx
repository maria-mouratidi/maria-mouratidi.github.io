import React, { useRef, useEffect, useState } from "react";

// --- Starfield generator ---
function drawStars(ctx, width, height, starCount = 80) {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height * 0.7;
    const r = Math.random() * 1.3 + 0.3;
    const opacity = Math.random() * 0.6 + 0.35; // Increased opacity for better visibility
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = "#f59e0b"; // More vibrant yellow/orange
    ctx.shadowBlur = 2;
    ctx.shadowColor = "#f59e0b";
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

// --- Moon Ray (same as dark theme but yellow colors) ---
function MoonRay() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "58%",
        width: "120vw",
        height: "140px",
        background:
          "linear-gradient(94deg, rgba(254,240,138,0.12) 0%, rgba(251,191,36,0.24) 58%, rgba(254,240,138,0.10) 100%)",
        filter: "blur(22px)",
        borderRadius: "70px",
        transform: "translate(-50%, -50%) rotate(-13deg)",
        zIndex: 3,
        pointerEvents: "none",
        opacity: 0.9,
      }}
    />
  );
}

// --- Mountain Silhouette (surface) ---
function MountainSilhouette({ width = 1920, height = 120 }) {
  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: "none",
        opacity: 0.7, // Increased opacity for better visibility
      }}
    >
      <defs>
        <linearGradient id="moonEdge" x1="0" y1="0" x2="0" y2={height}>
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" /> {/* More vibrant yellow */}
          <stop offset="40%" stopColor="#d97706" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#92400e" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path
        d={`
          M0,90
          Q420,10 810,70
          Q1200,110 1920,44
          L${width},${height} L0,${height} Z
        `}
        fill="url(#moonEdge)"
      />
    </svg>
  );
}

// --- Comets: always from top, long visible tail, sharp small head ---
const COMET_COUNT = 3;
function randomCometConfig() {
  const length = Math.random() * 60 + 90;
  const thickness = Math.random() * 0.6 + 1.1;
  const headRadius = thickness * 1.7;
  const speed = Math.random() * 0.025 + 0.035;
  const startX = Math.random() * window.innerWidth * 0.99;
  const startY = Math.random() * 8 + 1;
  const opacity = Math.random() * 0.15 + 0.75; // Increased opacity for better visibility
  return {
    x: startX,
    y: startY,
    length,
    thickness,
    headRadius,
    speed,
    opacity,
  };
}

function useCometStreaks() {
  const [comets, setComets] = useState(() =>
    Array.from({ length: COMET_COUNT }, randomCometConfig)
  );
  useEffect(() => {
    let running = true;
    let lastTime = performance.now();
    function animate(now) {
      const dt = now - lastTime;
      lastTime = now;
      setComets(current =>
        current.map((comet) => {
          const delta = comet.speed * dt;
          let newX = comet.x + delta;
          let newY = comet.y + delta;
          if (
            newX > window.innerWidth + 30 ||
            newY > window.innerHeight * 0.34 + 30
          ) {
            return randomCometConfig();
          }
          return { ...comet, x: newX, y: newY };
        })
      );
      if (running) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    return () => { running = false; };
  }, []);
  return comets;
}

function CometStreaks() {
  const comets = useCometStreaks();
  return (
    <>
      {comets.map((c, i) => {
        const dx = c.length * Math.cos(Math.PI / 4);
        const dy = c.length * Math.sin(Math.PI / 4);
        const x1 = 0, y1 = c.headRadius;
        const x2 = dx, y2 = dy + c.headRadius;

        return (
          <svg
            key={i}
            style={{
              position: "fixed",
              left: c.x,
              top: c.y,
              zIndex: 14,
              pointerEvents: "none",
              opacity: c.opacity,
              transition: "none",
            }}
            width={dx + c.headRadius * 2.2}
            height={dy + c.headRadius * 2.2}
          >
            <defs>
              <linearGradient id={`comet-tail-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.1" /> {/* More visible start */}
                <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.45" /> {/* Increased opacity */}
                <stop offset="80%" stopColor="#fde68a" stopOpacity="0.9" /> {/* More vibrant */}
                <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
              </linearGradient>
              <radialGradient id={`comet-head-${i}`} cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" /> {/* Vibrant orange center */}
                <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
              </radialGradient>
            </defs>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={`url(#comet-tail-${i})`}
              strokeWidth={c.thickness}
              strokeLinecap="round"
              style={{
                filter: "blur(0.3px) drop-shadow(0 0 5px #fbbf2488)"
              }}
            />
            <circle
              cx={x2}
              cy={y2}
              r={c.headRadius}
              fill={`url(#comet-head-${i})`}
              style={{
                filter: "blur(0.3px) drop-shadow(0 0 10px #f59e0b)"
              }}
            />
          </svg>
        );
      })}
    </>
  );
}

const LightThemeBackground = () => {
  const canvasRef = useRef(null);

  // Always fit canvas to viewport, redraw stars on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    function resizeAndDraw() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");
      drawStars(ctx, canvas.width, canvas.height);
    }
    resizeAndDraw();
    window.addEventListener("resize", resizeAndDraw);
    return () => window.removeEventListener("resize", resizeAndDraw);
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
      style={{
        background: "linear-gradient(120deg, #fafdff 0%, #fefce8 60%, #e2e8f0 100%)",
        transition: "opacity 1s cubic-bezier(.4,0,.2,1)",
        overflow: "hidden",
      }}
    >
      {/* Star field */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <MoonRay />
      <MountainSilhouette />
      <CometStreaks />
    </div>
  );
};

export default React.memo(LightThemeBackground);
