// src/components/NewReturningUsersCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample data
const usersData = [
  { month: "Jan", newUsers: 200, returningUsers: 150 },
  { month: "Feb", newUsers: 300, returningUsers: 180 },
  { month: "Mar", newUsers: 250, returningUsers: 200 },
  { month: "Apr", newUsers: 400, returningUsers: 220 },
  { month: "May", newUsers: 350, returningUsers: 250 },
  { month: "Jun", newUsers: 300, returningUsers: 210 },
  { month: "Jul", newUsers: 450, returningUsers: 300 },
  { month: "Aug", newUsers: 400, returningUsers: 280 },
  { month: "Sep", newUsers: 380, returningUsers: 270 },
  { month: "Oct", newUsers: 420, returningUsers: 290 },
  { month: "Nov", newUsers: 360, returningUsers: 260 },
  { month: "Dec", newUsers: 500, returningUsers: 320 },
];


export default function NewReturningUsersCard({ darkMode }) {
  return (
    <Card className="rounded-2xl shadow-md w-full card-bg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">New vs Returning Users</CardTitle>
        <p className="text-3xl font-bold">
          {usersData.reduce((sum, d) => sum + d.newUsers, 0)}
        </p>
        <p className="text-sm text-muted-foreground subtext-color">
          Total new users over the months
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usersData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#ccc"} />
              <XAxis dataKey="month" stroke={darkMode ? "#eee" : "#333"} />
              <YAxis stroke={darkMode ? "#eee" : "#333"} />
              <Tooltip />
              <Line type="monotone" dataKey="newUsers" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="returningUsers" stroke="#999" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
