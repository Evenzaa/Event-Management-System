import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';

const NAV_LINKS = [
  { label: 'Explore', href: '/explore' },
  { label: 'Categories', href: '/categories' },
  { label: 'Organizers', href: '/organizers' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <Container className="flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-500" />
          <span className="text-lg">EventPass</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a href="/login" className="text-sm font-semibold text-violet-600 hover:text-violet-700">
            Log In
          </a>
          <Button as="a" href="/signup" size="md">
            Get Started
          </Button>
        </div>

        <button
          type="button"
          className="cursor-pointer p-2 md:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <Container className="flex flex-col gap-4 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <a href="/login" className="text-sm font-semibold text-violet-600">
                Log In
              </a>
              <Button as="a" href="/signup" size="sm">
                Get Started
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
