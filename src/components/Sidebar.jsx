// src/components/Sidebar.jsx
import { Sun, Moon, Home, BarChart2, Box, MessageCircle, Settings, LogOut } from "lucide-react";
import CalendarCard from "./CalendarCard";

export default function Sidebar({ darkMode, setDarkMode, activeItem, setActiveItem, selectedDate, setSelectedDate }) {
  const menuItems = [
    { key: "analytics", label: "Analytics", icon: <BarChart2 size={20} /> },
    { key: "products", label: "Products", icon: <Box size={20} /> },
    { key: "messages", label: "Messages", icon: <MessageCircle size={20} /> },
    { key: "settings", label: "Settings", icon: <Settings size={20} /> },
    { key: "signout", label: "Sign Out", icon: <LogOut size={20} /> },
  ];

  return (
    <aside className="w-300 flex flex-col p-4" style={{ backgroundColor: "var(--color-card-bg)" }}>
        <div className="flex jcsb">
                  <h2 className="text-xl font-bold mb-6">Dashboard</h2>

            {/* Dark mode toggle */}
              <div
                onClick={() => setDarkMode(!darkMode)}
                className="relative w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors theme-switch"
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform toggle-circle ${
                    darkMode ? "translate-x-7" : "translate-x-0"
                  }`}
                ></div>
                <Sun className="absolute left-1 text-yellow-400" size={14} />
                <Moon className="absolute right-1 text-gray-700 dark:text-yellow-300" size={14} />
              </div>
        </div>

      <nav className="flex flex-col gap-3 sidebar-links flex-1">
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={`flex items-center gap-2 px-3 py-2 rounded text-left w-full 
              ${activeItem === item.key 
                ? "bg-blue-100 text-blue-600 active" 
                : "sidebar-links"}`}
            onClick={() => setActiveItem(item.key)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Calendar at the bottom */}
      <div className="mt-auto">
        <CalendarCard onDateChange={setSelectedDate} darkMode={darkMode} selectedDate={selectedDate} />
      </div>
    </aside>
  );
}
