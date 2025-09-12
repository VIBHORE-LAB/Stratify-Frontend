import React from "react";
import { CustomizedProps, LineProps } from "recharts";

type Point = { x: number; y: number; nav?: number };

const ColorizedLine: React.FC<CustomizedProps<LineProps, any>> = (props) => {
  // The points come inside `props.points`
  const points: Point[] = (props as any).points;

  if (!points || points.length < 2) return null;

  return (
    <g>
      {points.slice(1).map((curr, i) => {
        const prev = points[i];

        const prevNav = prev?.nav ?? prev?.y;
        const currNav = curr?.nav ?? curr?.y;

        return (
          <line
            key={i}
            x1={prev.x}
            y1={prev.y}
            x2={curr.x}
            y2={curr.y}
            stroke={currNav < prevNav ? "#f00" : "#0f0"} // red if nav drops, green if rises
            strokeWidth={3}
            strokeOpacity={0.9}
          />
        );
      })}
    </g>
  );
};

export default ColorizedLine;
