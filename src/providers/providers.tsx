// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { ColorProvider } from '@/app/ColorContext'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ColorProvider>
      {children}
      </ColorProvider>
    </NextUIProvider>
  )
}