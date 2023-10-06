import '../styles/globals.css'
import type { Metadata } from 'next'
import {Providers} from '../providers/providers.tsx';

export const metadata: Metadata = {
  title: 'First To-Do App',
  description: 'Learning NextJS and other techstacks in the progress',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
