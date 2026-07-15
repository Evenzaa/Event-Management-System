import { Link } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";

const STEPS = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Sign up as an organizer in under 2 minutes. No setup fees, no hidden costs.",
  },
  {
    number: "02",
    title: "List your event",
    description:
      "Add your event details, set ticket prices, upload photos, and go live instantly.",
  },
  {
    number: "03",
    title: "Sell tickets",
    description:
      "Reach thousands of event-goers on Evenzaa. We handle payments and bookings.",
  },
  {
    number: "04",
    title: "Get paid",
    description:
      "Receive payouts directly to your account after your event. Simple and transparent.",
  },
];

const PERKS = [
  {
    icon: "📊",
    title: "Real-time analytics",
    desc: "Track ticket sales, revenue, and attendee data live from your dashboard.",
  },
  {
    icon: "🎟️",
    title: "Flexible ticketing",
    desc: "Set multiple ticket tiers, early bird pricing, and capacity limits.",
  },
  {
    icon: "💬",
    title: "Attendee management",
    desc: "Message attendees, manage check-ins, and handle refunds with ease.",
  },
  {
    icon: "🌍",
    title: "Wide reach",
    desc: "Your events are discoverable by 2M+ users across all categories.",
  },
  {
    icon: "🔒",
    title: "Secure payments",
    desc: "All transactions are encrypted and processed safely.",
  },
  {
    icon: "⚡",
    title: "Go live in minutes",
    desc: "No approval delays. Publish your event and start selling immediately.",
  },
];

export default function ForOrganizersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-blue-600 py-24">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop')",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 to-blue-600/90" />

        <Container className="relative z-10 text-center">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white mb-6">
            For Event Organizers
          </span>
          <h1 className="text-5xl font-extrabold text-white leading-tight max-w-2xl mx-auto">
            Host your next event on Evenzaa
          </h1>
          <p className="mt-5 text-xl text-white/80 max-w-xl mx-auto">
            Join thousands of organizers who trust Evenzaa to sell tickets,
            manage attendees, and grow their events.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              as={Link}
              to="/signup"
              variant="outline"
              size="lg"
              className="bg-white !text-violet-700 hover:bg-white/90"
            >
              Start for Free
            </Button>
            <Link
              to="/login"
              className="text-sm font-semibold text-white/80 hover:text-white underline underline-offset-4"
            >
              Already have an account? Log in
            </Link>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
            <p className="mt-3 text-slate-500">
              From idea to sold-out event in four simple steps.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute top-6 left-full w-8 hidden lg:block border-t-2 border-dashed border-violet-500 -translate-x-4" />
                )}
                <div className="text-3xl font-extrabold text-violet-400">
                  {step.number}
                </div>
                <h3 className="mt-2 text-base font-bold text-slate-800">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Perks */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900">
              Everything you need
            </h2>
            <p className="mt-3 text-slate-500">
              Powerful tools built for serious event organizers.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PERKS.map((perk) => (
              <div
                key={perk.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{perk.icon}</span>
                <h3 className="mt-4 font-bold text-slate-800">{perk.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <Container className="text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to host your first event?
          </h2>
          <p className="mt-3 text-slate-400 max-w-md mx-auto">
            It's free to get started. No contracts, no monthly fees.
          </p>
          <Button as={Link} to="/signup" size="lg" className="mt-8">
            Create Organizer Account
          </Button>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
