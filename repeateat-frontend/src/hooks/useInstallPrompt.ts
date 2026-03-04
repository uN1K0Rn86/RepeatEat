import { useEffect, useState } from 'react'

type BIPEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferredPrompt: BIPEvent | null = null
let listenerAttached = false
const subscribers = new Set<(prompt: BIPEvent | null) => void>()

const notifySubscribers = () => {
  for (const callback of subscribers) {
    callback(deferredPrompt)
  }
}

if (typeof window !== 'undefined' && !listenerAttached) {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault()
    deferredPrompt = e as BIPEvent
    notifySubscribers()
  })

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
    notifySubscribers()
  })

  listenerAttached = true
}

export function useInstallPrompt() {
  const [canInstall, setCanInstall] = useState(() => deferredPrompt !== null)

  useEffect(() => {
    const onPromptChange = (prompt: BIPEvent | null) => {
      setCanInstall(prompt !== null)
    }

    subscribers.add(onPromptChange)
    onPromptChange(deferredPrompt)

    return () => {
      subscribers.delete(onPromptChange)
    }
  }, [])

  const install = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    deferredPrompt = null
    notifySubscribers()
  }

  return { canInstall, install }
}
