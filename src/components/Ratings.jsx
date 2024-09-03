import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';


const Ratings = () => {
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

  const location = useLocation();
  const { place, category } = location.state || {};
  const [placeRatings, setPlaceRatings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceRatings = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(`${API_URL}/reviews/place/${place.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setPlaceRatings(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching Place ratings:", error);
        toast.error("Fehler beim Laden der Bewertungen.");
      }
    };

    fetchPlaceRatings();
  }, []);


  const handleMoreDetails = (rating) => {
    console.log(rating);
  };

  const handleCreateRate = (place) => {
    navigate(`/create`, { state: { place: place, category: category } });
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

            <div className="w-[64px] h-[0px] border border-[#1E1E1E] rotate-90 mx-6 mt-10"></div>

            <div className="flex flex-col items-center text-center p-4 w-[80px] h-[75px] font-poppins font-medium text-[32px] leading-[48px] text-[#1E1E1E]">
              <div className="text-[32px] leading-[48px]">
                5
              </div>
              <div className="text-[18px] leading-[27px] mt-2">
                Sterne
              </div>
            </div>
          </div>

          <p className="mt-10 ml-8 mr-10 font-medium font-poppins text-[rgba(30,30,30,0.5)] pb-6">
            Willkommen im La Bella Vita, einem charmanten italienischen Restaurant im Herzen der Stadt. Das La Bella Vita vereint traditionelles italienisches Flair mit einer modernen Note und bietet seinen Gästen ein unvergessliches kulinarisches Erlebnis. Das Interieur ist warm und einladend, mit rustikalen Holztischen, weichen Beleuchtung und einer gemütlichen Atmosphäre, die an die romantischen Gassen Italiens erinnert.
            Die Speisekarte spiegelt die Vielfalt der italienischen Küche wider, von hausgemachter Pasta und knusprigen Pizzen aus dem Holzofen bis hin zu frischen Meeresfrüchten und saftigen Fleischgerichten. Jede Mahlzeit wird mit den besten, saisonalen Zutaten zubereitet, und die Leidenschaft des Küchenchefs für authentische Aromen ist in jedem Bissen spürbar.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 p-4 ">
          {placeRatings.map((rating, index) => (
            rating.fileUploads.map((file, index) => (
              <div key={index} className="w-1/5 p-2 ">
                <img key={index} src={file.filePath}
                  alt="Photo" className="w-full h-auto object-cover rounded-lg" />
              </div>
            ))
          ))}

        </div>

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
                  {rating.user.firstName}
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
      </div>

    </div>
  );
}

export default Ratings;