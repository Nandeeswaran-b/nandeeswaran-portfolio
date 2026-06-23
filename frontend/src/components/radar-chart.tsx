'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Programming', value: 0.95 },
  { name: 'Machine Learning', value: 0.92 },
  { name: 'Data Analytics', value: 0.92 },
  { name: 'Libraries', value: 0.90 },
  { name: 'Dev Tools', value: 0.88 },
  { name: 'Soft Skills', value: 0.92 },
];

export default function RadarChart() {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setAnimatedProgress(1);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const cx = 175;
  const cy = 175;
  const rMax = 110;
  const numSides = categories.length;

  // Helper to compute coordinate for a given index, radius ratio, and scale progress
  const getCoordinates = (index: number, ratio: number, scale = 1) => {
    const angle = (index * 2 * Math.PI) / numSides - Math.PI / 2;
    const x = cx + rMax * ratio * scale * Math.cos(angle);
    const y = cy + rMax * ratio * scale * Math.sin(angle);
    return { x, y };
  };

  // Generate concentric polygon grid paths
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const gridPolygons = gridLevels.map((level) => {
    const points = Array.from({ length: numSides })
      .map((_, index) => {
        const { x, y } = getCoordinates(index, level);
        return `${x},${y}`;
      })
      .join(' ');
    return points;
  });

  // Generate axis lines
  const axisLines = Array.from({ length: numSides }).map((_, index) => {
    const start = { x: cx, y: cy };
    const end = getCoordinates(index, 1.0);
    return { start, end };
  });

  // Compute points string for the data polygon with transition progress scale
  const dataPoints = categories
    .map((cat, index) => {
      const { x, y } = getCoordinates(index, cat.value, animatedProgress);
      return `${x},${y}`;
    })
    .join(' ');

  // Compute label coordinates
  const labels = categories.map((cat, index) => {
    // Offset labels slightly outwards beyond the max radius
    const { x, y } = getCoordinates(index, 1.22);
    // Alignments adjustments
    let textAnchor = 'middle';
    if (x < cx - 10) textAnchor = 'end';
    else if (x > cx + 10) textAnchor = 'start';
    
    return { name: cat.name, x, y, textAnchor };
  });

  return (
    <div className="w-full flex justify-center items-center py-4 relative">
      {/* Dynamic background glow reflection */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-44 h-44 bg-electric/5 rounded-full filter blur-xl"></div>

      <svg
        viewBox="0 0 350 350"
        className="w-full max-w-[290px] md:max-w-[320px] drop-shadow-md text-slate-800 dark:text-white"
      >
        {/* Grids Hexagons */}
        {gridPolygons.map((points, idx) => (
          <polygon
            key={idx}
            points={points}
            fill="transparent"
            stroke="currentColor"
            className="stroke-slate-200 dark:stroke-white/10"
            strokeWidth="1"
          />
        ))}

        {/* Level value texts */}
        {gridLevels.map((level, idx) => {
          const { x, y } = getCoordinates(2, level);
          return (
            <text
              key={idx}
              x={x}
              y={y + 10}
              className="text-[8px] font-mono fill-slate-400 font-semibold"
              textAnchor="middle"
            >
              {Math.round(level * 100)}%
            </text>
          );
        })}

        {/* Axis Web lines */}
        {axisLines.map((line, idx) => (
          <line
            key={idx}
            x1={line.start.x}
            y1={line.start.y}
            x2={line.end.x}
            y2={line.end.y}
            stroke="currentColor"
            className="stroke-slate-200 dark:stroke-white/10"
            strokeWidth="1.5"
            strokeDasharray="2 3"
          />
        ))}

        {/* Center Node */}
        <circle cx={cx} cy={cy} r="3" className="fill-slate-300 dark:fill-white/20" />

        {/* Data Area Polygon */}
        <motion.polygon
          points={dataPoints}
          className="fill-electric/25 stroke-electric"
          strokeWidth="2.5"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Data Vertices Markers */}
        {categories.map((cat, index) => {
          const { x, y } = getCoordinates(index, cat.value, animatedProgress);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4.5"
              className="fill-white dark:fill-slate-900 stroke-electric"
              strokeWidth="2"
            />
          );
        })}

        {/* Axis Labels */}
        {labels.map((lbl, idx) => (
          <text
            key={idx}
            x={lbl.x}
            y={lbl.y + 4}
            className="text-[9px] md:text-[10px] font-black fill-slate-600 dark:fill-slate-300 uppercase tracking-wider"
            textAnchor={lbl.textAnchor}
          >
            {lbl.name}
          </text>
        ))}
      </svg>
    </div>
  );
}
