interface StrategyParamField {
  label: string; 
  key: string;
  type: "number" | "text" | "select";
  options?: { value: string; label: string }[]; // only for select
}

export const strategyParamsMap: Record<string, StrategyParamField[]> = {
    meanrev: [
        {label: "Window", key: "window", type:"number"},
        {label: "Standard Deviation", key:"stddev", type:"number"},
        {label: "Quantity", key:"qty", type: "number"}

    ],

    momentum: [
        {label: "Threshold", key:"threshold", type:"number"},
        {label: "Quantity", key:"qty", type:"number"},
    ],

    crossover:[
        {label: "Short Window", key: "short", type: "number"},
        {label: "Long Window", key:"long", type:"number"},
        {label: "Quantity", key:"qty", type:"number"}
    ],

    rsi:[
        {label: "LookBack Period", key:"lb", type:"number"},
        {label: "Low", key:"low", type:"number"},
        {label:"High", key:"high", type:"number"},
        {label:"Quantity", key:"qty", type:"number"}
    ],

    bollinger: [
        {label: "LookBack Period", key:"lb", type:"number"},
        {label: "Standard Deviation", key:"sd", type:"number"},
        {label:"Size", key:"sz", type:"number"},
    ],

    breakout: [
        {label: "LookBack Period", key:"lb", type:"number"},
        {label:"Size", key:"sz", type:"number"},

    ],

    mcad: [
        {label: "Fast", key:"fast", type:"number"},
        {label: "Slow", key:"slow", type:"number"},
        {label: "Signal", key:"signal", type:"number"},
        {label:"Size", key:"sz", type:"number"},
    ],

    vwap:[
        {label:"Size", key:"sz", type:"number"},

    ]

};   