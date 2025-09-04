import { useState, useEffect } from "react";
import { Sun, Moon, Home, BarChart2, Settings } from "lucide-react";
import RevenueCard from "./components/RevenueCard";
import UsersCard from "./components/UsersCard";
import SessionsCard from "./components/SessionsCard";
import SubscriptionsCard from "./components/SubscriptionsCard";
import NewReturningUsersCard from "./components/NewReturningUsersCard";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("theme-dark");
      document.body.classList.remove("theme-light");
    } else {
      document.body.classList.add("theme-light");
      document.body.classList.remove("theme-dark");
    }
  }, [darkMode]);

  return (
    <div className="font-sans">
      <div className="flex h-screen" style={{ backgroundColor: "var(--color-bg)", color: "var(--color-header)" }}>
        {/* Sidebar */}
        <aside className="w-64 flex flex-col p-4" style={{ backgroundColor: "var(--color-card-bg)" }}>
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2 hover:text-blue-500" style={{ color: "var(--color-subtext)" }}>
              <Home size={20} /> Home
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-blue-500" style={{ color: "var(--color-subtext)" }}>
              <BarChart2 size={20} /> Analytics
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-blue-500" style={{ color: "var(--color-subtext)" }}>
              <Settings size={20} /> Settings
            </a>
          </nav>
          <button
            className="mt-auto py-2 px-4 rounded flex items-center gap-2 justify-center"
            style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />} Toggle Theme
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 rounded" style={{ backgroundColor: "var(--color-card-bg)", color: "var(--color-subtext)" }}>Search</div>
              <div className="px-3 py-1 rounded" style={{ backgroundColor: "var(--color-card-bg)", color: "var(--color-subtext)" }}>Profile</div>
            </div>
          </div>

          {/* Cards */}
          {/* Cards grid */}
<div className="charts-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <RevenueCard darkMode={darkMode} />
  <UsersCard darkMode={darkMode} />
  <SessionsCard darkMode={darkMode} />
  <SubscriptionsCard darkMode={darkMode} />
</div>

{/* NewReturningUsersCard – ~55–60% width */}
<div className="mt-6 flex justify-start">
  <div className="w-7/12">
    <NewReturningUsersCard darkMode={darkMode} />
  </div>
</div>

        </main>
      </div>
    </div>
  );
}

export default App;
