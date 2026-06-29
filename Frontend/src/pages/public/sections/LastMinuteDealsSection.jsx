import Container from '../../../components/common/Container';
import Badge from '../../../components/common/Badge';
import DealCard from '../../../components/event/DealCard';


export default function LastMinuteDealsSection({ deals }) {
  return (
    <section className="bg-gradient-to-br from-violet-950 via-slate-950 to-slate-950 py-14">
      <Container>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Last Minute Deals
          </h2>
          <Badge tone="pink">Limited Seats</Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </Container>
    </section>
  );
}
