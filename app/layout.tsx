import type { Metadata, Viewport } from 'next'
import { Cinzel } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const cinzel = Cinzel({ 
  subsets: ["latin"],
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'DharmSetu - Connecting You to Justice & Legal Wisdom',
  description: 'DharmSetu bridges the gap between citizens and legal professionals. Find trusted lawyers, get AI-powered case insights, and access mental wellness support.',
  keywords: ['legal', 'lawyers', 'justice', 'law', 'legal advice', 'case analysis', 'mental wellness', 'India', 'constitution'],
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f4' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cinzel.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('error', function(e) {
              if (e.message && (e.message.includes('MetaMask') || e.message.includes('Failed to connect'))) {
                e.preventDefault();
              }
            }, true);
            window.addEventListener('unhandledrejection', function(event) {
              if (event.reason && event.reason.message && 
                  (event.reason.message.includes('MetaMask') || 
                   event.reason.message.includes('Failed to connect') ||
                   event.reason.stack && event.reason.stack.includes('chrome-extension'))) {
                event.preventDefault();
              }
            }, true);
          `
        }} />
      </head>
      <body className="font-sans antialiased bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
