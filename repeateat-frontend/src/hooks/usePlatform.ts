import { useMemo } from 'react'

export type Platform = 'IOS' | 'android' | 'desktop' | 'standalone'

const detectPlatform = (): Platform => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'desktop'
  }

  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true

  if (isStandalone) return 'standalone'

  const ua = navigator.userAgent.toLowerCase()

  const isIOS =
    /iphone|ipad|ipod/.test(ua) ||
    (/macintosh/.test(ua) && navigator.maxTouchPoints > 1)

  if (isIOS) return 'IOS'
  if (/android/.test(ua)) return 'android'

  return 'desktop'
}

export const usePlatform = (): Platform => {
  return useMemo(() => detectPlatform(), [])
}
