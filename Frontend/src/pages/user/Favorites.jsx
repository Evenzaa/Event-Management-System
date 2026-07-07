import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../../services/api";
import FavoriteCards from '../../components/event/FavoriteCards';
import "./style/Favorites.css"

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
    }
  useEffect(() => {
    loadFavorites();
    
  }, []);
  return (
    <div className="page-container">
      <div className="header-section">
        <h2>My Favorites</h2>
        <span className="small-text">{favorites.length} saved events</span>
      </div>
      <div className="events-grid">
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
  );
}
