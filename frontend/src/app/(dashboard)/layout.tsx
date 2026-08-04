"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { CherryBlossomParticles, FloatingOrbs } from "@/components/layout/CherryBlossomParticles";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative" style={{ background: "var(--bg-primary)" }}>
      {/* Ambient background */}
      <FloatingOrbs />
      <CherryBlossomParticles count={12} />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col"
        style={{ marginLeft: 260, minHeight: "100vh" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <DashboardHeader />
        <main className="flex-1 p-6 max-w-screen-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
}
