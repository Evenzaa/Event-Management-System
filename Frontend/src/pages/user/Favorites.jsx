import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../../services/api";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import FavoriteCards from "../../components/event/FavoriteCards";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFavorite = async (eventId) => {
    try {
      await removeFavorite(eventId);
      loadFavorites();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-10">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-5xl font-bold">My Favorites</h2>

            <span className="text-sm text-gray-500">
              {favorites.length} saved events
            </span>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {favorites.map((favorite) => {
              const event = favorite.eventId;

              return (
                <FavoriteCards
                  key={favorite._id}
                  eventId={event._id}
                  title={event.title}
                  date={new Date(event.date).toLocaleDateString()}
                  location={event.location}
                  price={`$${event.price}`}
                  image={event.images?.[0]}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}