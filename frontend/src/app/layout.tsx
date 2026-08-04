import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "🌸 Shiora One — Your Peaceful Digital Life Companion",
  description:
    "A calm digital sanctuary where productivity, wellness, organization, and personal growth come together beautifully. Inspired by Japanese minimalism.",
  keywords: [
    "productivity",
    "task manager",
    "japanese aesthetic",
    "habit tracker",
    "pomodoro",
    "notes",
    "mood tracker",
    "digital workspace",
  ],
  authors: [{ name: "Shiora One" }],
  openGraph: {
    title: "🌸 Shiora One",
    description: "Your peaceful digital life companion",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakarta.variable}`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--bg-card)",
                border: "1px solid var(--border-soft)",
                color: "var(--text-primary)",
                borderRadius: "var(--radius-lg)",
                backdropFilter: "blur(20px)",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
