"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setSubmitted(true);
    toast.success("Password reset email sent! 📩");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.34, 1.1, 0.64, 1] }}
    >
      <div
        className="rounded-3xl p-8 space-y-6"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        <Link href="/login" className="inline-flex items-center gap-2 text-xs font-medium text-muted" style={{ color: "var(--text-muted)" }}>
          <ArrowLeft size={14} /> Back to Sign In
        </Link>

        {!submitted ? (
          <>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                Reset Password
              </h1>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Enter your registered email address and we'll send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@domain.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-primary)",
                    }}
                    id="forgot-email"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                }}
                whileHover={{ scale: 1.02, boxShadow: "var(--shadow-glow)" }}
                whileTap={{ scale: 0.98 }}
                id="forgot-submit"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Send Reset Instructions 🌸"}
              </motion.button>
            </form>
          </>
        ) : (
          <div className="text-center py-4 space-y-4">
            <CheckCircle2 size={48} className="mx-auto" style={{ color: "var(--color-success)" }} />
            <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              Instructions Sent!
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              We've dispatched password recovery instructions to <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{email}</span>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-medium text-primary hover:underline"
              style={{ color: "var(--color-primary)" }}
            >
              Try another email address
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
