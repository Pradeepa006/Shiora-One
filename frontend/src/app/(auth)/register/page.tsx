"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Sparkles, Loader2, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  displayName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    toast.success("Welcome to Shiora One! 🌸", {
      description: "Your peaceful workspace has been created.",
    });
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
        <div className="text-center space-y-2">
          <motion.div
            className="text-5xl mb-3 inline-block"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            🌸
          </motion.div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Begin Your Journey
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Create your personal digital sanctuary
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Display Name & Username in 2 cols */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                Display Name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ color: "var(--text-muted)" }} />
                <input
                  {...register("displayName")}
                  placeholder="Sakura"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "var(--bg-card)",
                    border: `1px solid ${errors.displayName ? "var(--color-danger)" : "var(--border-soft)"}`,
                    color: "var(--text-primary)",
                  }}
                  id="reg-display-name"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold" style={{ color: "var(--text-muted)" }}>@</span>
                <input
                  {...register("username")}
                  placeholder="sakura_dev"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "var(--bg-card)",
                    border: `1px solid ${errors.username ? "var(--color-danger)" : "var(--border-soft)"}`,
                    color: "var(--text-primary)",
                  }}
                  id="reg-username"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              Email Address
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                {...register("email")}
                type="email"
                placeholder="sakura@shiora.io"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${errors.email ? "var(--color-danger)" : "var(--border-soft)"}`,
                  color: "var(--text-primary)",
                }}
                id="reg-email"
              />
            </div>
            {errors.email && (
              <p className="text-xs mt-1" style={{ color: "var(--color-danger)" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              Password
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 characters"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${errors.password ? "var(--color-danger)" : "var(--border-soft)"}`,
                  color: "var(--text-primary)",
                }}
                id="reg-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                style={{ color: "var(--text-muted)" }}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                {...register("confirmPassword")}
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter password"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "var(--bg-card)",
                  border: `1px solid ${errors.confirmPassword ? "var(--color-danger)" : "var(--border-soft)"}`,
                  color: "var(--text-primary)",
                }}
                id="reg-confirm-password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs mt-1" style={{ color: "var(--color-danger)" }}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            }}
            whileHover={{ scale: 1.02, boxShadow: "var(--shadow-glow)" }}
            whileTap={{ scale: 0.98 }}
            id="reg-submit"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Create Sanctuary ✨"}
          </motion.button>
        </form>

        <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold" style={{ color: "var(--color-primary)" }}>
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
