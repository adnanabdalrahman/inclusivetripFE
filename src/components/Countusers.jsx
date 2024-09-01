import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Countusers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        // API-Anfrage zum Abrufen aller Users
        const response = await axios.get('http://localhost:3000/users'); // URL anpassen, falls erforderlich

        // Überprüfen, ob die Antwort ein Array ist
        if (Array.isArray(response.data)) {
          setUsers(response.data); // Setze alle Users in den State
        } else {
          console.error('Unerwartetes Datenformat:', response.data);
          setError('Fehlerhaftes Datenformat von der API');
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der User-Daten:', error);
        setError('Fehler beim Abrufen der User-Daten');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // Anzahl der User ermitteln
  const usersCount = users.length;

  return (
    <div>
      {loading ? (
        'Laden...'
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div>
          <p>{usersCount}</p>
        </div>
      )}
    </div>
  );
}
