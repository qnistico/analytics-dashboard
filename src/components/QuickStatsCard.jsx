// src/components/QuickStatsCard.jsx
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { ArrowUp, ArrowDown, User, DollarSign, Activity, TrendingUp } from "lucide-react";

export default function QuickStatsCard({ darkMode, data }) {
  const stats = data || [
    {
      label: "Conversion Rate",
      value: "3.2%",
      delta: 0.5,
      icon: <TrendingUp size={16} />,
      color: "#1d9bf0",
      sparkline: [
        { value: 2.5 },
        { value: 3.0 },
        { value: 2.8 },
        { value: 3.2 },
        { value: 3.1 },
      ],
    },
    {
      label: "Bounce Rate",
      value: "42%",
      delta: -3.2,
      icon: <Activity size={16} />,
      color: "#10b981",
      sparkline: [
        { value: 45 },
        { value: 44 },
        { value: 43 },
        { value: 42 },
        { value: 42 },
      ],
    },
    {
      label: "New Signups",
      value: "120",
      delta: 10,
      icon: <User size={16} />,
      color: "#f59e0b",
      sparkline: [
        { value: 90 },
        { value: 100 },
        { value: 110 },
        { value: 120 },
        { value: 115 },
      ],
    },
    {
      label: "Revenue Today",
      value: "$2,450",
      delta: 150,
      icon: <DollarSign size={16} />,
      color: "#8b5cf6",
      sparkline: [
        { value: 1800 },
        { value: 2000 },
        { value: 2200 },
        { value: 2450 },
        { value: 2400 },
      ],
    },
  ];

  return (
    <Card className="rounded-2xl shadow-md quickstats-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
        <p className="text-sm text-muted-foreground subtext-color">
          Today / Last 7 days overview
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 mt-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center justify-between">
              {/* Left: icon + label + value */}
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-full colored-icon-container"
                  style={{
                    backgroundColor: darkMode
                      ? stat.color // solid in dark mode
                      : stat.color + "33", // translucent in light mode
                  }}
                >
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{stat.label}</span>
                  <span className="text-lg font-bold">{stat.value}</span>
                </div>
              </div>

              {/* Middle: delta arrow */}
              <div className="flex items-center gap-1">
                {stat.delta >= 0 ? (
                  <ArrowUp size={14} className="text-green-500" />
                ) : (
                  <ArrowDown size={14} className="text-red-500" />
                )}
                <span
                  className={`text-sm ${
                    stat.delta >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {Math.abs(stat.delta)}
                  {stat.label.includes("Rate") ? "%" : ""}
                </span>
              </div>

              {/* Right: mini sparkline */}
              <div className="w-20 h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stat.sparkline}>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={stat.color}
                      fill={stat.color + "33"} // keep sparkline fill light
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
