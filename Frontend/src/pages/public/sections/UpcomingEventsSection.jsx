import Container from '../../../components/common/Container';
import SectionHeader from '../../../components/common/SectionHeader';
import EventCard from '../../../components/event/EventCard';


export default function UpcomingEventsSection({ events }) {
  return (
    <section className="py-16">
      <Container>
        <SectionHeader title="Upcoming Events" actionLabel="View All" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} variant="compact" />
          ))}
        </div>
      </Container>
    </section>
  );
}
