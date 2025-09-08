// src/App.jsx
import { useState, useEffect, useMemo } from "react";
import { Sun, Moon } from "lucide-react";
import Sidebar from "./components/Sidebar";
import RevenueCard from "./components/RevenueCard";
import UsersCard from "./components/UsersCard";
import SessionsCard from "./components/SessionsCard";
import SubscriptionsCard from "./components/SubscriptionsCard";
import NewReturningUsersCard from "./components/NewReturningUsersCard";
import DeviceTypeDistributionCard from "./components/DeviceTypeDistributionCard";
import ActivityPanel from "./components/ActivityPanel";
import CalendarCard from "./components/CalendarCard";
import QuickStatsCard from "./components/QuickStatsCard";
import { motion, AnimatePresence } from "framer-motion";
import MessagesPanel from "./components/MessagesPanel";
import ProductsPanel from "./components/ProductsPanel";



// -----------------------------
// Helpers
// -----------------------------
function generateRandomChartData(base, length = 5, variance = 0.2, key = "value") {
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];
  return Array.from({ length }, (_, i) => ({
    month: months[i % months.length],
    [key]: Math.round(base * (1 + (Math.random() - 0.5) * variance)),
  }));
}

function generateRandomSubscriptions() {
  return [
    { name: "Trial", value: Math.floor(Math.random() * 40) + 10 },
    { name: "Standard", value: Math.floor(Math.random() * 50) + 30 },
    { name: "Enterprise", value: Math.floor(Math.random() * 30) + 10 },
  ];
}

function generateRandomDeviceTypes() {
  return [
    { name: "Desktop", value: Math.floor(Math.random() * 5000) + 2000 },
    { name: "Mobile", value: Math.floor(Math.random() * 4000) + 1500 },
    { name: "Tablet", value: Math.floor(Math.random() * 2000) + 500 },
    { name: "Other", value: Math.floor(Math.random() * 1000) + 200 },
  ];
}

function generateRandomNewReturningUsers() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];
  return months.map((m) => ({
    month: m,
    newUsers: Math.floor(Math.random() * 500) + 200,
    returningUsers: Math.floor(Math.random() * 400) + 100,
  }));
}

// -----------------------------
// Fixed default data for "today"
// -----------------------------
const defaultTodayData = {
  revenue: {
    total: 12345,
    chartData: [
      { month: "Jan", revenue: 4800 },
      { month: "Feb", revenue: 5100 },
      { month: "Mar", revenue: 4950 },
      { month: "Apr", revenue: 5200 },
      { month: "May", revenue: 5000 },
    ],
  },
  users: {
    total: 1234,
    chartData: [
      { month: "Jan", users: 950 },
      { month: "Feb", users: 1000 },
      { month: "Mar", users: 1100 },
      { month: "Apr", users: 1200 },
      { month: "May", users: 1234 },
    ],
  },
  sessions: {
    total: 20567,
    chartData: [
      { month: "Jan", sessions: 12000 },
      { month: "Feb", sessions: 13000 },
      { month: "Mar", sessions: 15575 },
      { month: "Apr", sessions: 17000 },
      { month: "May", sessions: 16275 },
    ],
  },
  subscriptions: {
    total: 1201,
    breakdown: [
      { name: "Trial", value: 35 },
      { name: "Standard", value: 40 },
      { name: "Enterprise", value: 25 },
    ],
  },
  deviceTypes: [
    { name: "Desktop", value: 3000 },
    { name: "Mobile", value: 2500 },
    { name: "Tablet", value: 1000 },
    { name: "Other", value: 500 },
  ],
  newReturningUsers: [
  { month: "Jan", newUsers: 245, returningUsers: 200 },
  { month: "Feb", newUsers: 420, returningUsers: 230 },
  { month: "Mar", newUsers: 360, returningUsers: 180 },
  { month: "Apr", newUsers: 480, returningUsers: 260 },
  { month: "May", newUsers: 390, returningUsers: 210 },
],

};



