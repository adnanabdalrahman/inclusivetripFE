import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import RssFeed from "./rssfeed";
import axios from 'axios';
import Countratings from "./Countratings";
import Countusers from "./Countusers";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
  const reviewsCountUrl = `${API_URL}/reviews/count`;
  const usersCountUrl = `${API_URL}/users/count`;
  const [reviewsData, setReviewsData] = useState(0);
  const [usersData, setUsersData] = useState(0);
  useEffect(() => async () => {
    try {
      const response = await fetch(reviewsCountUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setReviewsData(data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }, []);

  useEffect(() => async () => {
    try {
      const response = await fetch(usersCountUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUsersData(data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }, []);
  // useEffect(() => {
  //   fetchAllPosts();
  // }, []);

  // async function fetchAllPosts(limit = 100) {
  //   try {
  //     const response = await fetch(`http://localhost:5050/posts`);
  //     const data = await response.json();
  //     setPosts(data);
  //   } catch (error) {
  //     console.error(`Error: ${error}`);
  //   }
  // }

  // function filterPosts(e) {
  //   const filter = e.target.value.toUpperCase();
  //   const filteredPosts = posts.filter((post) => post.name.toUpperCase().startsWith(filter));
  //   if (filteredPosts.length === 0) {
  //     alert("No Post found");
  //   } else {
  //     setPosts(filteredPosts);
  //   }
  // }

  // function handleDetailsClick(postId) {
  //   navigate("/Details/${postId}");
  // }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-top justify-center p-4">
        <div className="pb-1 container mx-auto w-full bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col md:flex-row w-full p-8">
            {/* Text Container */}
            <div className="flex flex-col w-full md:w-2/3 text-left">
              <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                Barriere Bewertungen <br />
                für Standorte in Deutschland
              </h1>

              <div className="flex flex-col md:flex-row items-center justify-left ml-8 mt-4">
                {/* Erste Box */}
                <div className="flex flex-col items-center text-center p-4 w-[85px] h-[75px] font-poppins font-medium text-[32px] leading-[48px] text-[#1E1E1E]">
                  <div className="text-[32px] leading-[48px]">
                    <Countratings />
                    {/* {reviewsData}+ */}
                  </div>
                  <div className="text-[18px] leading-[27px] mt-2 ml-8">
                    Bewertungen
                  </div>
                </div>

                {/* Strich */}
                <div className="w-[64px] h-[0px] border border-[#1E1E1E] rotate-90 mx-6 mt-10"></div>

                {/* Zweite Box */}
                <div className="flex flex-col items-center text-center p-4 w-[80px] h-[75px] font-poppins font-medium text-[32px] leading-[48px] text-[#1E1E1E]">
                  <div className="text-[32px] leading-[48px]">
                    <Countusers />
                    {/* {usersData}+ */}
                  </div>
                  <div className="text-[18px] leading-[27px] mt-2">
                    Benutzer
                  </div>
                </div>
              </div>

              {/* Filter Städte */}
              <div className="ml-8 mt-16 mb-16 w-[449px] h-[64px] bg-[#FFFFFF] rounded-[12px] flex items-center justify-start relative">
                <div className="ml-4 left-[18px] top-[18px] font-poppins font-medium text-[18px] leading-[27px] text-[rgba(30, 30, 30, 0.5)]">
                  Filter Städte
                </div>

                <div className="ml-60 relative flex justify-center items-center p-4">
                  {/* Kasten */}
                  <div className="w-[48px] h-[48px] bg-[#C1DCDC] rounded-[12px] flex items-center justify-center"></div>
                  {/* Lupe */}
                  <div className="flex items-center justify-center">
                    <MagnifyingGlassIcon className="w-1/2 h-1/2 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bild Container */}
            <div className="flex items-center justify-center w-full md:w-1/3 mt-4 md:mt-0">
              <img
                src="images/Icon_Rollstuhl.png"
                alt="Icon Karte"
                className="object-cover rounded-lg"
                style={{ width: '300px', height: '300px' }} // Bildgröße anpassen
              />
            </div>
          </div>
        </div>
      </div>


      {/* Beschreibungstext */}
      <p className="mt-8 p-4  font-medium font-poppins text-[rgba(30,30,30,0.5)]">
        InclusiveTRIP hilft Ihnen, öffentliche Orte wie Restaurants, Kinos, Geschäfte und vieles mehr hinsichtlich ihrer Barrierefreiheit zu bewerten und passende Locations zu finden. Unsere App ermöglicht es Ihnen, Orte zu entdecken und zu bewerten, um anderen Menschen mit ähnlichen Bedürfnissen zu helfen, barrierefreie Orte zu finden.
        <br />
        <br />
        Egal, ob Sie Rollstuhlfahrer sind, eine Hörbehinderung haben oder mit einem Kinderwagen unterwegs sind – InclusiveTRIP gibt Ihnen die Werkzeuge, um sicherzustellen, dass Ihre Umgebung zugänglich und inklusiv ist. Ihre Bewertungen und Erfahrungen tragen dazu bei, eine Gemeinschaft zu schaffen, die Barrierefreiheit zur Priorität macht. Entdecken, bewerten und teilen Sie barrierefreie Orte mit InclusiveTRIP!
      </p>


      {/* Icons */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-8 p-4 gap-6">
        {/* Erste Icon Box */}
        <div className="flex flex-col items-center p-4 gap-3 w-full md:w-[400px] h-auto bg-white rounded-lg shadow-md">
          <img className="w-[66px] h-[66px]" src="/images//Icon_Barrierefilter.png" alt="Barrierefilter" />
          <p className="font-poppins font-bold text-[18px] text-[#000000]">Barrierefilter</p>
          <p className="font-poppins font-medium text-[rgba(30,30,30,0.5)] text-center">
            Filter nach deiner Barriere und finde den optimalen Ort für deinen Ausflug.
          </p>
        </div>

        {/* Zweite Icon Box */}
        <div className="flex flex-col items-center p-4 gap-3 w-full md:w-[400px] h-auto bg-white rounded-lg shadow-md">
          <img className="w-[66px] h-[66px]" src="/images//Icon_Umkreissuche.png" alt="Umkreissuche" />
          <p className="font-poppins font-bold text-[18px] text-[#000000]">Umkreissuche</p>
          <p className="font-poppins font-medium text-[rgba(30,30,30,0.5)] text-center">
            Egal in welcher Stadt in Deutschland du unterwegs bist, finde Bewertungen.
          </p>
        </div>

        {/* Dritte Icon Box */}
        <div className="flex flex-col items-center p-4 gap-3 w-full md:w-[400px] h-auto bg-white rounded-lg shadow-md">
          <img className="w-[66px] h-[66px]" src="/images//Icon_Locationfilter.png" alt="Locationfilter" />
          <p className="font-poppins font-bold text-[18px] text-[#000000]">Locationsfilter</p>
          <p className="font-poppins font-medium text-[rgba(30,30,30,0.5)] text-center">
            Suche nach der Location, woran du heute Spaß hast.
          </p>
        </div>
      </div>

      {/* Überschrift Blockeinträge */}

      <h1 className="font-poppins font-bold text-[18px] text-center pt-12 text-[#000000]">Blog Einträge</h1>
      <p className="font-poppins font-medium text-[rgba(30,30,30,0.5)] text-center pt-2"> Informiere dich über aktuelle Themen rund um das Thema Barriere.</p>

      {/* erster Blockeintrag*/}

      <div className="container mx-auto w-full mt-8">
        <div className="bg-[#C1DCDC] rounded-[24px] p-4">
          <div className="w-full text-left p-8 bg-white rounded-[24px]">
            <RssFeed />
          </div>
        </div>
      </div>
    </div>



  );
}

export default Home;
