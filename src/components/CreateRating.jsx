import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { createReview, createBarrierReviews } from "../utils/reviewHandler";

function CreateRating() {
  const location = useLocation();
  const { place, category } = location.state || {};
  const [stars] = useState([1, 2, 3, 4, 5]);

  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

  const filesUrl = `${API_URL}/file-upload`;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [barriers, setBarriers] = useState([]);
  const [barriersReviews, setBarriersReviews] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/barriers/selected`);
        if (response.data && response.data.length) {
          setBarriers(response.data);
          setBarriersReviews(response.data.map(barrier => ({
            barrierName: barrier.name,
            barrierId: barrier.id,
            rating: 2
          })));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [API_URL]);

  const handleBarrierReviewChange = (e) => {
    const rating = Number(e.target.value);
    const barrierId = Number(e.target.id);
    console.log('barriersReviewsOld', barriersReviews);
    setBarriersReviews(prev => prev.map(item =>
      item.barrierId === barrierId ?
        { ...item, rating: rating } : item
    ));
  };

  const handleCommentChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) {
      setMessage("Das Erfahrungsbericht-Feld darf nicht leer sein.");
      return;
    }

    if (files.length > 5) {
      setMessage("Maximal 5 Dateien können hochgeladen werden");
      return;
    }


    const ratingData = {
      placeName: place.name,
      placeId: place.id,
      comment: comment,
      placeCategoryId: category.id,
    }

    const reviewId = await createReview(ratingData).then((reviewId) => reviewId);
    if (!reviewId) {
      console.error("Error creating review");
      return;
    }
    console.log('reviewId', reviewId);
    await createBarrierReviews(barriersReviews, reviewId);


    if (files.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      formData.append("reviewId", reviewId);
      try {
        const res = await axios.post(filesUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // navigate("/user");
      } catch (err) {
        setMessage("Fehler beim Hochladen der Dateien , bitte versuchen Sie es erneut");
        console.log(err);
      }
    }

  };
  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-top p-4">
        <div className="flex flex-col md:flex-row"></div>
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                Bewertung schreiben
              </h1>
              <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-[32px] leading-[48px]">
                Bewerte das {category.name} <b>{place.name}</b> mit deinen Erfahrungen
              </div>
            </div>
          </div>
        </div>
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
                    {stars.map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name={`barrier-${barrier.id}`}
                        id={barrier.id}
                        value={star}
                        onChange={handleBarrierReviewChange}
                        className="mask mask-star"
                        defaultChecked={star === 2}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start w-full">
          <label
            htmlFor="comment"
            className="pb-4 font-normal text-[#1E1E1E]"
          >
            Berichte über deine Erfahrungen
          </label>
          <textarea
            required
            className="flex px-4 py-2 w-full min-w-[240px] min-h-[160px] bg-white border border-[#D9D9D9] rounded-lg"
            name="comment"
            id="comment"
            onChange={handleCommentChange}
            placeholder="Erfahrungsbericht"
          />
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-extrabold m-5">
            Fügen Sie Bilder zu Ihrer Bewertung hinzu!
          </h3>
          {message && <p className="m-3">{message}</p>}
          <input
            type="file"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs bg-[#FFD700] m-3"
            onChange={handleFileChange}
            multiple
            accept="image/*"
          />
        </div>

        <div className="flex flex-col items-center">
          <button
            className="mt-8 flex justify-center items-center px-4 py-3 w-[487px] h-[40px] bg-[#FFD700] border border-[#2C2C2C] rounded-lg"
            type="submit">Bewertung senden</button>
        </div>

        <div>
          <div className="flex flex-col items-start mt-8 gap-2 w-[487px] h-[70px]">
            <a
              href="#"
              className="w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E] underline"
              onClick={openModal}
            >
              Was soll ich schreiben?
            </a>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                  onClick={closeModal}
                >
                  &times;
                </button>

                <h2 className="text-xl font-bold mb-4">
                  Anregungen zum Schreiben
                </h2>
                <p className="mb-4">
                  Du weißt nicht, was du schreiben sollst? Kein Problem!
                  Hier sind ein paar Anregungen, worüber du berichten
                  kannst:
                  {/* Add suggestions here */}
                </p>
                <button
                  className="px-4 py-2 bg-[#FFD700] border border-[#2C2C2C] rounded-lg"
                  onClick={closeModal}
                >
                  Schließen
                </button>
              </div>
            </div>
          )}
        </div>

      </form>
    </div>
  );
}

export default CreateRating;
