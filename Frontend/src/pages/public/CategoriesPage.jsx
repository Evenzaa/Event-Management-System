import { useNavigate } from 'react-router-dom';
import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';
import Container from '../../components/common/Container';

const CATEGORIES = [
  { id: 'music',      label: 'Music & Concerts',   icon: '🎵', color: 'from-violet-500 to-purple-600',   count: '2,400+ events' },
  { id: 'technology', label: 'Tech & Conferences',  icon: '💻', color: 'from-blue-500 to-cyan-500',       count: '890+ events'  },
  { id: 'sports',     label: 'Sports & Fitness',    icon: '🏆', color: 'from-amber-500 to-orange-500',    count: '1,100+ events' },
  { id: 'art',        label: 'Arts & Culture',      icon: '🎨', color: 'from-pink-500 to-rose-500',       count: '670+ events'  },
  { id: 'food',       label: 'Food & Drink',        icon: '🍽️', color: 'from-emerald-500 to-teal-500',   count: '540+ events'  },
  { id: 'education',  label: 'Education',           icon: '📚', color: 'from-indigo-500 to-blue-600',     count: '320+ events'  },
  { id: 'business',   label: 'Business & Networking', icon: '💼', color: 'from-slate-600 to-slate-800', count: '480+ events'  },
  { id: 'wellness',   label: 'Health & Wellness',   icon: '🧘', color: 'from-green-500 to-emerald-600',  count: '290+ events'  },
];

export default function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-white border-b border-slate-100 py-14">
        <Container className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900">Browse by Category</h1>
          <p className="mt-3 text-lg text-slate-500 max-w-xl mx-auto">
            Find events that match your interests — from live concerts to coding bootcamps.
          </p>
        </Container>
      </section>

      {/* Grid */}
      <section className="py-14">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => navigate(`/event-listing?category=${cat.id}`)}
                className="group relative overflow-hidden rounded-2xl p-6 text-left transition-transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90`} />

                {/* Content */}
                <div className="relative z-10">
                  <span className="text-4xl">{cat.icon}</span>
                  <h3 className="mt-4 text-lg font-bold text-white">{cat.label}</h3>
                  <p className="mt-1 text-sm text-white/70">{cat.count}</p>
                </div>

                {/* Hover arrow */}
                <div className="absolute bottom-4 right-4 translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                  <span className="text-white/80 text-xl">→</span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
