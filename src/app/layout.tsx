import './globals.css'
import type { Metadata } from 'next'
import { Nova_Square } from "next/font/google"
import Providers from './Provider'
import NavBar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'

const spartan = Nova_Square({ subsets: ['latin'], weight:['400'] })

export const metadata: Metadata = {
  title: 'Infinity Game',
  icons:{ icon:['/favicon.ico?v=4'],
  apple:['/apple-touch-icon.png?v=4'],
  shortcut:['/apple-touch-icon.png']
  },
  manifest: 'site/webmanifest'
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en" className='dark'>
      <body className={spartan.className}>
        <Providers>
          <NavBar/>
          {children}
          <Footer/>
        </Providers>
        </body>
    </html>
  )
}
