import Container from '../components/common/Container';

const FOOTER_COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'Browse Events', href: '/explore' },
      { label: 'My Bookings', href: '/account/bookings' },
      { label: 'Favorites', href: '/account/favorites' },
    ],
  },
  {
    title: 'Organizers',
    links: [
      { label: 'Create Event', href: '/organizer/create' },
      { label: 'Dashboard', href: '/organizer/dashboard' },
      { label: 'Analytics', href: '/organizer/analytics' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-3 flex items-center gap-2 font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-500" />
            <span className="text-lg">Evenzaa</span>
          </div>
          <p className="max-w-xs text-sm text-slate-400">
            Your gateway to unforgettable live experiences. Discover, book, and
            attend events worldwide.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="mb-3 text-sm font-semibold text-white">{column.title}</h3>
            <ul className="space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 py-6 text-xs text-slate-500 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Evenzaa. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/terms" className="hover:text-white">Terms</a>
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <a href="/cookies" className="hover:text-white">Cookies</a>
        </div>
      </Container>
    </footer>
  );
}
