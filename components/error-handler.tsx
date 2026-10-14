'use client'

import { useEffect } from 'react'

export function ErrorHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Handle unhandled promise rejections, specifically MetaMask errors
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason as any
      
      // Suppress MetaMask connection errors
      if (reason?.message?.includes('MetaMask') || 
          reason?.message?.includes('Failed to connect') ||
          reason?.stack?.includes('chrome-extension')) {
        event.preventDefault()
        console.debug('MetaMask extension error suppressed:', reason?.message)
        return
      }
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return <>{children}</>
}
