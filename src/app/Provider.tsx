// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
    </NextUIProvider>
  )
}