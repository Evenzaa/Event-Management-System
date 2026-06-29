import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';
import PageLoadingState from '../../components/common/PageLoadingState';
import { useLandingPageData } from '../../hooks/useLandingPageData';
import { useEventSearch } from '../../hooks/useEventSearch';

import HeroSection from './sections/HeroSection';
import CategorySection from './sections/CategorySection';
import FeaturedEventsSection from './sections/FeaturedEventsSection';
import UpcomingEventsSection from './sections/UpcomingEventsSection';
import LastMinuteDealsSection from './sections/LastMinuteDealsSection';
import CtaSection from './sections/CtaSection';


export default function LandingPage() {
  const {
    categories,
    stats,
    featuredEvents,
    upcomingEvents,
    deals,
    isLoading,
    error,
  } = useLandingPageData();

  const { search, isSearching } = useEventSearch();

  function handleSearch({ query, category }) {
    search({ query, category });
  }

  function handleCategorySelect(category) {
    console.log('Category selected:', category.id);
  }

  function handleBookNow(event) {
    console.log('Book now:', event.id);
  }

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <PageLoadingState />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
          <p className="text-slate-500">
            Something went wrong loading events. Please try again shortly.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main>
        <HeroSection
          categories={categories}
          stats={stats}
          onSearch={handleSearch}
          isSearching={isSearching}
        />

        <CategorySection
          categories={categories}
          onCategorySelect={handleCategorySelect}
        />

        <FeaturedEventsSection
          events={featuredEvents}
          onBookNow={handleBookNow}
        />

        <UpcomingEventsSection events={upcomingEvents} />

        <LastMinuteDealsSection deals={deals} />

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
