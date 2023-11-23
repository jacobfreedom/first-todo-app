// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { UserProvider } from '@/providers/Context/UserContext'
import { useRouter } from 'next/navigation';

export function Providers({children}: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <UserProvider>
      {children}
      </UserProvider>
    </NextUIProvider>
  )
}