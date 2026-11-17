
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CyberFirstAid",
  description:
    "CyberFirstAid - An Intelligent Cyber Incident Response, Digital Evidence Preservation and Recovery Assistance Platform",
  applicationName: "CyberFirstAid",
  keywords: [
    "CyberFirstAid",
    "Cybersecurity",
    "Cyber Incident Response",
    "Digital Evidence Preservation",
    "Cybercrime Assistance",
    "Recovery Tracker",
    "Cyber Safety",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
