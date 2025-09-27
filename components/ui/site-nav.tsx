'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MenuBar } from '@/components/ui/menu-bar';
import { Newspaper, Users2, FolderGit2, ScrollText, Home, Menu, X } from 'lucide-react';

export function SiteNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
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

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-4">
      {isMobile ? (
        // Mobile Navigation
        <div className="relative">
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
              </div>
            </div>
          )}
        </div>
      ) : (
        // Desktop Navigation
        <div className="flex items-center gap-3">
          <MenuBar
            items={items}
            activeItem={active}
            onItemClick={handleItemClick}
          />
        </div>
      )}
    </div>
  );
}


