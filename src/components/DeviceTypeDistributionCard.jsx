import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#1d9bf0", "#10B981", "#8B5CF6", "#F59E0B"]; // Blue, Green, Yellow, Red

// Default static data
const defaultData = [
  { name: "Desktop", value: 5000 },
  { name: "Mobile", value: 3200 },
  { name: "Tablet", value: 1200 },
  { name: "Other", value: 600 },
];

const defaultQuickStats = [
  { label: "Avg. Session", value: "5m 32s", subtext: "per user" },
  { label: "Bounce Rate", value: "42%", subtext: "sitewide" },
  { label: "New Devices", value: "1,200", subtext: "this week" },
];

export default function DeviceTypeDistributionCard({ darkMode, data, quickStats }) {
  const chartData = data || defaultData;
  const stats = quickStats || defaultQuickStats;
  const totalUsers = chartData.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card className="rounded-2xl shadow-md margin-unset">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Device Type Distribution</CardTitle>
        <p className="text-4xl font-bold">{totalUsers.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground subtext-color">
          Total users across devices
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-72 justify-between">
          <div className="flex flex-1 justify-between items-center">
            <div className="flex flex-col justify-center space-y-2">
              {chartData.map((entry, index) => {
                const percent = ((entry.value / totalUsers) * 100).toFixed(0);
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm font-medium text-muted-foreground">
                      {entry.name}: {percent}%
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex-1 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius="50%"
                    outerRadius="80%"
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col text-center">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="text-lg font-bold">{stat.value}</span>
                <span className="text-xs text-muted-foreground subtext-color">{stat.subtext}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
