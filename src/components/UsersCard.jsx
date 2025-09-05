import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UsersCard({ darkMode, data }) {
  const chartData = data?.chartData || [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 450 },
    { month: "Mar", users: 300 },
    { month: "Apr", users: 500 },
    { month: "May", users: 600 },
  ];
  const totalUsers = data?.total || 1234;

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Active Users</CardTitle>
        <p className="text-4xl font-bold">{totalUsers.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground subtext-color">In last 24h</p>
      </CardHeader>
      <CardContent>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "#444" : "#ccc"}
              />
              <XAxis dataKey="month" stroke={darkMode ? "#eee" : "#333"} />
              <YAxis stroke={darkMode ? "#eee" : "#333"} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
