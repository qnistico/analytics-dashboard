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

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sessions</CardTitle>
        <p className="text-4xl font-bold">{totalSessions.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground subtext-color">Visits this week</p>
      </CardHeader>
      <CardContent>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "#444" : "#ccc"}
              />
              <XAxis dataKey="month" stroke={darkMode ? "#eee" : "#333"} />
              <YAxis stroke={darkMode ? "#eee" : "#333"} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke="#f59e0b"
                fill="#fbbf24"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
