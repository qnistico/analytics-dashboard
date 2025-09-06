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
  // Add a separate key for the background bar
  const chartData = (data?.chartData || [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4000 },
  { month: "May", revenue: 6000 },
]).map(d => ({ ...d, revenueBg: d.revenue * 0.75 })); // background bar 75% height of main bar


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
            <BarChart data={chartData} barCategoryGap={20}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "#444" : "#ccc"}
              />
              <XAxis dataKey="month" stroke={darkMode ? "#eee" : "#333"} />
              <YAxis stroke={darkMode ? "#eee" : "#333"} />
              <Tooltip
                contentStyle={{
                  padding: "4px 8px",
                  margin: 0,
                  border: "none",
                  backgroundColor: darkMode ? "#15202b" : "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
                itemStyle={{
                  padding: "0px 2px",
                }}
              />

              {/* Background/off bar */}
              <Bar
                dataKey="revenueBg"
                tooltipType="none"
                fill="rgba(16, 185, 129, 0.3)"
                barSize={9} 
                radius={[6, 6, 0, 0]}
              />

              {/* Foreground/main bar */}
              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="#10B981"
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
