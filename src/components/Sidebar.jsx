import { useState, useEffect, useRef } from "react";
import { Sun, Moon, BarChart2, Box, MessageCircle, Settings, LogOut } from "lucide-react";
import CalendarCard from "./CalendarCard";
import logo from "../imgs/logo.png";

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
  const settingsRef = useRef(null);

  const menuItems = [
    { key: "analytics", label: "Analytics", icon: <BarChart2 size={20} /> },
    { key: "products", label: "Products", icon: <Box size={20} /> },
    { key: "messages", label: "Messages", icon: <MessageCircle size={20} /> },
    { key: "settings", label: "Settings", icon: <Settings size={20} />, isSettings: true },
    { key: "signout", label: "Sign Out", icon: <LogOut size={20} />, isSignOut: true },
  ];

  const handleItemClick = (key) => {
    setActiveItem(key);
    setSettingsOpen(false);
    if (["products", "messages", "analytics"].includes(key)) {
      setIsMobileOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    }
    if (settingsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [settingsOpen]);

  return (
    <aside
  className={`sidebar fixed xl:relative h-full flex flex-col p-4 transition-all
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
    lg:-translate-x-0 xl:translate-x-0`}
  style={{ backgroundColor: "var(--color-card-bg)" }}
>

      {/* Header */}
      <div className="flex jcsb  mb-6 tablet-flex-col">
        <img src={logo} alt="logo" className="h-auto logo" />
        <button className="lg:hidden p-2 rounded-md flex items-start mt-6" onClick={() => setIsMobileOpen(false)}>
          ✕
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-3 sidebar-links flex-1 relative">
        {menuItems.map((item) => {
          if (item.isSettings) {
            return (
              <div key="settings" className="relative" ref={settingsRef}>
                <button
                  className="flex  gap-2 px-3 py-2 rounded text-left w-full sidebar-links"
                  onClick={() => setSettingsOpen((prev) => !prev)}
                >
                  {item.icon}
                  <span className="sidebar-label">{item.label}</span>
                </button>

                {settingsOpen && (
                  <div className="absolute left-full ml-2 top-0 flyout-menu shadow-lg rounded-lg p-2 w-40 z-50">
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
                className="flex  gap-2 px-3 py-2 rounded text-left w-full opacity-60 cursor-not-allowed"
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
              className={`flex  gap-2 px-3 py-2 rounded text-left w-full 
                ${activeItem === item.key ? "bg-blue-100 text-blue-600 active" : "sidebar-links"}`}
              onClick={() => handleItemClick(item.key)}
            >
              {item.icon}
              <span className="sidebar-label">{item.label}</span>
            </button>
          );
        })}

        {/* Theme toggle as last menu item */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex gap-2 rounded text-left w-full relative px-3 py-2 theme-toggle"
        >
          <div className="relative w-14 h-7 flex  bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-colors items-center">
            <div
              className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform toggle-circle ${
                darkMode ? "translate-x-7" : "translate-x-0"
              }`}
            ></div>
            <Sun className="absolute left-1 text-yellow-400" size={14} />
            <Moon className="absolute right-1 text-gray-700 dark:text-yellow-300" size={14} />
          </div>
          <span className="sidebar-label">Theme</span>
        </button>
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
