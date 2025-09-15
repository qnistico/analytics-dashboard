import { useState } from "react";
import { Sun, Moon, BarChart2, Box, MessageCircle, Settings, LogOut } from "lucide-react";
import CalendarCard from "./CalendarCard";

export default function Sidebar({
  darkMode,
  setDarkMode,
  activeItem,
  setActiveItem,
  selectedDate,
  setSelectedDate,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const menuItems = [
    { key: "analytics", label: "Analytics", icon: <BarChart2 size={20} /> },
    { key: "products", label: "Products", icon: <Box size={20} /> },
    { key: "messages", label: "Messages", icon: <MessageCircle size={20} /> },
    { key: "settings", label: "Settings", icon: <Settings size={20} />, isSettings: true },
    { key: "signout", label: "Sign Out", icon: <LogOut size={20} />, isSignOut: true },
  ];

  const handleItemClick = (key) => {
    setActiveItem(key);

    // Auto-close sidebar on mobile if Products or Messages
    if (["products", "messages", "analytics"].includes(key)) {
      setIsMobileOpen(false);
    }
  };

  return (
    <aside
      className={`sidebar fixed lg:relative h-full flex flex-col p-4 transition-all
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      style={{ backgroundColor: "var(--color-card-bg)" }}
    >
      {/* Header */}
      <div className="flex jcsb items-center mb-6 tablet-flex-col">
        <h2 className="text-xl font-bold sidebar-title">Dashboard</h2>
        <button className="lg:hidden p-2 rounded-md " onClick={() => setIsMobileOpen(false)}>
          ✕
        </button>

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

      {/* Nav */}
      <nav className="flex flex-col gap-3 sidebar-links flex-1 relative">
        {menuItems.map((item) => {
          if (item.isSettings) {
            return (
              <div key="settings" className="relative">
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded text-left w-full sidebar-links`}
                  onClick={() => setSettingsOpen((prev) => !prev)}
                >
                  {item.icon}
                  <span className="sidebar-label">{item.label}</span>
                </button>

                {/* Click flyout */}
                {settingsOpen && (
                  <div className="absolute left-full ml-2 top-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 w-40 z-50">
                    <ul className="flex flex-col gap-2 text-sm">
                      <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 py-1">Profile</li>
                      <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 py-1">Preferences</li>
                      <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 py-1">Notifications</li>
                      <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 py-1">Appearance</li>
                      <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 py-1">About</li>
                    </ul>
                  </div>
                )}
              </div>
            );
          }

          if (item.isSignOut) {
            return (
              <button
                key="signout"
                className="flex items-center gap-2 px-3 py-2 rounded text-left w-full opacity-60 cursor-not-allowed"
                title="Disabled in demo"
              >
                {item.icon}
                <span className="sidebar-label">{item.label}</span>
              </button>
            );
          }

          return (
            <button
              key={item.key}
              className={`flex items-center gap-2 px-3 py-2 rounded text-left w-full 
                ${activeItem === item.key ? "bg-blue-100 text-blue-600 active" : "sidebar-links"}`}
              onClick={() => handleItemClick(item.key)}
            >
              {item.icon}
              <span className="sidebar-label">{item.label}</span>
            </button>
          );
        })}

        
      </nav>

      {/* Calendar */}
      <div className="mt-auto sidebar-calendar">
        <CalendarCard
          onDateChange={setSelectedDate}
          darkMode={darkMode}
          selectedDate={selectedDate}
        />
      </div>
    </aside>
  );
}
