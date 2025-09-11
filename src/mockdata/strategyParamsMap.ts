interface StrategyParamField {
  label: string; 
  key: string;
  type: "number" | "text" | "select";
  options?: { value: string; label: string }[]; // only for select
}

export const strategyParamsMap: Record<string, StrategyParamField[]> = {
    mean_reversion: [
        {label: "Window", key: "window", type:"number"},
        {label: "Standard Deviation", key:"stddev", type:"number"},
        {label: "Quantity", key:"qty", type: "number"}

    ],

    momentum: [
        
    ]
};   