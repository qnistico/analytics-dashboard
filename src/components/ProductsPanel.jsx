// src/components/ProductsPanel.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { Package, CheckCircle, XCircle, ShoppingCart } from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Area,
  ComposedChart
} from "recharts";

// Sample Data
const metricsData = {
  totalProducts: 128,
  activeProducts: 112,
  inactiveProducts: 16,
  productsSold: 542,
};

const inventoryData = [
  { category: "Electronics", stock: 50 },
  { category: "Apparel", stock: 30 },
  { category: "Home", stock: 20 },
  { category: "Books", stock: 18 },
  { category: "Other", stock: 10 },
];

const salesTrendData = [
  { product: "Laptop", sales: 120 },
  { product: "Shirt", sales: 80 },
  { product: "Lamp", sales: 60 },
  { product: "Book", sales: 40 },
  { product: "Headphones", sales: 90 },
];

const recentProducts = [
  { id: 1, name: "Laptop Pro 16", stock: 5, sales: 120 },
  { id: 2, name: "Cotton T-Shirt", stock: 2, sales: 80 },
  { id: 3, name: "Desk Lamp", stock: 0, sales: 60 },
  { id: 4, name: "Novel Book", stock: 8, sales: 40 },
];

export default function ProductsPanel({ darkMode }) {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <div className="grid grid-cols-12 gap-6 products-grid mobile-mt-75">
      {/* Left Column: Top Metrics & Inventory */}
      <div className="col-span-4 flex flex-col gap-6">
        {/* Top Metrics */}
        <Card className="rounded-2xl shadow-md p-4">
  <CardHeader>
    <CardTitle className="text-lg font-semibold">Products Overview</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 gap-4 text-center products-card">
      {/* Total */}
      <div className="rounded-xl p-3 bg-gray-50 dark:bg-gray-800 main-bg brand-blue">
        <Package className="mx-auto mb-1 h-5 w-5 text-blue-600 dark:text-blue-400" />
        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 brand-blue mt-2">
          {metricsData.totalProducts}
        </p>
        <p className="text-sm text-muted-foreground color-subtext mt-2">Total</p>
      </div>

      {/* Active */}
      <div className="rounded-xl p-3 bg-gray-50 dark:bg-gray-800 main-bg brand-green">
        <CheckCircle className="mx-auto mb-1 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 brand-green mt-2">
          {metricsData.activeProducts}
        </p>
        <p className="text-sm text-muted-foreground color-subtext mt-2">Active</p>
      </div>

      {/* Inactive */}
      <div className="rounded-xl p-3 bg-gray-50 dark:bg-gray-800 main-bg brand-violet">
        <XCircle className="mx-auto mb-1 h-5 w-5 text-violet-600 dark:text-violet-400 brand-violet" />
        <p className="text-2xl font-bold mt-2">
          {metricsData.inactiveProducts}
        </p>
        <p className="text-sm text-muted-foreground color-subtext mt-2">Inactive</p>
      </div>

      {/* Sold */}
      <div className="rounded-xl p-3 bg-gray-50 dark:bg-gray-800 main-bg brand-orange">
        <ShoppingCart className="mx-auto mb-1 h-5 w-5 text-rose-600 dark:text-rose-400 brand-orange" />
        <p className="text-2xl font-bold text-rose-700 dark:text-rose-300 brand-orange mt-2">
          {metricsData.productsSold}
        </p>
        <p className="text-sm text-muted-foreground color-subtext mt-2">Sold</p>
      </div>
    </div>
  </CardContent>
</Card>


        {/* Inventory Chart */}
        <Card className="rounded-2xl shadow-md p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Inventory by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryData} barCategoryGap={12}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#ccc"} />
                  <XAxis dataKey="category" stroke={darkMode ? "#eee" : "#333"} />
                  <YAxis stroke={darkMode ? "#eee" : "#333"} />
                  <Tooltip
                    contentStyle={{
                      padding: "4px 8px",
                      margin: 0,
                      border: "none",
                      backgroundColor: darkMode ? "#15202b" : "#fff",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      color: darkMode ? "#fff" : "#111",
                    }}
                  />
                  <Bar
                    dataKey="stock"
                    fill="#1d9bf0"
                    radius={[6, 6, 0, 0]}
                    barSize={14}
                    activeShape={(props) => <rect {...props} fill="#6d28d9" rx={6} />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Sales Trend & Recent Products */}
      <div className="col-span-8 flex flex-col gap-6">
        {/* Sales Trend */}
        <Card className="rounded-2xl shadow-md p-4">
  <CardHeader>
    <CardTitle className="text-lg font-semibold">Top Product Sales</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={salesTrendData}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1d9bf0" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#1d9bf0" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#444" : "#ccc"}
          />
          <XAxis dataKey="product" stroke={darkMode ? "#eee" : "#333"} />
          <YAxis stroke={darkMode ? "#eee" : "#333"} />

          <Tooltip
            contentStyle={{
              padding: "4px 8px",
              margin: 0,
              border: "none",
              backgroundColor: darkMode ? "#15202b" : "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              color: darkMode ? "#fff" : "#111",
            }}
            itemStyle={{
              padding: "0px 2px",
            }}
          />

          {/* Gradient Area */}
          <Area
            type="monotone"
            dataKey="sales"
            stroke="none"
            fill="url(#colorSales)"
            name=""
            tooltipType="none"
          />

          {/* Line on top */}
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#1d9bf0"
            strokeWidth={3}
            dot={{ r: 4, fill: "#fff", stroke: "#1d9bf0", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "#fff", stroke: "#6d28d9", strokeWidth: 2 }}
            name="Sales"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  </CardContent>
</Card>


        {/* Recent / Low Stock Products */}
        <Card className="rounded-2xl shadow-md p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent / Low Stock Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className={`flex justify-between p-2 rounded-md product-count ${
                    product.stock === 0
                      ? "subtext-color"
                      : "subtext-color"
                  }`}
                >
                  <span>{product.name}</span>
                  <span>
                    Stock: {product.stock} | Sold: {product.sales}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
