import React from "react";

const LightThemeBackground = () => (
  <div className="fixed inset-0 -z-10 transition-all duration-700"
    style={{
      background: "linear-gradient(120deg, #fafdff 0%, #fefce8 60%, #e2e8f0 100%)",
      backdropFilter: "blur(28px)",
      WebkitBackdropFilter: "blur(28px)",
    }}
  />
);

export default React.memo(LightThemeBackground);
