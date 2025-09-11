import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";

interface CardSummaryProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtitle?: string;
  variant?: "default" | "profit" | "loss";
}

export const CardSummary: React.FC<CardSummaryProps> = ({
  title,
  value,
  icon,
  subtitle,
  variant,
}) => {
  return (
    <Card className="trading-card-hover group bg-gray-900 border border-gray-800 text-gray-200 rounded-xl shadow-md hover:shadow-lg transition">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-gray-400">{icon}</span>
          <span className="text-sm text-gray-400">{title}</span>
        </div>

        <p
          className={cn(
            "text-2xl font-bold",
            variant === "profit" && "text-green-400",
            variant === "loss" && "text-red-500"
          )}
        >
          {value}
        </p>

        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </CardContent>
    </Card>
  );
};