// -----------------------------
// App Component
// -----------------------------
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeItem, setActiveItem] = useState("analytics");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const todayKey = new Date().toISOString().split("T")[0];

  // Generate 30-day dashboard data
  const dashboardDataByDate = useMemo(() => {
    const data = {};
    for (let d = 1; d <= 30; d++) {
      const dateKey = `2025-09-${String(d).padStart(2, "0")}`;
      if (dateKey === todayKey) {
        data[dateKey] = defaultTodayData; // fixed values for today
      } else {
        data[dateKey] = {
          revenue: {
            total: Math.floor(Math.random() * 10000) + 5000,
            chartData: generateRandomChartData(5000, 5, 0.2, "revenue"),
          },
          users: {
            total: Math.floor(Math.random() * 2000) + 500,
            chartData: generateRandomChartData(1000, 5, 0.2, "users"),
          },
          sessions: {
            total: Math.floor(Math.random() * 25000) + 5000,
            chartData: generateRandomChartData(15000, 5, 0.2, "sessions"),
          },
          subscriptions: {
            total: Math.floor(Math.random() * 2000) + 500,
            breakdown: generateRandomSubscriptions(),
          },
          deviceTypes: generateRandomDeviceTypes(),
          newReturningUsers: generateRandomNewReturningUsers(),
        };
      }
    }
    return data;
  }, [todayKey]);

  // Update body theme
  useEffect(() => {
    document.body.classList.toggle("theme-dark", darkMode);
    document.body.classList.toggle("theme-light", !darkMode);
  }, [darkMode]);

  // Current selected data
  const selectedKey = selectedDate.toISOString().split("T")[0];
  const selectedData =
    selectedKey > todayKey
      ? dashboardDataByDate[todayKey] // future dates show today's data
      : dashboardDataByDate[selectedKey] || dashboardDataByDate[todayKey];

      const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="font-sans">
      <div
        className="flex h-screen"
        style={{ backgroundColor: "var(--color-bg)", color: "var(--color-header)" }}
      >
        {/* Sidebar */}
        <Sidebar
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  activeItem={activeItem}
  setActiveItem={setActiveItem}
  selectedDate={selectedDate}
  setSelectedDate={setSelectedDate}
  isMobileOpen={sidebarOpen}
  setIsMobileOpen={setSidebarOpen}
/>



        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto relative">
          <div className="flex justify-between items-center mb-6">
  {/* Left: mobile hamburger only if sidebar closed */}
  {!sidebarOpen && (
    <button
      className="lg:hidden p-2 rounded-md border"
      onClick={() => setSidebarOpen(true)}
    >
      ☰
    </button>
  )}

  <h1 className="text-2xl font-bold">
    {activeItem === "analytics" && "Analytics Dashboard"}
    {activeItem === "messages" && "Messages"}
    {activeItem === "products" && "Products"}
  </h1>

  <div className="flex items-center gap-4">
    <div
      className="px-3 py-1 rounded"
      style={{ backgroundColor: "var(--color-card-bg)", color: "var(--color-subtext)" }}
    >
      Search
    </div>
    <div
      className="px-3 py-1 rounded"
      style={{ backgroundColor: "var(--color-card-bg)", color: "var(--color-subtext)" }}
    >
      Profile
    </div>
  </div>
</div>


  <AnimatePresence mode="wait">
    {activeItem === "analytics" && (
      <motion.div
        key="analytics"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top Cards */}
        <div className="charts-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RevenueCard data={selectedData.revenue} darkMode={darkMode} />
                    <SubscriptionsCard data={selectedData.subscriptions} darkMode={darkMode} />
          <UsersCard data={selectedData.users} darkMode={darkMode} />
          <SessionsCard data={selectedData.sessions} darkMode={darkMode} />
        </div>

        {/* Mid Panels */}
        <div className="mt-6 grid grid-cols-12 gap-6 cols-half-">
          <div className="col-span-8 flex flex-col gap-6">
            <NewReturningUsersCard data={selectedData.newReturningUsers} darkMode={darkMode} />
            <ActivityPanel darkMode={darkMode} />
          </div>
          <div className="col-span-4 flex flex-col gap-6">
            <DeviceTypeDistributionCard data={selectedData.deviceTypes} darkMode={darkMode} />
            <QuickStatsCard darkMode={darkMode} />
          </div>
        </div>
      </motion.div>
    )}

    {activeItem === "messages" && (
      <motion.div
        key="messages"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {/* Messages panel */}
            <MessagesPanel darkMode={darkMode} />

        <div className="grid grid-cols-1 gap-4 mt-6">
          <div className="p-4 rounded-2xl shadow-md card-bg border-color border-standard">
            <p className="text-sm text-muted-foreground">No new messages.</p>
          </div>
          
        </div>
      </motion.div>
    )}

    {activeItem === "products" && (
      <motion.div
        key="products"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {/* Messages panel */}
            <ProductsPanel darkMode={darkMode} />

        
      </motion.div>
    )}

    {/* TODO: Add more panels (Products, Settings, etc.) */}
  </AnimatePresence>
</main>

      </div>
    </div>
  );
}

export default App;
