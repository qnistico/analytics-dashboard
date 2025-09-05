// src/components/RecentActivityCard.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { ChevronDown, ChevronUp } from "lucide-react";

// Sample data
const activities = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/32?img=5", // adult-looking
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
                className=" rounded-md p-2 pb-0 mt-3 flex flex-col "
              >
                <hr className="border-color"></hr>
                {/* Header row */}
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleOpen(activity.id)}
                >
                  <div className="grid grid-cols-6 items-center gap-x-2 accordion-items">
                    <img
                      src={activity.avatar}
                      alt="avatar"
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium">{activity.platform}</span>
                    <span className="text-sm text-muted-foreground">{activity.action}</span>
                    <span className="text-sm text-muted-foreground">{activity.date}</span>
                    <span className="text-sm font-semibold">{activity.amount}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full w-fitcontent ${
                        activity.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                  <div>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {/* Accordion content */}
                {isOpen && (
                  <div className="mt-2 text-sm text-muted-foreground pl-10">
                    {activity.details}
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
