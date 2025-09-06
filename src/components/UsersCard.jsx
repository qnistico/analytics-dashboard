// src/components/UsersCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UsersCard({ darkMode, data }) {
  // Add a "background" value for each bar
  const chartData = (data?.chartData || [
    { month: "Jan", users: 200 },
    { month: "Feb", users: 450 },
    { month: "Mar", users: 300 },
    { month: "Apr", users: 500 },
    { month: "May", users: 600 },
  ]).map(d => ({
    ...d,
    usersBg: d.users * 0.75, // background bar at 75% height (adjust as needed)
  }));

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
            <BarChart data={chartData} barCategoryGap={20}>
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

              {/* Background bar */}
              <Bar
                dataKey="usersBg"
                name=""
                fill="rgba(139, 92, 246, 0.3)"
                barSize={9}
                radius={[6, 6, 0, 0]}
                  tooltipType="none"
              />

              {/* Foreground/main bar */}
              <Bar
                dataKey="users"
                name="Users"
                fill="#8B5CF6"
                barSize={9}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
