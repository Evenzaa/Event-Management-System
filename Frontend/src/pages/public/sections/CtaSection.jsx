import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';


export default function CtaSection() {
  return (
    <section className="bg-white py-20">
      <Container className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Ready to Experience Something Amazing?
        </h2>
        <p className="mt-3 max-w-xl text-slate-500">
          Join over 2 million event-goers who trust EventPass. Find your next
          unforgettable moment.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button as="a" href="/explore" size="lg">
            Explore All Events
          </Button>
          <Button as="a" href="/organizer/create" variant="outline" size="lg">
            List Your Event
          </Button>
        </div>
      </Container>
    </section>
  );
}
