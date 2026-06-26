import { Fira_Code, VT323 } from 'next/font/google'
import './globals.css'
import AppShell from '@/components/AppShell'

const firaCode = Fira_Code({ subsets: ['latin'], display: 'swap' })
const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323', // Assign it a CSS variable
})

export const metadata = {
  metadataBase: new URL('https://isbat-portfolio.vercel.app'),
  title: 'Isbat Bin Hossain | Portfolio',
  description:
    'A Matrix themed portfolio of Isbat Bin Hossain, a Backend Engineer and System Builder, showcasing projects in Node.js, Python and more.',
  icons: {
    icon: { url: '/icon.svg', type: 'image/svg+xml' },
  },
  openGraph: {
    title: 'Isbat Bin Hossain | Portfolio',
    description:
      'A Matrix-themed portfolio showcasing the work of a backend engineer and system builder.',
    type: 'website',
    url: '/',
    images: ['/screenshots/hero_section.PNG'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Isbat Bin Hossain | Portfolio',
    description:
      'A Matrix-themed portfolio showcasing the work of a backend engineer and system builder.',
    images: ['/screenshots/hero_section.PNG'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${firaCode.className} ${vt323.variable} bg-background`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
