// src/components/NewReturningUsersCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Area,
} from "recharts";

// Default static data
const defaultUsersData = [
  { month: "Jan", newUsers: 200, returningUsers: 150 },
  { month: "Feb", newUsers: 300, returningUsers: 180 },
  { month: "Mar", newUsers: 250, returningUsers: 200 },
  { month: "Apr", newUsers: 400, returningUsers: 220 },
  { month: "May", newUsers: 350, returningUsers: 250 },
];

export default function NewReturningUsersCard({ darkMode, data }) {
  const chartData = data || defaultUsersData;
  const totalNewUsers = chartData.reduce((sum, d) => sum + d.newUsers, 0);

  return (
    <Card className="rounded-2xl shadow-md w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">New vs Returning Users</CardTitle>
        <p className="text-4xl font-bold">{totalNewUsers}</p>
        <p className="text-sm text-muted-foreground subtext-color">
          Total new users over the months
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1d9bf0" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#1d9bf0" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorReturningUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#999" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#999" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#ccc"} />
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

              {/* Filled areas */}
              <Area
  type="monotone"
  dataKey="newUsers"
  stroke="none"
  fill="url(#colorNewUsers)"
  name=""
  tooltipType="none"
/>
<Area
  type="monotone"
  dataKey="returningUsers"
  stroke="none"
  fill="url(#colorReturningUsers)"
  name=""
  tooltipType="none"
/>

{/* Lines (the only ones that appear in tooltip) */}
<Line
  type="monotone"
  dataKey="newUsers"
  stroke="#1d9bf0"
  strokeWidth={3}
  dot={{ r: 4 }}
  name="New Users"
/>
<Line
  type="monotone"
  dataKey="returningUsers"
  stroke="#64748B"
  strokeWidth={2}
  dot={{ r: 4 }}
  name="Returning Users"
/>

  </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
