'use client';

import { useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MenuBar } from '@/components/ui/menu-bar';
import { Newspaper, Users2, FolderGit2, ScrollText, Home } from 'lucide-react';

export function SiteNav() {
  const router = useRouter();
  const pathname = usePathname();

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

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 max-w-full overflow-x-auto">
      <MenuBar
        items={items}
        activeItem={active}
        onItemClick={(label) => {
          const dest = items.find((i) => i.label === label)?.href ?? '/';
          router.push(dest);
        }}
      />
    </div>
  );
}


