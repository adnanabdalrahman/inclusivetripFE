import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  async function fetchAllPosts(limit = 100) {
    try {
      const response = await fetch(`http://localhost:5050/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  function filterPosts(e) {
    const filter = e.target.value.toUpperCase();
    const filteredPosts = posts.filter((post) => post.name.toUpperCase().startsWith(filter));
    if (filteredPosts.length === 0) {
      alert("No Post found");
    } else {
      setPosts(filteredPosts);
    }
  }

  function handleDetailsClick(postId) {
    navigate("/Details/${postId}");
  }

  return (
    <div className="top-0 left-24">
      <div className="w-[1248px] h-[512px] mx-auto mt-[123px] bg-[#C1DCDC] rounded-[24px] relative">
        <div className="relative top-[48px] left-[48px] w-[599px] h-[339px] flex flex-col items-start gap-[48px]">
          <div className="w-full h-[227px] flex flex-col items-start gap-[24px]">
            <div className="mt-[-20px] w-full h-[128px] font-poppins font-extrabold text-[55px] leading-[64px] text-[#000000]">
              Barriere Bewertungen
            </div>
            <div className="mt-[-20px] w-full h-[128px] font-poppins font-extrabold text-[55px] leading-[64px] text-[#000000]">
              für Locations
            </div>
            <div className="flex items-center gap-[48px] w-full h-[75px]">
              <div className="flex flex-col items-start w-[121px] h-[75px]">
                <div className="w-[85px] h-[48px] font-poppins font-medium text-[32px] leading-[48px] text-[#1E1E1E]">
                  500+
                </div>
                <div className="w-[121px] h-[27px] font-poppins font-medium text-[18px] leading-[27px] text-[#1E1E1E]">
                  Bewertungen
                </div>
              </div>
              <div className="w-[64px] h-[0px] border border-[#1E1E1E] rotate-90"></div>
              <div className="flex flex-col items-start w-[80px] h-[75px]">
                <div className="w-[76px] h-[48px] font-poppins font-medium text-[32px] leading-[48px] text-[#1E1E1E]">
                  100+
                </div>
                <div className="w-[80px] h-[27px] font-poppins font-medium text-[18px] leading-[27px] text-[#1E1E1E]">
                  Benutzer
                </div>
              </div>
            </div>
          </div>
          <div className="w-[449px] h-[64px] bg-[#FFFFFF] rounded-[12px] flex items-center justify-start relative">
            <div className="absolute left-[18px] top-[18px] font-poppins font-medium text-[18px] leading-[27px] text-[rgba(30, 30, 30, 0.5)]">
              Filter Städte
            </div>
            <div className="absolute left-[393px] top-[8px] w-[48px] h-[48px] bg-[#C1DCDC] rounded-[12px]"></div>
            <div className="absolute left-[407px] top-[22px] w-[20px] h-[20px]">
              {/* <MagnifyingGlassIcon className="w-full h-full text-gray-600" /> */}
            </div>
          </div>
        </div>
        <div className="absolute left-[726px] top-[101px] w-[450px] h-[400px] bg-[#FFD700] rounded-[200px_200px_0px_200px]"></div>
        <div className="absolute w-[112.54px] h-[154.41px] left-[1137.24px] top-[13px] border-5 border-[#FFD700] [transform:matrix(0.95,0.31,-0.34,0.94,0,0)]"></div>

        <div className="absolute w-[298px] h-[294px] left-[841px] top-[200px] bg-[url('../images/Icon_Rollstuhl.png')] bg-cover"></div>
        <div className="absolute left-[841px] top-[200px] w-[298px] h-[294px] bg-cover bg-[url('../images/image.png')]"></div>
        <div className="absolute left-[1137.24px] top-[13px] w-[112.54px] h-[154.41px] border-5 border-[#FFD700] transform matrix-[0.95,0.31,-0.34,0.94,0,0]"></div>
      </div>

      <div className="absolute w-[1440px] h-[12px] left-0 top-[683px] bg-white">


        <div className="absolute w-[1257px] h-[550px] left-[108px] top-0 flex flex-col items-center gap-[48px]">

          <div className="w-[1257px] h-[243px] flex flex-col items-center gap-[12px] ml-[-200px]">
            <p className="w-[1257px] h-[243px] text-[18px] leading-[27px] font-poppins font-medium text-[rgba(30,30,30,0.5)]">
              InclusiveTRIP hilft Ihnen, öffentliche Orte wie Restaurants, Kinos, Geschäfte und vieles mehr hinsichtlich ihrer Barrierefreiheit zu bewerten und passende Locations zu finden. Unsere App ermöglicht es Ihnen, Orte zu entdecken und zu bewerten, um anderen Menschen mit ähnlichen Bedürfnissen zu helfen, barrierefreie Orte zu finden.
              <br />
              <br />
              Egal, ob Sie Rollstuhlfahrer sind, eine Hörbehinderung haben oder mit einem Kinderwagen unterwegs sind – InclusiveTRIP gibt Ihnen die Werkzeuge, um sicherzustellen, dass Ihre Umgebung zugänglich und inklusiv ist. Ihre Bewertungen und Erfahrungen tragen dazu bei, eine Gemeinschaft zu schaffen, die Barrierefreiheit zur Priorität macht. Entdecken, bewerten und teilen Sie barrierefreie Orte mit InclusiveTRIP!
            </p>
          </div>

          <div className="flex flex-row items-center p-0 gap-3 ml-[-200px] h-[92px] ">
            <div className="flex flex-col items-center p-0 gap-3 w-[400px] h-[213px] flex-none order-0 flex-grow-0">
              <img className="w-[66px] h-[66px]" src="../images/Icon_Barrierefilter.png" alt="Logo" />
              <p className="w-[118px] h-[27px] font-poppins font-bold text-[18px] leading-[27px] text-[#000000] flex-none order-1 flex-grow-0">Barrierefilter</p>
              <p className="w-[290px] h-[54px] font-poppins font-medium text-[rgba(30,30,30,0.5)] leading-[27px] text-[rgba(30, 30, 30, 0.5)] text-center flex-none order-1 flex-grow-0">Filter nach deiner Barriere und finde den optimalen Ort für deinen Ausflug.</p>
            </div>

            <div className="flex flex-col items-center p-0 gap-3 w-[400px] h-[213px] flex-none order-0 flex-grow-0">
              <img className="w-[66px] h-[66px]" src="../images/Icon_Umkreissuche.png" alt="Logo" />
              <p className="w-[118px] h-[27px] font-poppins font-bold text-[18px] leading-[27px] text-[#000000] flex-none order-1 flex-grow-0">Umkreissuche</p>
              <p className="w-[290px] h-[54px] font-poppins font-medium text-[rgba(30,30,30,0.5)] leading-[27px] text-[rgba(30, 30, 30, 0.5)] text-center flex-none order-1 flex-grow-0">Egal in welcher Stadt in Deutschland du unterwegs bist, finde Bewertungen.</p>
            </div>

            <div className="flex flex-col items-center p-0 gap-3 w-[400px] h-[213px] flex-none order-0 flex-grow-0">
              <img className="w-[66px] h-[66px]" src="../images/Icon_Locationfilter.png" alt="Logo" />
              <p className="w-[118px] h-[27px] font-poppins font-bold text-[18px] leading-[27px] text-[#000000] flex-none order-1 flex-grow-0">Locationsfilter</p>
              <p className="w-[290px] h-[54px] font-poppins font-medium text-[rgba(30,30,30,0.5)] leading-[27px] text-[rgba(30, 30, 30, 0.5)] text-center flex-none order-1 flex-grow-0">Suche nach der Location, woran du heute Spaß hast.</p>
            </div>

          </div>

          <div className="absolute top-[400px] w-[595px] h-[87px] left-[472px] top-0 flex flex-col items-center gap-12">
            <div className="w-[595px] h-[87px] flex flex-col items-center gap-12">
              <p className="w-[218px] h-[48px] text-[32px] leading-[48px] font-poppins font-bold text-[#1E1E1E]">
                Blog Einträge
              </p>
              <p className="w-[595px] h-[27px] text-[18px] leading-[27px] font-poppins font-medium text-[rgba(30,30,30,0.5)]">
                Informiere dich über aktuelle Themen rund um das Thema Barriere
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
