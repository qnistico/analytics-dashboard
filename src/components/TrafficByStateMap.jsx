// src/components/TrafficByStateMap.jsx
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import React from "react";
import { USAMap } from "@mirawision/usa-map-react";

// Example traffic data by state (values 0–100)
const trafficData = {
  CA: 90,
  TX: 70,
  NY: 50,
  FL: 60,
  WA: 40,
  IL: 30,
  GA: 20,
  NV: 10,
};

// Helper to convert value to color shade
const getColorForValue = (value, darkMode) => {
  const baseColor = darkMode ? [80, 80, 80] : [200, 220, 255]; // RGB for dark/light
  const intensity = Math.floor((value / 100) * 150); // darken or lighten
  return `rgb(${baseColor[0] + intensity}, ${baseColor[1] + intensity}, ${baseColor[2] + intensity})`;
};

export default function TrafficByStateMap({ darkMode }) {
  // Build customStates object for USAMap
  const customStates = Object.fromEntries(
    Object.entries(trafficData).map(([state, value]) => [
      state,
      {
        fill: getColorForValue(value, darkMode),
        onClick: () => alert(`State: ${state}\nTraffic: ${value}`),
      },
    ])
  );

  return (
    <Card className="rounded-2xl shadow-md w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Traffic by State</CardTitle>
        <p className="text-3xl font-bold">{Object.values(trafficData).reduce((a, b) => a + b, 0)}</p>
        <p className="text-sm text-muted-foreground subtext-color">
          Total traffic from all states
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <USAMap
            customStates={customStates}
            stateHoverEffect
            stateClickEffect
          />
        </div>
      </CardContent>
    </Card>
  );
}
