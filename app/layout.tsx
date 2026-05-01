// app/layout.tsx
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"
import Navbar from "@/components/Navbar"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Utkarsh Singh - Software Developer & Technology Enthusiast",
  description: "Utkarsh Singh is a software developer specializing in web development, innovative projects, and technological research. Explore my portfolio to see my latest work and achievements.",
  keywords: ["Utkarsh Singh", "Utkarsh singh vercel","utu vercel","software developer", "web developer", "portfolio", "projects", "research", "STES","Rocketry","Robotics","technology", "programming"],
  verification: {
    google: "VIISBcMdz-ry3c4AWjouvcnz_D5cxJfl15tC7fufm3w", // Replace with the code Google gives you
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="google-site-verification" content="VIISBcMdz-ry3c4AWjouvcnz_D5cxJfl15tC7fufm3w" />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="pb-24">
            {children}
          </main>
          <Navbar />
        </ThemeProvider>
        <SpeedInsights/>
        <Analytics/>
      </body>
    </html>
  )
}