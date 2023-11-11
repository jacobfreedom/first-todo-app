// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { UserProvider } from '@/providers/Context/UserContext'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <UserProvider>
      {children}
      </UserProvider>
    </NextUIProvider>
  )
}