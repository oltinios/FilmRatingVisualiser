// client/src/SpiderChart.jsx
import React, { useState } from "react";

const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"];

export default function SpiderChart({ data }) {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });

  const size = 300;
  const center = size / 2;
  const radius = size / 2 - 40;

  const points = genres.map((genre, i) => {
    const angle = (Math.PI * 2 * i) / genres.length - Math.PI / 2;
    const value = data?.[genre] ?? 0.5;
    const x = center + Math.cos(angle) * radius * value;
    const y = center + Math.sin(angle) * radius * value;
    return [x, y];
  });

  const polygonPoints = points.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size}>
        // outer hexagon
        <polygon
          points={genres
            .map((_, i) => {
              const angle = (Math.PI * 2 * i) / genres.length - Math.PI / 2;
              const x = center + Math.cos(angle) * radius;
              const y = center + Math.sin(angle) * radius;
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#ccc"
          strokeWidth="2"
        />

        // user data polygon
        <polygon points={polygonPoints} fill="rgba(255,0,0,0.3)" stroke="red" strokeWidth="2" />

        // the corners
        {points.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={6}
            fill="red"
            onMouseEnter={(e) =>
              setTooltip({
                visible: true,
                x: e.nativeEvent.offsetX + 10,
                y: e.nativeEvent.offsetY + 10,
                text: `${genres[i]}: ${data?.[genres[i]] ?? 0}`,
              })
            }
            onMouseLeave={() => setTooltip({ ...tooltip, visible: false })}
            style={{ cursor: "pointer" }}
          />
        ))}

        // labels
        {genres.map((genre, i) => {
          const angle = (Math.PI * 2 * i) / genres.length - Math.PI / 2;
          const x = center + Math.cos(angle) * (radius + 20);
          const y = center + Math.sin(angle) * (radius + 20);
          return (
            <text key={i} x={x} y={y} fontSize="14" textAnchor="middle" alignmentBaseline="middle">
              {genre}
            </text>
          );
        })}
      </svg>

      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            top: tooltip.y,
            left: tooltip.x,
            background: "rgba(0,0,0,0.75)",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            pointerEvents: "auto",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}