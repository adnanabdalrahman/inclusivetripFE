import { useState, useEffect } from "react";
import axios from 'axios'; // Importiere axios
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
const REVIEW_ID = 38; // Beispielhafte Review-ID

export default function DetailReview() {
  const [barriers, setBarriers] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
const [placeName, setPlaceName] = useState('');
 const navigate = useNavigate();
 

  const images = [
    "https://media.istockphoto.com/id/1307190527/de/foto/gl%C3%BCcklicher-kellner-serviert-essen-f%C3%BCr-gruppe-von-freunden-in-einer-kneipe.jpg?s=612x612&w=0&k=20&c=ibnkW2wUUsORthgoyJQR7Y3ej4Nix38XVXzAZA_dcms=",
    "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzva470ITGU716RSlhsQpt-7B8S2ZAuO8IAtBmXNm9qdCcWMHYMNxU-Is9TZYuSG7Tvv8&usqp=CAU",
    "https://media.istockphoto.com/id/1404204719/de/foto/unkenntliche-multirassische-weibliche-und-m%C3%A4nnliche-freunde-die-auf-dem-balkon-des-restaurants.jpg?s=612x612&w=0&k=20&c=kxNTFIWHszVWDM9x78KQ2x7SQycpdq_o1EaWmv_60e8=",
    "https://www.tageskarte.io/fileadmin/content/_processed_/5/8/csm_Bild2seo_03469576dd.jpg"
  ];

  const openModal = (image) => {
    setSelectedImage(image); // Setze das ausgewählte Bild
  };

  const closeModal = () => {
    setSelectedImage(null); // Schließe das Modal
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Abrufen der Barrieren-Daten
        const response = await axios.get(`${API_URL}/barriers/selected`);
        if (response.data && response.data.length) {
          setBarriers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [API_URL]);

  // UseEffect zum Abrufen der Beschreibung beim Laden der Komponente
  useEffect(() => {
    const fetchDescriptionById = async () => {
      try {
        const response = await axios.get(`${API_URL}/reviews/reviewid/${REVIEW_ID}`); 
        if (response.data) {
          setDescription(response.data.comment); // Beschreibung aus der API speichern
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDescriptionById();
  }, [API_URL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier kannst du Formular-Daten verarbeiten oder validieren, wenn nötig
    toast.success("Formular erfolgreich eingereicht!");
  };

//   UseEffekt für Laden von Locationnamen
 useEffect(() => {
    const fetchPlaceName = async () => {
      try {
        const response = await axios.get(`${API_URL}/reviews/reviewid/${REVIEW_ID}`); 
        if (response.data) {
          setPlaceName(response.data.placeName); // 
        }
      } catch (error) {
        setError('Fehler beim Abrufen des Ortes');
        console.error('Fehler beim Abrufen des Ortes:', error);
      } finally {
        setLoading(false);
      }
    };
    
     fetchPlaceName();
  }, [API_URL]);

//  Funktion um auf die vorherige Seite zu kommen 
  const handleBackClick = () => {
  navigate(-1);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-top p-4">
        <div className="flex flex-col md:flex-row"></div>
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col w-full md:w-3/3 text-left">
              <h1 className="mt-4 font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                Details Bewertung <br /> {placeName}
              </h1>
              <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-[32px] leading-[48px]">
                Erfahre mehr über die Meinung und Beurteilung<br />
                zu dieser Location bezüglich der Barriere Eignung.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fotogalerie */}
   <div>
      {/* Galerie */}
      <div className="flex flex-wrap justify-center items-center gap-4 p-4">
        {images.map((image, index) => (
          <div key={index} className="w-1/4 p-2 cursor-pointer" onClick={() => openModal(image)}>
            <img
              src={image}
              alt={`Bild ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={closeModal}>
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()} // Verhindert das Schließen des Modals, wenn auf das Bild geklickt wird
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center">
          <div className="p-6">
            <ul className="list-none space-y-4">
              {barriers.map((barrier) => (
                <li key={barrier.id} className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                  <span className="flex-1 text-lg">{barrier.name} geeignet</span>
                  <div className="flex space-x-1 rating ml-auto">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 mask mask-star ${index < barrier.rating ? 'bg-yellow-500' : 'bg-gray-300'}`}
                      ></div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center mb-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg"
            rows="4"
            placeholder="Beschreibung hier eingeben"
          ></textarea>
        </div>
         <button type="button" className="btn bg-yellow-400 border-black px-8 font-normal" onClick={handleBackClick}>
          Zurück
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
