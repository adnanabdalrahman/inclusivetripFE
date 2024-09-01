import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReviewsCount() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        // API-Anfrage zum Abrufen aller Reviews
        const response = await axios.get('http://localhost:3000/reviews'); // 
        setReviews(response.data); // Setze alle Reviews in den State
      } catch (error) {
        console.error('Fehler beim Abrufen der Bewertungen:', error);
      } finally {
        setLoading(false);

      }
    }

    fetchReviews();
  }, []);

  const reviewsCount = reviews.length;
  return (
    <div>
      {loading ? (
        'Laden...'
      ) : (
        <div>

          <p>{reviewsCount}</p>
        </div>
      )}
    </div>
  );
}