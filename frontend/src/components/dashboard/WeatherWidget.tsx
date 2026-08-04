"use client";

import { motion } from "framer-motion";
import { Widget } from "./Widget";
import { Cloud, Sun, CloudRain, Wind, Droplets } from "lucide-react";
import { useEffect, useState } from "react";

type WeatherCondition = "sunny" | "cloudy" | "rainy";

const weatherIcons: Record<WeatherCondition, React.ReactNode> = {
  sunny: <Sun size={32} style={{ color: "#e9a84c" }} />,
  cloudy: <Cloud size={32} style={{ color: "#8b7fc7" }} />,
  rainy: <CloudRain size={32} style={{ color: "#4fb3d8" }} />,
};

const weatherBg: Record<WeatherCondition, string> = {
  sunny: "linear-gradient(135deg, rgba(233,168,76,0.12), rgba(240,192,112,0.06))",
  cloudy: "linear-gradient(135deg, rgba(139,127,199,0.12), rgba(180,160,220,0.06))",
  rainy: "linear-gradient(135deg, rgba(79,179,216,0.12), rgba(100,160,200,0.06))",
};

// Mock weather data (replace with real API in production)
const MOCK_WEATHER = {
  condition: "sunny" as WeatherCondition,
  temp: 28,
  humidity: 65,
  wind: 12,
  city: "Chennai",
  description: "Partly Sunny",
  feelsLike: 31,
};

export function WeatherWidget() {
  const [weather] = useState(MOCK_WEATHER);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Widget
      accentColor="#e9a84c"
      delay={0.05}
    >
      <div
        className="rounded-xl p-4 space-y-3"
        style={{ background: weatherBg[weather.condition] }}
      >
        {/* City + Condition */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              📍 {weather.city}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {weather.description}
            </p>
          </div>
          <motion.div
            animate={{ rotate: weather.condition === "sunny" ? [0, 10, 0] : [0, -5, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {weatherIcons[weather.condition]}
          </motion.div>
        </div>

        {/* Temperature */}
        <div className="flex items-end gap-2">
          <motion.span
            className="text-4xl font-bold"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {weather.temp}°
          </motion.span>
          <span className="text-sm pb-1" style={{ color: "var(--text-muted)" }}>
            Feels {weather.feelsLike}°C
          </span>
        </div>

        {/* Details */}
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <Droplets size={13} style={{ color: "#4fb3d8" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {weather.humidity}%
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wind size={13} style={{ color: "#8b7fc7" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {weather.wind} km/h
            </span>
          </div>
        </div>
      </div>
    </Widget>
  );
}
