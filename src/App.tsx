import { useState } from 'react'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(c => c + 1)
  const decrement = () => setCount(c => Math.max(0, c - 1))
  const reset = () => setCount(0)

  const navItems = [
    { icon: 'add_circle', label: 'Sayaç', active: true },
    { icon: 'history', label: 'Geçmiş', active: false },
    { icon: 'emoji_events', label: 'Kilometre Taşları', active: false },
    { icon: 'settings', label: 'Ayarlar', active: false },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--on-surface)] overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-transparent backdrop-blur-xl z-50 flex justify-between items-center px-8 py-6">
        <div className="text-xl font-black tracking-tight">
          <span className="text-[var(--primary)]">Sayaç</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            className="text-zinc-500 hover:text-white transition-colors duration-300 scale-95 active:scale-90 active:duration-100"
            aria-label="Geçmiş"
          >
            <span className="material-symbols-outlined">history</span>
          </button>
          <button 
            className="text-zinc-500 hover:text-white transition-colors duration-300 scale-95 active:scale-90 active:duration-100"
            aria-label="Ayarlar"
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
              <div className="text-[9px] text-[var(--on-surface-variant)]">Hazır</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 md:ml-72 bg-[var(--surface)]">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-1/4 -right-24 w-64 h-64 rounded-full bg-[var(--primary)]/5 blur-3xl"></div>
          <div className="absolute top-1/3 -left-24 w-48 h-48 rounded-full bg-[var(--secondary)]/5 blur-3xl"></div>
        </div>

        {/* Counter Display */}
        <div className="relative z-10 flex flex-col items-center">
          <div 
            className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter text-white transition-all duration-300 select-none"
            style={{ 
              textShadow: '0 0 80px rgba(63, 255, 139, 0.3)',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {count}
          </div>
          
          {/* Counter Label */}
          <div className="flex items-center gap-8 mt-12">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">{count}</span>
              <span className="text-[var(--on-surface-variant)] text-xs uppercase tracking-wider mt-1">Mevcut</span>
            </div>
            <div className="w-[1px] h-10 bg-[var(--surface-container-highest)]"></div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[var(--primary)]">{count > 0 ? count : '-'}</span>
              <span className="text-[var(--on-surface-variant)] text-xs uppercase tracking-wider mt-1">Son</span>
            </div>
          </div>
        </div>

        {/* Reset Button - Desktop */}
        <button
          onClick={reset}
          className="hidden md:flex fixed top-1/2 right-12 -translate-y-1/2 flex-col items-center gap-4 group"
          aria-label="Sıfırla"
        >
          <div className="flex items-center gap-2 text-zinc-600 group-hover:text-white transition-all duration-300">
            <span className="material-symbols-outlined">refresh</span>
            <span className="text-sm font-medium">Sıfırla</span>
          </div>
        </button>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-6 pb-10 pt-6 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/90 to-transparent">
        {/* Decrement Button */}
        <button
          onClick={decrement}
          disabled={count === 0}
          className="flex flex-col items-center justify-center text-zinc-400 p-3 hover:bg-zinc-800 transition-all scale-95 active:scale-90 duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Azalt"
        >
          <span className="material-symbols-outlined text-2xl">remove</span>
          <span className="text-[10px] uppercase tracking-wider mt-1">Azalt</span>
        </button>

        {/* Increment Button - Prominent */}
        <button
          onClick={increment}
          className="flex flex-col items-center justify-center bg-[var(--primary)] text-black rounded-3xl p-6 -mt-16 shadow-[0_12px_40px_rgba(63,255,139,0.4)] scale-100 active:scale-90 transition-all duration-200 hover:bg-[var(--primary-container)]"
          aria-label="Artır"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
          <span className="text-[10px] uppercase tracking-wider mt-1 font-semibold">Artır</span>
        </button>

        {/* Reset Button - Mobile */}
        <button
          onClick={reset}
          className="flex flex-col items-center justify-center text-zinc-400 p-3 hover:bg-zinc-800 transition-all scale-95 active:scale-90 duration-200 md:hidden"
          aria-label="Sıfırla"
        >
          <span className="material-symbols-outlined text-2xl">refresh</span>
          <span className="text-[10px] uppercase tracking-wider mt-1">Sıfırla</span>
        </button>

        {/* Placeholder for desktop to balance layout */}
        <div className="hidden md:block w-16"></div>
      </nav>

      {/* Decorative elements */}
      <div className="fixed top-32 right-8 w-48 h-48 border border-white/5 rounded-3xl hidden lg:block"></div>
      <div className="fixed bottom-40 left-80 w-32 h-32 border border-white/5 rounded-full hidden lg:block"></div>
    </div>
  )
}

export default App
