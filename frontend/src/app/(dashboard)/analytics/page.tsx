"use client";

import { motion } from "framer-motion";
import { BarChart2, TrendingUp, Zap, Clock, Smile, CheckCircle2 } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

const MONTHLY_ANALYTICS = [
  { month: "Jan", productivity: 65, mood: 80, habits: 70 },
  { month: "Feb", productivity: 78, mood: 85, habits: 75 },
  { month: "Mar", productivity: 82, mood: 75, habits: 80 },
  { month: "Apr", productivity: 90, mood: 90, habits: 88 },
  { month: "May", productivity: 85, mood: 88, habits: 84 },
  { month: "Jun", productivity: 94, mood: 95, habits: 92 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <BarChart2 className="text-pink-400" /> Executive Analytics & Recharts Overview
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Comprehensive statistics across tasks, moods, habits, & focus time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Completion Rate", value: "94.2%", icon: CheckCircle2, color: "#50a33f" },
          { label: "Avg Focus / Day", value: "3.5 hrs", icon: Clock, color: "#8b7fc7" },
          { label: "Overall Mood Index", value: "4.8 / 5", icon: Smile, color: "#d4708a" },
          { label: "Total XP Earned", value: "3,500 XP", icon: Zap, color: "#e9a84c" },
        ].map((item) => (
          <div key={item.label} className="p-4 rounded-3xl glass-card space-y-2">
            <item.icon size={20} style={{ color: item.color }} />
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{item.label}</p>
            <h3 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)" }}>{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="p-6 rounded-3xl glass-card space-y-4">
        <h3 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>
          Productivity & Habit Consistency Growth
        </h3>
        <div style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_ANALYTICS}>
              <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--bg-card)", borderRadius: 12 }} />
              <Bar dataKey="productivity" fill="#d4708a" radius={[6, 6, 0, 0]} name="Productivity" />
              <Bar dataKey="habits" fill="#8b7fc7" radius={[6, 6, 0, 0]} name="Habit Rate" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
