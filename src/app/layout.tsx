import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SiteNav } from "@/components/ui/site-nav";
import { LenisProvider } from "@/components/ui/lenis-provider";
import { SiteFooter } from "@/components/ui/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://himangshu.net"),
  title: {
    default: "HCI Lab IIITS | Human-Computer Interaction Laboratory",
    template: "%s | HCI Lab IIITS",
  },
  description:
    "Spatial Computing, Virtual Reality Coaching, Indian Sign Language Deep Learning, EOG Target Tracking, and GNN Video Detection at the Indian Institute of Information Technology Sri City.",
  keywords: [
    "Human-Computer Interaction",
    "HCI Lab",
    "IIIT Sri City",
    "Spatial Computing",
    "Virtual Reality",
    "XR Coaching",
    "Sign Language Translation",
    "EOG",
    "Electrooculography",
    "Dr. Himangshu Sarma",
    "Assistive Technology",
  ],
  authors: [{ name: "Dr. Himangshu Sarma", url: "https://himangshu.net" }],
  creator: "HCI Laboratory, IIIT Sri City",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://himangshu.net",
    title: "HCI Lab IIITS | Human-Computer Interaction Laboratory",
    description:
      "Advancing human-centered computing, mixed reality environments, biomechanical physics simulation, and accessibility AI at IIIT Sri City.",
    siteName: "HCI Lab IIIT Sri City",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "HCI Lab IIIT Sri City Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HCI Lab IIITS | Human-Computer Interaction Laboratory",
    description:
      "Advancing spatial computing, virtual reality coaching, and accessibility AI at IIIT Sri City.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
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
            <SiteFooter />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
