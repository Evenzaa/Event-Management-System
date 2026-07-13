import { Sparkles } from 'lucide-react';
import Container from '../../../components/common/Container';
import HeroSearchBar from '../../../components/event/HeroSearchBar';
import StatBlock from '../../../components/event/StatBlock';


export default function HeroSection({ categories, stats, onSearch, isSearching }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: "url('/hero.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/80 to-slate-950" aria-hidden="true" />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <span className="mb-6 flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white">
          <Sparkles size={14} className="text-amber-400" />
          The #1 Event Ticketing Platform
        </span>

        <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-6xl">
          Find &amp; Book
        </h1>
        <h1 className="bg-gradient-to-r from-violet-400 via-violet-300 to-blue-400 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-6xl">
          Unforgettable Events
        </h1>

        <p className="mt-6 max-w-xl italic text-fuchsia-200 opacity-70">
          Discover concerts, festivals, conferences, and more — all in one place.
          Secure your seat in seconds.
        </p>

        {/* Search bar — navigates to /event-listing with params */}
        <div className="mt-8 w-full max-w-2xl">
          <HeroSearchBar
            categories={categories}
            onSearch={onSearch}
            isSearching={isSearching}
          />
        </div>

        <div className="mt-12 flex gap-10 sm:gap-16">
          {stats.map((stat) => (
            <StatBlock key={stat.id} value={stat.value} label={stat.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}
