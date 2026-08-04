import { CherryBlossomParticles, FloatingOrbs } from "@/components/layout/CherryBlossomParticles";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <FloatingOrbs />
      <CherryBlossomParticles count={8} />
      <div className="relative z-10 w-full max-w-md px-4">
        {children}
      </div>
    </div>
  );
}
