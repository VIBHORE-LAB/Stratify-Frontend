import React from "react";
import { strategyParamsMap } from "../mockdata/strategyParamsMap";


import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface StrategyParamsFormProps {
  strategy: string;
  values: Record<string, unknown>;
  onChange: (newValues: Record<string, unknown>) => void;
}

export const StrategyParamsForm: React.FC<StrategyParamsFormProps> = ({
  strategy,
  values,
  onChange,
}) => {
  const fields = strategyParamsMap[strategy] || [];

  return (
    <Card className="bg-[#0F0F0F] border border-gray-700">
      <h2 className="text-white ml-6">Select Value for Parameters</h2>
      <CardContent className="space-y-4 pt-1">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key} className="text-white">{field.label}</Label>

            {field.type === "select" ? (
          <Select
  value={typeof values[field.key] === "string" ? (values[field.key] as string) : ""}
  onValueChange={(val) =>
    onChange({ ...values, [field.key]: val })
  }
>
  <SelectTrigger className="bg-[#0F0F0F] border border-gray-700 text-white">
    <SelectValue placeholder={`Select ${field.label}`} />
  </SelectTrigger>
  <SelectContent className="bg-[#0F0F0F] border border-gray-700 text-white">
    {field.options?.map((opt) => (
      <SelectItem
        key={opt.value}
        value={opt.value}
        className="text-white hover:bg-green-600 focus:bg-green-600 focus:text-white"
      >
        {opt.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

            ) : (
              <Input
                id={field.key}
                type={field.type}
                value={
                  typeof values[field.key] === "string" || typeof values[field.key] === "number"
                    ? (values[field.key] as string | number)
                    : ""
                }
                onChange={(e) =>
                  onChange({ ...values, [field.key]: e.target.value })
                }
                className="bg-[#0f0f0f] text-white"
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
