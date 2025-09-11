import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { EquityPoint } from "../types";

interface EquityCurveChartProps {
  data: EquityPoint[];
}

export const EquityCurveChart: React.FC<EquityCurveChartProps> = ({ data }) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
              color: "hsl(var(--popover-foreground))"
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, "NAV"]}
          />
          <ReferenceLine y={100000} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="nav" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} className="drop-shadow-glow" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
