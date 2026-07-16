import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';
import PageLoadingState from '../../components/common/PageLoadingState';
import { useEventDetails } from '../../hooks/useEventDetails';

import EventBanner from './sections/EventBanner';
import EventInfo from './sections/EventInfo';
import CountdownTimer from './sections/CountdownTimer';
import AboutSection from './sections/AboutSection';
import EventGallery from './sections/EventGallery';
import TicketCard from './sections/TicketCard';

export default function EventDetails() {
  const { id: pathId } = useParams();
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get('id') || searchParams.get('eventId');

  const eventId = pathId || queryId;

  const { eventDetails, isLoading, error, retry } = useEventDetails(eventId);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <PageLoadingState />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !eventDetails) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-6">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h2>
            <p className="text-slate-500 mb-6">{error || 'Failed to load event details.'}</p>
            <button
              onClick={retry}
              className="px-6 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pb-20">
        <EventBanner
          bannerImage={eventDetails.bannerImage}
          title={eventDetails.title}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 relative z-10">
          <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

              {/* Left Column */}
              <div className="flex-1 min-w-0">
                <EventInfo
                  eventId={eventDetails.id}
                  title={eventDetails.title}
                  tags={eventDetails.tags}
                  date={eventDetails.date}
                  location={eventDetails.location}
                  organizer={eventDetails.organizer}
                />

                <CountdownTimer targetDate={eventDetails.date} />

                <AboutSection content={eventDetails.about} />

                <EventGallery galleryImages={eventDetails.gallery} />
              </div>

              {/* Right Column */}
              <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0">
                <TicketCard
                  eventId={eventDetails.id}
                  ticketData={eventDetails.tickets}
                />
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Floating Action Back To Top Button */}
      <button
        onClick={handleScrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white text-slate-600 rounded-full shadow-md border border-slate-100 flex items-center justify-center hover:bg-slate-50 hover:text-violet-600 transition-colors z-50"
        title="Scroll to Top"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}


