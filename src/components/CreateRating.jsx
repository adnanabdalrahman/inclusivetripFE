import React, { useState, useContext, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
import User from "./User.jsx";
function CreateRating() {
  const { userInfo, logout } = useContext(AuthContext);
  const token = Cookies.get("token");
  const barriers = [1, 2, 3, 4, 5];

  const [barriersReviews, setBarriersReviews] = useState([2, 2, 2, 2, 2]);

  const handleRollstuhlChange = (e) => {
    setBarriersReviews([
      Number(e.target.value),
      barriersReviews[1],
      barriersReviews[2],
      barriersReviews[3],
      barriersReviews[4],
    ]);
  };
  const handleKinderChange = (e) => {
    setBarriersReviews([
      barriersReviews[0],
      Number(e.target.value),
      barriersReviews[2],
      barriersReviews[3],
      barriersReviews[4],
    ]);
  };
  const handleBlindChange = (e) => {
    setBarriersReviews([
      barriersReviews[0],
      barriersReviews[1],
      Number(e.target.value),
      barriersReviews[3],
      barriersReviews[4],
    ]);
  };
  const handleTaubChange = (e) => {
    setBarriersReviews([
      barriersReviews[0],
      barriersReviews[1],
      barriersReviews[2],
      Number(e.target.value),
      barriersReviews[4],
    ]);
  };
  const handleSpracheChange = (e) => {
    setBarriersReviews([
      barriersReviews[0],
      barriersReviews[1],
      barriersReviews[2],
      barriersReviews[3],
      Number(e.target.value),
    ]);
  };
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
  const barriersReviewsUrl = `${API_URL}/barriersReviews`;
  const reviewsUrl = `${API_URL}/reviews`;
  const filesUrl = `${API_URL}/file-upload`;
  const [ratingData, setRatingData] = useState({
    gpsCode: "163975141",
    comment: "",
    placeCategoriesId: 1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRatingData({
      ...ratingData,
      [name]: value,
    });
  };
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  
  const onFileChange = (e) => {
    setFiles(e.target.files);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ratingData.comment) {
      alert("Das Erfahrungsbericht-Feld darf nicht leer sein.");
      return;
    }
    let reviewid = 0;
    await axios
      .post(reviewsUrl, ratingData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        reviewid = res.data.id;
      })
      .catch((err) => {
        console.log(err);
      });
    for (let i = 0; i < barriers.length; i++) {
      fetch(barriersReviewsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          barrierId: barriers[i],
          reviewId: reviewid,
          reviews: barriersReviews[i],
        }),
      })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    const formData = new FormData();

    // Append files to FormData
    if (files.length > 5) {
      setMessage("Maximal 5 Dateien können hochgeladen werden");
      return;
    }
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("reviewId", reviewid);
    try {
      const res = await axios.post(filesUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("Ein Fehler ist aufgetreten,bitte versuchen Sie es erneut");
      } else {
        setMessage(err.response.data.msg);
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
            <div className="container mx-auto w-full  bg-[#C1DCDC] rounded-[24px] relative">
              <div className="flex flex-col md:flex-row w-full p-8">
                <div className="flex flex-col w-full md:w-2/3 text-left">
                  <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                    Bewertung abgeben
                  </h1>
                  <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-[32px] leading-[48px]">
                    Bewerte das Restaurant XXXX mit deinen Erfahrungen
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center">
              <div className="p-6">
                <ul className="list-none space-y-4">
                  <li className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                    <span className="flex-1 text-lg">Rollstuhl geeignet</span>
                    <div className="flex space-x-1 rating ml-auto">
                      <input
                        type="radio"
                        name="rollstuhl"
                        id="1"
                        value="1"
                        onChange={handleRollstuhlChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="rollstuhl"
                        id="1"
                        value="2"
                        onChange={handleRollstuhlChange}
                        className="mask mask-star"
                        defaultChecked
                      />
                      <input
                        type="radio"
                        name="rollstuhl"
                        id="1"
                        value="3"
                        onChange={handleRollstuhlChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="rollstuhl"
                        id="1"
                        value="4"
                        onChange={handleRollstuhlChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="rollstuhl"
                        id="1"
                        value="5"
                        onChange={handleRollstuhlChange}
                        className="mask mask-star"
                      />
                    </div>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                    <span className="flex-1 text-lg">Kinder geeignet</span>
                    <div className="flex space-x-1 rating ml-auto">
                      <input
                        type="radio"
                        name="kinder"
                        id="2"
                        value="1"
                        onChange={handleKinderChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="kinder"
                        id="2"
                        value="2"
                        onChange={handleKinderChange}
                        className="mask mask-star"
                        defaultChecked
                      />
                      <input
                        type="radio"
                        name="kinder"
                        id="2"
                        value="3"
                        onChange={handleKinderChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="kinder"
                        id="2"
                        value="4"
                        onChange={handleKinderChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="kinder"
                        id="2"
                        value="5"
                        onChange={handleKinderChange}
                        className="mask mask-star"
                      />
                    </div>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                    <span className="flex-1 text-lg">für Blinde geeignet</span>
                    <div className="flex space-x-1 rating ml-auto">
                      <input
                        type="radio"
                        name="blind"
                        id="3"
                        value="1"
                        onChange={handleBlindChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="blind"
                        id="3"
                        value="2"
                        onChange={handleBlindChange}
                        className="mask mask-star"
                        defaultChecked
                      />
                      <input
                        type="radio"
                        name="blind"
                        id="3"
                        value="3"
                        onChange={handleBlindChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="blind"
                        id="3"
                        value="4"
                        onChange={handleBlindChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="blind"
                        id="3"
                        value="5"
                        onChange={handleBlindChange}
                        className="mask mask-star"
                      />
                    </div>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                    <span className="flex-1 text-lg">Taubstum geeignet</span>
                    <div className="flex space-x-1 rating ml-auto">
                      <input
                        type="radio"
                        name="taub"
                        id="4"
                        value="1"
                        onChange={handleTaubChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="taub"
                        id="4"
                        value="2"
                        onChange={handleTaubChange}
                        className="mask mask-star"
                        defaultChecked
                      />
                      <input
                        type="radio"
                        name="taub"
                        id="4"
                        value="3"
                        onChange={handleTaubChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="taub"
                        id="4"
                        value="4"
                        onChange={handleTaubChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="taub"
                        id="4"
                        value="5"
                        onChange={handleTaubChange}
                        className="mask mask-star"
                      />
                    </div>
                  </li>
                  <li className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                    <span className="flex-1 text-lg">
                      Mehrsprachig ausgelegt
                    </span>
                    <div className="flex space-x-1 rating ml-auto">
                      <input
                        type="radio"
                        name="sprache"
                        id="5"
                        value="1"
                        onChange={handleSpracheChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="sprache"
                        id="5"
                        value="2"
                        onChange={handleSpracheChange}
                        className="mask mask-star"
                        defaultChecked
                      />
                      <input
                        type="radio"
                        name="sprache"
                        id="5"
                        value="3"
                        onChange={handleSpracheChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="sprache"
                        id="5"
                        value="4"
                        onChange={handleSpracheChange}
                        className="mask mask-star"
                      />
                      <input
                        type="radio"
                        name="sprache"
                        id="5"
                        value="5"
                        onChange={handleSpracheChange}
                        className="mask mask-star"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full ">
              <label
                htmlFor="comment"
                className="pb-4  font-normal text-[#1E1E1E]"
              >
                Berichte über deine Erfahrungen
              </label>
              <textarea
                className="flex px-4 py-2 w-full min-w-[240px]  min-h-[160px] bg-white border border-[#D9D9D9] rounded-lg"
                name="comment"
                id="comment"
                value={ratingData.comment}
                onChange={handleInputChange}
                placeholder="Erfahrungsbericht"
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-3xl font-extrabold m-5">
                Fügen Sie Bilder zu Ihrer Bewertung !
              </h3>
              {message && <p className="m-3">{message}</p>}
              <input
                type="file"
                className="file-input file-input-bordered file-input-warning w-full max-w-xs bg-[#FFD700] m-3"
                onChange={onFileChange}
                multiple
                accept="image/*"
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="mt-8 flex justify-center items-center px-4 py-3 w-[487px] h-[40px] bg-[#FFD700] border border-[#2C2C2C] rounded-lg">
                <button type="submit">Bewertung senden</button>
              </div>
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
                      <br />
                      <br />
                      <strong>Eingang und Zugang:</strong> Gibt es einen
                      stufenlosen Zugang? Sind Rampen oder ein ebenerdiger
                      Zugang vorhanden? Falls es Treppen gibt, existieren
                      alternative Wege wie Aufzüge oder Treppenlifte?
                      <br />
                      <br />
                      <strong>Türbreiten:</strong> Sind die Türen breit genug
                      für Rollstühle oder Kinderwagen?
                      <br />
                      <br />
                      <strong>Sanitäreinrichtungen:</strong> Gibt es speziell
                      gekennzeichnete Rollstuhltoiletten? Sind sie gut
                      zugänglich und mit notwendigen Haltegriffen ausgestattet?
                      <br />
                      <br />
                      <strong>Parkmöglichkeiten:</strong> Gibt es ausgewiesene
                      Behindertenparkplätze in der Nähe des Eingangs? Sind sie
                      ausreichend breit und gut ausgeschildert?
                      <br />
                      <br />
                      <strong>Öffentliche Verkehrsmittel:</strong> Ist der Ort
                      gut mit barrierefreien öffentlichen Verkehrsmitteln
                      erreichbar? Gibt es in der Nähe Haltestellen, die für
                      Menschen mit Behinderungen zugänglich sind?
                      <br />
                      <br />
                      <strong>Service und Unterstützung:</strong> Ist das
                      Personal geschult und bereit, bei Bedarf Hilfe zu leisten?
                      <br />
                      <br />
                      <strong>Informationen und Beschilderung:</strong> Sind die
                      Schilder gut sichtbar, verständlich und in einer
                      angemessenen Höhe angebracht? Gibt es Informationen in
                      Brailleschrift oder taktile Karten?
                      <br />
                      <br />
                      <strong>Akustische und visuelle Aspekte:</strong> Ist der
                      Ort gut beleuchtet, um Menschen mit Sehbehinderungen zu
                      unterstützen? Ist der Geräuschpegel für Menschen mit
                      Hörbehinderungen oder kognitiven Beeinträchtigungen
                      akzeptabel?
                      <br />
                      <br />
                      <strong>Zusätzliche Einrichtungen:</strong> Gibt es
                      Bereiche, in denen Menschen mit sensorischen
                      Überempfindlichkeiten eine Pause einlegen können?
                      <br />
                      <br />
                      Diese und weitere Aspekte können dir helfen, eine
                      detaillierte und hilfreiche Bewertung zu verfassen.
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
