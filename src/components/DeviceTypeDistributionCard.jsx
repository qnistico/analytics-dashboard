// src/components/DeviceTypeDistributionCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Sample data
const data = [
  { name: "Desktop", value: 5000 },
  { name: "Mobile", value: 3200 },
  { name: "Tablet", value: 1200 },
  { name: "Other", value: 600 },
];

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"]; // Blue, Green, Yellow, Red

export default function DeviceTypeDistributionCard() {
  const totalUsers = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Device Type Distribution</CardTitle>
        <p className="text-3xl font-bold">{totalUsers.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground subtext-color">
          Total users across devices
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6 items-center h-40">
          {/* Static Stats on the left */}
          <div className="flex flex-col justify-between h-full">
            {data.map((entry, index) => {
              const percent = ((entry.value / totalUsers) * 100).toFixed(0);
              return (
                <p key={index} className="text-sm text-muted-foreground">
                  {entry.name}: {percent}%
                </p>
              );
            })}
          </div>

          {/* Pie chart on the right */}
          <div className="flex-1 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius="50%"
                  outerRadius="80%"
                  paddingAngle={1}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
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
      </CardContent>
    </Card>
  );
}
