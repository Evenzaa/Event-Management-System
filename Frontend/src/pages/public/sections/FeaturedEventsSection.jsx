import Container from '../../../components/common/Container';
import SectionHeader from '../../../components/common/SectionHeader';
import EventCard from '../../../components/event/EventCard';

export default function FeaturedEventsSection({ events, onBookNow }) {
  return (
    <section className="bg-violet-50/50 py-16">
      <Container>
        <SectionHeader title="Featured Events" actionLabel="See All Events" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="featured"
              onBookNow={onBookNow}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
