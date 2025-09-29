'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MenuBar } from '@/components/ui/menu-bar';
import { Newspaper, Users2, FolderGit2, ScrollText, Home, Menu, X, Gamepad2, Zap } from 'lucide-react';

export function SiteNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const checkMobile = () => {
      // This effect only runs on client, so we don't need mobile detection here
      // We'll use CSS classes for responsive behavior
    };

    // Only add resize listener if needed
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  // Use CSS-only responsive approach to prevent hydration mismatch
  return (
    <div className="fixed top-4 left-4 md:left-1/2 md:-translate-x-1/2 z-50 flex items-center gap-4">
      {/* Mobile Navigation - Hidden on desktop */}
      <div className="block md:hidden relative">
        {/* Hamburger Menu Button with Current Page Name */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-b from-background/20 to-background/10 backdrop-blur-lg border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <Menu className="h-5 w-5 text-white" />
          )}
          <span className="text-white/90 font-medium text-sm">{active}</span>
        </button>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-gradient-to-b from-background/20 to-background/10 backdrop-blur-lg border border-border/40 shadow-lg rounded-2xl p-4">
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
                        ? 'bg-white/10 text-white border border-white/20'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? item.iconColor : 'text-white/70'}`} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}

              {/* Special Event Buttons in Mobile Menu */}
              <div className="pt-4 mt-4 border-t border-white/10">
                <div className="text-xs text-white/50 uppercase tracking-wider mb-3 px-4">Events</div>
                <div className="space-y-2">

                <a
                    href="/xr-hack-25"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Zap className="h-5 w-5 text-purple-400" />
                    <span className="font-medium">XR Hack '25</span>
                  </a>


                  <a
                    href="/global-game-jam"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Gamepad2 className="h-5 w-5 text-green-400" />
                    <span className="font-medium">Global Game Jam</span>
                  </a>

                  
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden md:flex items-center gap-6">
        <MenuBar
          items={items}
          activeItem={active}
          onItemClick={handleItemClick}
        />

        {/* Special Event Buttons */}
        <div className="flex items-center gap-3 ml-4 pl-9 border-l border-white/10">

        <a
            href="/xr-hack-25"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-400/20 to-pink-400/20 hover:from-purple-400/30 hover:to-pink-400/30 border-2 border-purple-400/40 hover:border-purple-400/60 rounded-xl text-white/90 hover:text-white transition-all duration-300 backdrop-blur-sm min-w-[140px] relative overflow-hidden group animate-pulse hover:animate-none"
            style={{
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.2), inset 0 0 20px rgba(168, 85, 247, 0.05)',
              animation: 'glow-purple 2s ease-in-out infinite alternate'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            <Zap className="h-4 w-4 flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium whitespace-nowrap relative z-10">XR Hack '25</span>
          </a>
          <a
            href="/global-game-jam"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400/20 to-emerald-400/20 hover:from-green-400/30 hover:to-emerald-400/30 border-2 border-green-400/40 hover:border-green-400/60 rounded-xl text-white/90 hover:text-white transition-all duration-300 backdrop-blur-sm min-w-[160px] relative overflow-hidden group animate-pulse hover:animate-none"
            style={{
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.2), inset 0 0 20px rgba(34, 197, 94, 0.05)',
              animation: 'glow-green 2s ease-in-out infinite alternate'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            <Gamepad2 className="h-4 w-4 flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium whitespace-nowrap relative z-10">Global Game Jam</span>
          </a>

          
        </div>
      </div>
    </div>
  );
}


