import React from 'react'

export const AppProviders: React.FC<React.PropsWithChildren> = ({children}) => {
  // Create a client using ref to avoid re-creating it on every render
  return <>{children}</>
}
