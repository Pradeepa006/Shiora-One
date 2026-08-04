"use client";

import { motion } from "framer-motion";
import { Widget } from "./Widget";
import { BarChart2 } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const WEEKLY_DATA = [
  { day: "Mon", tasks: 8, xp: 120, mood: 4 },
  { day: "Tue", tasks: 5, xp: 90, mood: 3 },
  { day: "Wed", tasks: 12, xp: 180, mood: 5 },
  { day: "Thu", tasks: 9, xp: 140, mood: 4 },
  { day: "Fri", tasks: 14, xp: 210, mood: 5 },
  { day: "Sat", tasks: 6, xp: 95, mood: 4 },
  { day: "Sun", tasks: 3, xp: 60, mood: 3 },
];

export function AnalyticsWidget() {
  return (
    <Widget
      title="Weekly Productivity"
      icon={<BarChart2 size={16} />}
      accentColor="#8b7fc7"
      delay={0.45}
      size="lg"
    >
      <div className="space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Tasks Done", value: "57", color: "#d4708a", emoji: "✅" },
            { label: "Total XP", value: "895", color: "#e9a84c", emoji: "⚡" },
            { label: "Focus Hours", value: "24h", color: "#6bbf87", emoji: "🎯" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="p-3 rounded-xl text-center"
              style={{
                background: `${stat.color}10`,
                border: `1px solid ${stat.color}25`,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="text-lg">{stat.emoji}</div>
              <div className="text-lg font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ height: 100 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={WEEKLY_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -30 }}>
              <defs>
                <linearGradient id="taskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4708a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d4708a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b7fc7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b7fc7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tick={{ fill: "var(--text-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-soft)",
                  borderRadius: 12,
                  fontSize: 12,
                  color: "var(--text-primary)",
                }}
              />
              <Area
                type="monotone"
                dataKey="tasks"
                stroke="#d4708a"
                strokeWidth={2}
                fill="url(#taskGrad)"
                name="Tasks"
              />
              <Area
                type="monotone"
                dataKey="xp"
                stroke="#8b7fc7"
                strokeWidth={2}
                fill="url(#xpGrad)"
                name="XP"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <p className="text-xs text-right" style={{ color: "var(--text-muted)" }}>
          📈 Best day: Friday — 14 tasks, 210 XP
        </p>
      </div>
    </Widget>
  );
}
