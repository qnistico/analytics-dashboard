// src/components/SubscriptionsCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#FACC15", "#4F46E5", "#10B981"]; // Yellow, Blue, Green

export default function SubscriptionsCard({ data }) {
  // data = { total: 1201, breakdown: [ { name: "Trial", value: 25 }, ... ] }

  return (
    <Card className="rounded-2xl shadow-md margin-unset">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Subscriptions</CardTitle>
        <p className="text-4xl font-bold">{data.total.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground subtext-color">
          {data.breakdown
            .map((item) => `${item.value}% ${item.name}`)
            .join(" · ")}
        </p>
      </CardHeader>

      <CardContent>
        <div className="h-40 flex items-center justify-between">
          {/* Stats list on the left */}
          <div className="flex flex-col justify-center space-y-2">
            {data.breakdown.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
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
                  data={data.breakdown}
                  innerRadius="50%"
                  outerRadius="80%"
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {data.breakdown.map((entry, index) => (
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
