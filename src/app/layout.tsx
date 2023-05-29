import './globals.css'
import { Paytone_One } from 'next/font/google'

const paytone = Paytone_One({ weight: '400', subsets: ['latin'] })

export const metadata = {
  title: 'Qual o almoço do RU?',
  description: 'Seu almoço de hoje no RU da UFPI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={paytone.className}>{children}</body>
    </html>
  )
}
