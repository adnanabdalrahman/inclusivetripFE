import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Ratings = () => {
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

  const location = useLocation();
  const { place, category } = location.state || {};
  const [placeRatings, setPlaceRatings] = useState([]);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image); // Setze das ausgewählte Bild
  };

  const closeModal = () => {
    setSelectedImage(null); // Schließe das Modal
  };


  useEffect(() => {
    const fetchPlaceRatings = async () => {
      try {
        const response = await axios.get(`${API_URL}/reviews/place/${place.id}`, {
        });
        setPlaceRatings(response.data);
      } catch (error) {
        console.error("Error fetching Place ratings:", error);
        toast.error("Fehler beim Laden der Bewertungen.");
      }
    };

    fetchPlaceRatings();
  }, []);


  const handleMoreDetails = (rating) => {
    navigate(`/detailreview`, { state: { place: place, category: category, rating: rating } });
  };

  const handleCreateRate = (place) => {
    navigate(`/create`, { state: { place: place, category: category } });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col md:flex-row items-top justify-center p-4">
      <div>
        <div className="container mx-auto bg-[#C1DCDC] rounded-[24px]">
          <div className="flex w-full text-left p-8">
            <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
              {place.name} {category.name}
            </h1>
          </div>

          <div className="flex md:flex-row items-center justify-left ml-8 ">
            <div className="flex flex-col items-center text-center p-4 w-[85px] h-[75px] font-poppins font-medium text-[32px] leading-[48px] text-[#1E1E1E]">
              <div className="text-[32px] leading-[48px]">
                {placeRatings.length}
              </div>
              <div className="text-[18px] leading-[27px] mt-2 ml-8">
                Bewertungen
              </div>
            </div>
          </div>

          <p className="mt-10 ml-8 mr-10 font-medium font-poppins text-[rgba(30,30,30,0.5)] pb-6">
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 p-4 ">
          {placeRatings.map((rating, index) => (
            rating.FileUploads.map((file, index) => (
              <div key={index} className="w-1/5 p-2 ">
                <img key={index} src={file.filePath}
                  alt="Photo" className="w-full h-auto object-cover rounded-lg" onClick={() => openModal(file)} />
              </div>
            ))
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


        <button className="btn bg-[#FFD700] p-2 mt-4 h-12 min-h-2 m-2 justify-end float-right"
          onClick={() => handleCreateRate(place)}>Bewertung hinzufügen</button>

        <h1 className="font-poppins font-bold text-[18px] text-center pt-12 mt-12 text-[#000000]">Bewertungen</h1>

        {placeRatings.map((rating, index) => (
          <div
            key={index}
            className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] mt-8"
          >
            <div className="w-full text-left p-8">
              <div className="flex items-center justify-between">
                <h1 className="font-poppins font-bold text-[18px] text-[#000000]">
                  {rating.User.firstName}
                </h1>
                <h1 className="font-poppins font-bold text-[18px] text-[#000000]">
                  {new Date(rating.createdAt).toLocaleDateString()}
                </h1>
              </div>
              <p className="mt-4 font-poppins font-medium text-[rgba(30,30,30,0.5)] text-left">
                {rating.comment}
              </p>

              <button
                className="btn bg-[#FFD700] border-black w-36 p-2 h-12 min-h-2 m-2 justify-center float-right"
                onClick={() => handleMoreDetails(rating)}
              >Mehr lesen</button>
            </div>
          </div>
        ))}

        <button type="button" className="btn bg-yellow-400 border-black px-8 font-normal" onClick={handleBackClick}>
          Zurück
        </button>
      </div>

    </div>
  );
}

export default Ratings;