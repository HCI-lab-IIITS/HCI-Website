'use client';

import { useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MenuBar } from '@/components/ui/menu-bar';
import { Newspaper, Users2, FolderGit2, ScrollText, Home, Menu, X, Gamepad2, Zap } from 'lucide-react';

export function SiteNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const items = useMemo(
    () => [
      {
        icon: Home,
        label: 'Home',
        href: '/',
        gradient:
          'radial-gradient(200px 200px at center, rgba(59,130,246,0.35), rgba(168,85,247,0.25), rgba(239,68,68,0.2))',
        iconColor: 'text-blue-400',
      },
      {
        icon: ScrollText,
        label: 'Publications',
        href: '/publications',
        gradient:
          'radial-gradient(200px 200px at center, rgba(168,85,247,0.35), rgba(59,130,246,0.25), rgba(34,197,94,0.2))',
        iconColor: 'text-purple-400',
      },
      {
        icon: Users2,
        label: 'People',
        href: '/people',
        gradient:
          'radial-gradient(200px 200px at center, rgba(34,197,94,0.35), rgba(59,130,246,0.25), rgba(168,85,247,0.2))',
        iconColor: 'text-emerald-400',
      },
      {
        icon: FolderGit2,
        label: 'Projects',
        href: '/projects',
        gradient:
          'radial-gradient(200px 200px at center, rgba(59,130,246,0.35), rgba(34,197,94,0.25), rgba(168,85,247,0.2))',
        iconColor: 'text-sky-400',
      },
      {
        icon: Newspaper,
        label: 'News',
        href: '/news',
        gradient:
          'radial-gradient(200px 200px at center, rgba(239,68,68,0.35), rgba(168,85,247,0.25), rgba(59,130,246,0.2))',
        iconColor: 'text-red-400',
      },
    ],
    [],
  );

  const active = useMemo(() => {
    const match = items.find((i) => i.href === pathname);
    return match?.label ?? 'Home';
  }, [items, pathname]);

  const handleItemClick = (label: string) => {
    const dest = items.find((i) => i.label === label)?.href ?? '/';
    router.push(dest);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-4 left-4 md:left-1/2 md:-translate-x-1/2 z-50 flex items-center gap-4">
      {/* Mobile Navigation */}
      <div className="block md:hidden relative">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-[#d4af37]/40 shadow-xl"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <Menu className="h-5 w-5 text-white" />
          )}
          <span className="text-white/90 font-medium text-sm">{active}</span>
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-2xl border border-[#d4af37]/40 shadow-2xl rounded-2xl p-4">
            <div className="space-y-2">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = item.label === active;

                return (
                  <button
                    key={item.label}
                    onClick={() => handleItemClick(item.label)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-white/10 text-[#f3d068] border border-[#d4af37]/40'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? item.iconColor : 'text-white/70'}`} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                <a
                  href="/xr-hack-25"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300 hover:bg-purple-950/40 border border-purple-500/30 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Zap className="h-5 w-5 text-purple-400" />
                  <span className="font-medium">XR Hack &apos;25</span>
                </a>

                <a
                  href="/global-game-jam"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-green-300 hover:bg-green-950/40 border border-green-500/30 transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Gamepad2 className="h-5 w-5 text-green-400" />
                  <span className="font-medium">Global Game Jam</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <MenuBar
          items={items}
          activeItem={active}
          onItemClick={handleItemClick}
        />

        <div className="flex items-center gap-3 ml-2 pl-6 border-l border-white/15">
          <a
            href="/xr-hack-25"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/50 rounded-xl text-purple-300 hover:text-white transition-all backdrop-blur-md relative group"
            style={{
              boxShadow: '0 0 15px rgba(168, 85, 247, 0.25)'
            }}
          >
            <Zap className="h-4 w-4 text-purple-400 group-hover:scale-125 transition-transform" />
            <span className="text-xs font-semibold whitespace-nowrap">XR Hack &apos;25</span>
          </a>

          <a
            href="/global-game-jam"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-950/50 hover:bg-green-900/60 border border-green-500/50 rounded-xl text-green-300 hover:text-white transition-all backdrop-blur-md relative group"
            style={{
              boxShadow: '0 0 15px rgba(34, 197, 94, 0.25)'
            }}
          >
            <Gamepad2 className="h-4 w-4 text-green-400 group-hover:scale-125 transition-transform" />
            <span className="text-xs font-semibold whitespace-nowrap">Global Game Jam</span>
          </a>
        </div>
      </div>
    </div>
  );
}
