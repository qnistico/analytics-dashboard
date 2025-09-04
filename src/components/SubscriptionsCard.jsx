// src/components/SubscriptionsCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Trial", value: 25 },
  { name: "Standard", value: 55 },
  { name: "Enterprise", value: 20 },
];

const COLORS = ["#FACC15", "#4F46E5", "#10B981"]; // Yellow, Blue, Green

export default function SubscriptionsCard() {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Subscriptions</CardTitle>
        <p className="text-3xl font-bold">1,201</p>
        <p className="text-sm text-muted-foreground subtext-color">
          25% Trial · 55% Standard · 20% Enterprise
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-40 flex items-center justify-between">
          {/* Static stats on the left */}
          <div className="flex flex-col justify-center space-y-2">
            {data.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                ></span>
                <span className="text-sm font-medium text-muted-foreground">
                  {entry.name}: {entry.value}%
                </span>
              </div>
            ))}
          </div>

          {/* Pie chart on the right */}
          <div className="flex-1 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius="60%"
                  outerRadius="80%"
                  paddingAngle={5}
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
