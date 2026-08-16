import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SiteNav } from "@/components/ui/site-nav";
import { LenisProvider } from "@/components/ui/lenis-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HCI Lab IIITS | Human Computer Interaction Laboratory",
  description: "Spatial Computing, Virtual Reality Coaching, Indian Sign Language Deep Learning, EOG Target Tracking, and GNN Video Detection at IIIT Sri City.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LenisProvider>
            <SiteNav />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
