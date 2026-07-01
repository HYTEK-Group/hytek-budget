import type { Metadata, Viewport } from 'next'
import { Jost } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ThemeProvider } from "@/components/theme-provider"
import ThemeToggle from "@/components/theme-toggle"

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'HYTEK Budget',
  description: 'HYTEK Framing — Budget tracking & site logging',
}

// Mobile-first: lock viewport so site crew don't accidentally pinch-zoom mid-log
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#231F20',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jost.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <Providers>{children}</Providers>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}
