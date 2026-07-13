import { Link } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import { useAuth } from '../../../hooks/useAuth';


export default function CtaSection() {
  const { isLoggedIn, user } = useAuth();

  const listEventTo =
    isLoggedIn && user?.role === 'organizer'
      ? '/organizer-dashboard'
      : '/signup';

  const listEventLabel =
    isLoggedIn && user?.role === 'organizer'
      ? 'Go to Dashboard'
      : 'List Your Event';

  return (
    <section className="bg-white py-20">
      <Container className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Ready to Experience Something Amazing?
        </h2>
        <p className="mt-3 max-w-xl text-slate-500">
          Join over 2 million event-goers who trust Evenzaa. Find your next
          unforgettable moment.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button as={Link} to="/event-listing" size="lg">
            Explore All Events
          </Button>
          <Button as={Link} to={listEventTo} variant="outline" size="lg">
            {listEventLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
