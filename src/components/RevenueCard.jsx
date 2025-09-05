import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueCard({ darkMode, data }) {
  // fallback if data not provided
  const chartData = data?.chartData || [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 4000 },
    { month: "May", revenue: 6000 },
  ];
  const totalRevenue = data?.total || 12345;

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Revenue</CardTitle>
        <p className="text-4xl font-bold">${totalRevenue.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground subtext-color">Last 30 days</p>
      </CardHeader>
      <CardContent>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "#444" : "#ccc"}
              />
              <XAxis dataKey="month" stroke={darkMode ? "#eee" : "#333"} />
              <YAxis stroke={darkMode ? "#eee" : "#333"} />
              <Tooltip />
              <Bar dataKey="revenue" fill={darkMode ? "#1d9bf0" : "#1d9bf0"} radius={[100, 100, 0, 0]} barSize={12}  />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
