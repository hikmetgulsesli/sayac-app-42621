import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'

// Toast notification type
type Toast = {
  id: number
  message: string
  type: 'info' | 'success' | 'warning'
}

function App() {
  const [count, setCount] = useState(0)
  const [lastCount, setLastCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [boundaryMessage, setBoundaryMessage] = useState<string | null>(null)
  const toastIdRef = useRef(0)

  // Show toast notification
  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = ++toastIdRef.current
    const newToast: Toast = { id, message, type }
    setToasts(prev => [...prev, newToast])
    
    // Auto remove after 2 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 2000)
  }, [])

  // Show boundary message
  const showBoundaryMessage = useCallback((message: string) => {
    setBoundaryMessage(message)
    setTimeout(() => setBoundaryMessage(null), 1500)
  }, [])

  // Increment function
  const increment = useCallback(() => {
    setLastCount(count)
    setCount(c => c + 1)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 150)
  }, [count])

  // Decrement function
  const decrement = useCallback(() => {
    if (count > 0) {
      setLastCount(count)
      setCount(c => c - 1)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 150)
    } else {
      // Boundary state: cannot go below 0
      showBoundaryMessage('Sayaç 0\'ın altına düşemez')
    }
  }, [count, showBoundaryMessage])

  // Reset function
  const reset = useCallback(() => {
    if (count !== 0) {
      setLastCount(count)
      setCount(0)
      showToast('Sayaç sıfırlandı', 'success')
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 150)
    }
  }, [count, showToast])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for game-like keys to avoid page scroll
      if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', ' '].includes(e.key)) {
        e.preventDefault()
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowRight':
        case '+':
        case '=':
          increment()
          break
        case 'ArrowDown':
        case 'ArrowLeft':
        case '-':
          decrement()
          break
        case 'r':
        case 'R':
          reset()
          break
        case '0':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            reset()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [increment, decrement, reset])

  // Announce count changes for screen readers
  useEffect(() => {
    const announcement = document.getElementById('count-announcement')
    if (announcement) {
      announcement.textContent = `Sayaç ${count}`
    }
  }, [count])

  const navItems = [
    { icon: 'add_circle', label: 'Sayaç', active: true },
    { icon: 'history', label: 'Geçmiş', active: false },
    { icon: 'emoji_events', label: 'Kilometre Taşları', active: false },
    { icon: 'settings', label: 'Ayarlar', active: false },
  ]

  const isDecrementDisabled = count === 0

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--on-surface)] overflow-hidden">
      {/* Screen reader announcement */}
      <div 
        id="count-announcement" 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      />

      {/* Toast notifications */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className={`toast px-4 py-2 rounded-lg text-sm font-medium ${
              toast.type === 'success' ? 'bg-[var(--primary)] text-[var(--on-primary)]' :
              toast.type === 'warning' ? 'bg-[var(--secondary)] text-[var(--on-secondary)]' :
              'bg-[var(--surface-container-high)] text-[var(--on-surface)]'
            }`}
            role="status"
            aria-live="polite"
          >
            {toast.message}
          </div>
        ))}
      </div>

      {/* Boundary state message */}
      <div 
        className={`fixed top-28 left-1/2 -translate-x-1/2 z-[60] boundary-indicator ${
          boundaryMessage ? 'active' : 'inactive'
        }`}
        role="alert"
        aria-live="assertive"
      >
        {boundaryMessage && (
          <div className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--secondary)] text-[var(--on-secondary)]">
            {boundaryMessage}
          </div>
        )}
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-transparent backdrop-blur-xl z-50 flex justify-between items-center px-8 py-6">
        <div className="text-xl font-black tracking-tight">
          <span className="text-[var(--primary)]">Sayaç</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            className="text-zinc-500 hover:text-white transition-colors duration-300 scale-95 active:scale-90 active:duration-100"
            aria-label="Geçmiş"
            title="Geçmiş (G)"
          >
            <span className="material-symbols-outlined">history</span>
          </button>
          <button 
            className="text-zinc-500 hover:text-white transition-colors duration-300 scale-95 active:scale-90 active:duration-100"
            aria-label="Ayarlar"
            title="Ayarlar"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      {/* Sidebar Navigation - Desktop */}
      <nav className="hidden md:flex fixed inset-y-0 left-0 z-50 flex-col p-6 h-full w-72">
        <div className="mb-12 mt-8">
          <h1 className="text-2xl font-extrabold text-white mb-1">Sayaç</h1>
          <p className="text-[var(--on-surface-variant)] text-sm">Basit sayaç uygulaması</p>
        </div>
        
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium uppercase tracking-[0.1em] text-[10px] transition-all ${
                item.active
                  ? 'text-[var(--primary)] font-bold bg-zinc-800/50'
                  : 'text-zinc-500 hover:bg-zinc-800/50 hover:text-white'
              }`}
              aria-current={item.active ? 'page' : undefined}
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>

        <div className="mt-auto p-4 rounded-2xl bg-[var(--surface-container-low)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
              <span className="material-symbols-outlined text-[var(--on-primary)] text-lg">person</span>
            </div>
            <div>
              <div className="text-sm font-medium text-white">Kullanıcı</div>
              <div className="text-xs text-[var(--on-surface-variant)]">Çevrimiçi</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 md:ml-72 bg-[var(--surface)]">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-1/4 -right-24 w-64 h-64 rounded-full bg-[var(--primary)]/5 blur-3xl" />
          <div className="absolute top-1/3 -left-24 w-48 h-48 rounded-full bg-[var(--secondary)]/5 blur-3xl" />
        </div>

        {/* Counter Display */}
        <div className="relative z-10 flex flex-col items-center">
          <div 
            className={`text-[12rem] md:text-[16rem] font-black text-white leading-none tracking-tighter select-none ${
              isAnimating ? 'animate-count' : ''
            }`}
            role="text"
            aria-label={`Mevcut sayaç değeri: ${count}`}
          >
            {count}
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            <div className="flex flex-col items-center">
              <span className="text-[var(--on-surface-variant)] text-xs uppercase tracking-wider">Mevcut</span>
              <span className="text-white text-lg font-semibold">{count}</span>
            </div>
            <div className="w-[1px] h-10 bg-[var(--surface-container-highest)]" />
            <div className="flex flex-col items-center">
              <span className="text-[var(--on-surface-variant)] text-xs uppercase tracking-wider">Son</span>
              <span className="text-white text-lg font-semibold">{lastCount}</span>
            </div>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="mt-8 flex items-center gap-4 text-[var(--on-surface-variant)] text-xs">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 rounded bg-[var(--surface-container)] text-[10px]">↑</kbd>
              <span>Artır</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 rounded bg-[var(--surface-container)] text-[10px]">↓</kbd>
              <span>Azalt</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 rounded bg-[var(--surface-container)] text-[10px]">R</kbd>
              <span>Sıfırla</span>
            </span>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-8 mt-16">
          <button
            onClick={reset}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-all duration-300"
            aria-label="Sıfırla"
            title="Sıfırla (R)"
          >
            <span className="material-symbols-outlined">refresh</span>
            <span className="text-sm font-medium">Sıfırla</span>
          </button>
        </div>
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-6 pb-10 pt-6 bg-[var(--surface-container)]/80 backdrop-blur-xl rounded-t-[32px] md:hidden">
        <button
          onClick={reset}
          className="flex flex-col items-center justify-center text-zinc-400 p-3 hover:bg-zinc-800 rounded-xl transition-all scale-95 active:scale-90 duration-200"
          aria-label="Sıfırla"
        >
          <span className="material-symbols-outlined">refresh</span>
          <span className="text-[10px] mt-1">Sıfırla</span>
        </button>

        <button
          onClick={decrement}
          disabled={isDecrementDisabled}
          className="flex flex-col items-center justify-center text-zinc-400 p-3 hover:bg-zinc-800 rounded-xl transition-all scale-95 active:scale-90 duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Azalt"
          aria-disabled={isDecrementDisabled}
          title="Azalt (↓)"
        >
          <span className="material-symbols-outlined">remove</span>
          <span className="text-[10px] mt-1">Azalt</span>
        </button>

        <button
          onClick={increment}
          className="flex flex-col items-center justify-center bg-tactile-gradient text-black rounded-3xl p-6 -mt-16 shadow-[0_12px_40px_rgba(63,255,139,0.4)] scale-100 active:scale-90 transition-all duration-200"
          aria-label="Artır"
          title="Artır (↑)"
        >
          <span className="material-symbols-outlined text-2xl">add</span>
        </button>
      </nav>

      {/* Desktop Floating Action Buttons */}
      <div className="hidden md:flex fixed bottom-12 left-1/2 -translate-x-1/2 items-center gap-6">
        <button
          onClick={decrement}
          disabled={isDecrementDisabled}
          className="flex flex-col items-center justify-center text-zinc-400 p-4 hover:bg-[var(--surface-container-high)] rounded-2xl transition-all scale-95 active:scale-90 duration-200 disabled:opacity-30 disabled:cursor-not-allowed border border-[var(--outline-variant)]"
          aria-label="Azalt"
          aria-disabled={isDecrementDisabled}
          title="Azalt (↓ veya -)"
        >
          <span className="material-symbols-outlined text-2xl">remove</span>
          <span className="text-xs mt-1 keyboard-hint">↓</span>
        </button>

        <button
          onClick={increment}
          className="flex flex-col items-center justify-center w-20 h-20 bg-tactile-gradient text-black rounded-2xl shadow-[0_12px_40px_rgba(63,255,139,0.4)] scale-100 active:scale-90 transition-all duration-200 hover:shadow-[0_16px_50px_rgba(63,255,139,0.5)]"
          aria-label="Artır"
          title="Artır (↑ veya +)"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>

      {/* Accessibility: Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--primary)] focus:text-[var(--on-primary)] focus:rounded-lg"
      >
        Ana içeriğe atla
      </a>
    </div>
  )
}

export default App
