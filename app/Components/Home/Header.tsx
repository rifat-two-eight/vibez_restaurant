'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Restaurants', href: '/restaurant' },
    { name: 'Prices', href: '/about' },
    { name: 'FAQ', href: '/contact' },
    { name: 'Blogs', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={100} height={100} />
          </Link>
        </div>
        <nav className="hidden md:flex md:items-center md:gap-12 lg:gap-18">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm transition-colors ${isActive
                  ? "font-bold text-[#0F172A]"
                  : "font-medium text-[#0F172A]"
                  }`}
              >
                {link.name}

                {isActive && (
                  <span className="absolute -top-1 left-0 h-0.5 w-full bg-[#CF0738]" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <button className="rounded-full bg-[#CF0738] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700">
            Become a Partner
          </button>
        </div>
      </div>
    </header>
  );
}
