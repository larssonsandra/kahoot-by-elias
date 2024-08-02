import type { Metadata } from 'next'
//import { Inter } from 'next/font/google'
import '../../globals.css'
import Link from 'next/link'

//const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kahoot by Elias ',
  description: 'Fun quiz game powered by Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="h-16 px-2 flex justify-between border-b border-gray-200 items-center">
        <h1>Kahoot by Elias </h1>
      </header>
      <div className="flex">
        <main className="flex-grow p-2">{children}</main>
      </div>
    </>
  )
}
