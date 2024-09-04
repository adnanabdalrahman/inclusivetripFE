import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchReviewById } from "../utils/reviewHandler";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

export default function ReviewEdit() {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [placeCategoryId, setPlaceCategoryId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getReview = async () => {
      try {
        const review = await fetchReviewById(id);
        setDescription(review.comment);
        setPlaceName(review.placeName);
        setPlaceId(review.placeId);
        setPlaceCategoryId(review.placeCategoryId);
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };
    getReview();
  }, [id]);

  const handleUpdate = async () => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Keine Berechtigung. Bitte einloggen.");
      return;
    }

    try {
      await axios.put(
        `${API_URL}/reviews/${id}`,
        {
          comment: description,
          placeName: placeName,
          placeId: placeId,
          placeCategoryId: placeCategoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Bewertung erfolgreich aktualisiert!");
    } catch (error) {
      toast.error("Fehler beim Aktualisieren der Bewertung.");
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Keine Berechtigung. Bitte einloggen.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      toast.success("Bewertung erfolgreich gelöscht!");
      navigate(-1);
    } catch (error) {
      toast.error("Fehler beim Löschen der Bewertung.");
      console.log(error);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-top p-4">
        <div className="flex flex-col md:flex-row"></div>
        <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className="mt-4 font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                Bewertung bearbeiten <br /> {placeName}
              </h1>
              <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-[32px] leading-[48px]">
                Bearbeite oder lösche deine Bewertung zu dieser Einrichtung.
              </div>
            </div>
            <div className="flex items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
              <img
                src="/images//Icon_Bewertung.png"
                alt="Icon Karte"
                className="max-w-full max-h-[300px] object-cover rounded-lg"
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center justify-center">
          <div className="p-6"></div>
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
        <div className="flex items-center justify-center space-x-4">
          <button
            type="button"
            className="btn bg-yellow-400 border-black px-8 font-normal"
            onClick={handleUpdate}
          >
            Aktualisieren
          </button>
          <button
            type="button"
            className="btn bg-yellow-400 border-black px-8 font-normal"
            onClick={handleDelete}
          >
            Löschen
          </button>
          <button
            type="button"
            className="btn bg-yellow-400 border-black px-8 font-normal"
            onClick={handleBackClick}
          >
            Zurück
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}
