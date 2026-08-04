"use client";

import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <Settings className="text-pink-400" /> Account & Workspace Settings
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Manage your personal profile, notification preferences, & integrations.
        </p>
      </div>

      <div className="p-6 rounded-3xl glass-card space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-400 flex items-center justify-center text-white text-2xl font-bold">
            P
          </div>
          <div>
            <h3 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>Pradeepa</h3>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>pradeepa@shiora.one • Level 7 Member</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-xs uppercase text-pink-400 tracking-wider">Preferences</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-2xl glass">
              <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Browser Push Notifications</span>
              <input type="checkbox" defaultChecked className="accent-pink-400" />
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl glass">
              <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>Lofi Sound Effects on Task Completion</span>
              <input type="checkbox" defaultChecked className="accent-pink-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
