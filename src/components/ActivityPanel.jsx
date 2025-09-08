// src/components/RecentActivityCard.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { ChevronDown, ChevronUp } from "lucide-react";

const activities = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/32?img=5",
    platform: "Web",
    action: "Purchase",
    date: "09/04/25",
    amount: "$49.99",
    status: "Completed",
    details: "Bought Pro subscription",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/32?img=6",
    platform: "iOS",
    action: "Purchase",
    date: "09/03/25",
    amount: "$19.99",
    status: "Pending",
    details: "Bought add-on pack",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/32?img=7",
    platform: "Android",
    action: "Refund",
    date: "09/02/25",
    amount: "-$9.99",
    status: "Completed",
    details: "Refunded monthly subscription",
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/32?img=8",
    platform: "Web",
    action: "Purchase",
    date: "09/01/25",
    amount: "$29.99",
    status: "Completed",
    details: "Bought Standard subscription",
  },
  {
    id: 5,
    avatar: "https://i.pravatar.cc/32?img=9",
    platform: "iOS",
    action: "Purchase",
    date: "08/31/25",
    amount: "$9.99",
    status: "Pending",
    details: "Bought add-on pack",
  },
];

export default function RecentActivityCard() {
  const [openIds, setOpenIds] = useState([]);

  const toggleOpen = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {activities.map((activity) => {
            const isOpen = openIds.includes(activity.id);
            return (
              <div
                key={activity.id}
                className="rounded-md p-2 pb-0 mt-3 flex flex-col"
              >
                <hr className="border-color" />

                {/* Header row */}
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleOpen(activity.id)}
                >
                  <div
                    className="
                      grid grid-cols-6 gap-x-2 items-center accordion-items
                      xl:grid-cols-6
                      lg:grid-cols-4
                      sm:grid-cols-2 sm:gap-y-1
                      mobile-grid-jcsb
                    "
                  >
                    <img
                      src={activity.avatar}
                      alt="avatar"
                      className="w-6 h-6 rounded-full"
                    />

                    <span className="font-medium">{activity.platform}</span>

                    {/* Action: hide below 1200px */}
                    <span className="text-sm text-muted-foreground hidden xl:block">
                      {activity.action}
                    </span>

                    {/* Date: hide below 1200px */}
                    <span className="text-sm text-muted-foreground hidden xl:block">
                      {activity.date}
                    </span>

                    {/* 💰 Amount: visible above 480px */}
                    <span className="text-sm font-semibold hidden xs:inline">
                      {activity.amount}
                    </span>

                    {/* ✅ Keep custom + Tailwind classes intact */}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full w-fit-content font-medium
                        ${
                          activity.status === "Completed"
                            ? "bg-green-500/15 text-green-600 dark:text-green-400 completed-tag"
                            : activity.status === "In Progress"
                            ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 pending-tag"
                            : activity.status === "Pending"
                            ? "bg-violet-500/15 text-violet-600 dark:text-violet-400 pending-tag"
                            : activity.status === "Canceled"
                            ? "bg-red-500/15 text-red-600 dark:text-red-400"
                            : "bg-gray-500/15 text-gray-600 dark:text-gray-400"
                        }`}
                    >
                      {activity.status}
                    </span>
                  </div>

                  <div>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {/* Accordion content: reveals hidden fields on small screens */}
                {isOpen && (
                  <div className="mt-2 text-sm text-muted-foreground pl-10 space-y-1">
                    <p className="block xl:hidden">Action: {activity.action}</p>
                    <p className="block xl:hidden">Date: {activity.date}</p>

                    {/* 💰 Amount: shown only ≤ 480px */}
                    <p className="block xs:hidden font-semibold">
                      Amount: {activity.amount}
                    </p>

                    <p>{activity.details}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
