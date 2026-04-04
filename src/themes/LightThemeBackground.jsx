import React, { useRef, useEffect, useState } from "react";

// --- Starfield generator ---
function drawStars(ctx, width, height, starCount = 120) {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = Math.random() * 1.3 + 0.3;
    const opacity = Math.random() * 0.6 + 0.35; // Increased opacity for better visibility
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = "#9ca3af";
    ctx.shadowBlur = 2;
    ctx.shadowColor = "#9ca3af";
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

// --- Subtle light ray ---
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
          "linear-gradient(94deg, rgba(156,163,175,0.10) 0%, rgba(107,114,128,0.18) 58%, rgba(156,163,175,0.08) 100%)",
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
          <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.3" />
          <stop offset="40%" stopColor="#6b7280" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4b5563" stopOpacity="0"/>
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
                <stop offset="0%" stopColor="#6b7280" stopOpacity="0.08" />
                <stop offset="35%" stopColor="#9ca3af" stopOpacity="0.35" />
                <stop offset="80%" stopColor="#d1d5db" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0" />
              </linearGradient>
              <radialGradient id={`comet-head-${i}`} cx="50%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#6b7280" stopOpacity="1" />
                <stop offset="35%" stopColor="#9ca3af" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#d1d5db" stopOpacity="0" />
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
                filter: "blur(0.3px) drop-shadow(0 0 5px #9ca3af88)"
              }}
            />
            <circle
              cx={x2}
              cy={y2}
              r={c.headRadius}
              fill={`url(#comet-head-${i})`}
              style={{
                filter: "blur(0.3px) drop-shadow(0 0 10px #9ca3af)"
              }}
            />
          </svg>
        );
      })}
    </>
  );
}

const LightThemeBackground = ({ activeSection }) => {
  const canvasRef = useRef(null);
  const [canvasOpacity, setCanvasOpacity] = useState(1);
  const prevSectionRef = useRef(null);

  // Draw stars helper
  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    drawStars(ctx, canvas.width, canvas.height);
  };

  // On section change: fade out, redraw, fade in
  useEffect(() => {
    if (prevSectionRef.current === activeSection) return;
    const isFirst = prevSectionRef.current === null;
    prevSectionRef.current = activeSection;
    if (isFirst) return;
    setCanvasOpacity(0);
    const timer = setTimeout(() => {
      redraw();
      setCanvasOpacity(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [activeSection]);

  // Initial draw + resize
  useEffect(() => {
    redraw();
    window.addEventListener("resize", redraw);
    return () => window.removeEventListener("resize", redraw);
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
      style={{
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          pointerEvents: "none",
          opacity: canvasOpacity,
          transition: `opacity ${canvasOpacity === 0 ? '0.3s' : '1.2s'} ease-in-out`,
        }}
      />
      <MoonRay />
      <MountainSilhouette />
      <CometStreaks />
    </div>
  );
};

export default React.memo(LightThemeBackground);
