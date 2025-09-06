// src/components/SessionsCard.jsx
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SessionsCard({ darkMode, data }) {
  const chartData = data?.chartData || [
    { month: "Jan", sessions: 800 },
    { month: "Feb", sessions: 1200 },
    { month: "Mar", sessions: 1000 },
    { month: "Apr", sessions: 1400 },
    { month: "May", sessions: 1600 },
  ];
  const totalSessions = data?.total || 20567;

  // Consistent stroke color (blue brand)
  const strokeColor = "#1d9bf0";

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sessions</CardTitle>
        <p className="text-4xl font-bold">{totalSessions.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground subtext-color">
          Visits this month
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "#444" : "#ccc"}
              />
              <XAxis dataKey="month" stroke={darkMode ? "#eee" : "#333"} />
              <YAxis stroke={darkMode ? "#eee" : "#333"} />
              <Tooltip
  contentStyle={{
    padding: "4px 8px", // tighter padding
    margin: 0,
    border: "none",
    backgroundColor: darkMode ? "#15202b" : "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  }}
  itemStyle={{
    padding: "0px 2px", // reduces spacing between items
  }}
/>

              <Area
                type="monotone"
                dataKey="sessions"
                stroke={strokeColor}
                strokeWidth={1.618}
                fill="url(#sessionsGradient)"
                name="Sessions"
                dot={{
                  r: 4,
                  fill: "#fff",
                  fillOpacity: 1, // ✅ solid white center
                  stroke: strokeColor,
                  strokeWidth: 1.618,
                }}
                activeDot={{
                  r: 6,
                  fill: "#fff",
                  fillOpacity: 1, // ✅ solid white center on hover too
                  stroke: strokeColor,
                  strokeWidth: 1.618,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
