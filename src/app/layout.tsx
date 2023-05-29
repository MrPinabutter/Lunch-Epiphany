"use client";

import './globals.css'
import { Paytone_One } from 'next/font/google'
import { Head } from 'next/document';


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
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4880529356907888"
          crossOrigin="anonymous"></script>
      </Head>
      <body className={paytone.className}>{children}</body>
    </html>
  )
}
