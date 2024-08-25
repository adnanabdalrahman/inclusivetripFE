import React, { useState } from 'react';


function CreateRating() {

  
       const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (e) => {
      e.preventDefault();
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

  return (
    <div>

{/* Überschriftenbox  */}
<div className="flex flex-col md:flex-row items-top p-4">
  <div className="flex flex-col md:flex-row">
    
  </div>
  <div className="container mx-auto w-full  bg-[#C1DCDC] rounded-[24px] relative">
   
 <div className="flex flex-col md:flex-row w-full p-8">
  <div className="flex flex-col w-full md:w-2/3 text-left">
      <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
        Bewertung abgeben
      </h1>
       <div class="mt-4 text-[#1E1E1E] font-poppins font-medium text-[32px] leading-[48px]">
            Bewerte das Restaurant zur Mühle mit deinen Erfahrungen
          </div>
  </div>
    </div>
</div>
     </div> 




      {/* Sternebewertung */}
      <div className="flex flex-col items-center justify-center">
      <div className="w-[454px]">
        <div className="p-6">
          <ul className="list-none space-y-4">
            <li className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
              <span className="flex-1 text-lg">Rollstuhl geeignet</span>
              <div className="star-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
              <span className="flex-1 text-lg">Kinder geeignet</span>
              <div className="star-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
              <span className="flex-1 text-lg">für Blinde geeignet</span>
              <div className="star-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
              <span className="flex-1 text-lg">Taubstum geeignet</span>
              <div className="star-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
              <span className="flex-1 text-lg">Mehrsprachig ausgelegt</span>
              <div className="star-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
             
            </li>
            
          </ul>
         </div>
      </div>

      {/* Textbox Erfahrungsberich */}
      <div className="flex flex-col items-start justify-start w-full ">
        <label htmlFor="username" className="pb-4  font-normal text-[#1E1E1E]">
          Berichte über deine Erfahrungen
        </label>
        <textarea className="flex px-4 py-2 w-full min-w-[240px]  min-h-[160px] bg-white border border-[#D9D9D9] rounded-lg" placeholder="Erfahrungsbericht" />
      </div>

     
<div className="flex flex-col items-start justify-start">
   <button className="mt-8 flex justify-center items-center px-4 py-3 w-[487px] h-[40px] bg-[#FFD700] border border-[#2C2C2C] rounded-lg"
                    onClick={() => handleRateClick(place)}>Fotos hochladen</button>

      {/* Button senden */}
      <div className="mt-8 flex justify-center items-center px-4 py-3 w-[487px] h-[40px] bg-[#FFD700] border border-[#2C2C2C] rounded-lg">
        <button type="submit">Bewertung senden</button>
      </div>

      {/* was soll ich schreiben */}
      <div>
        {/* Link, der das Modal öffnet */}
        <div className="flex flex-col items-start mt-8 gap-2 w-[487px] h-[70px]">
          <a 
            href="#"
            className="w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E] underline"
            onClick={openModal}
          >
            Was soll ich schreiben?
          </a>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
              <button 
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={closeModal}
              >
                &times;
              </button>

              <h2 className="text-xl font-bold mb-4">Anregungen zum Schreiben</h2>
              <p className="mb-4">
                Du weißt nicht, was du schreiben sollst? Kein Problem! Hier sind ein paar Anregungen, worüber du berichten kannst:
                <br /><br />
                <strong>Eingang und Zugang:</strong> Gibt es einen stufenlosen Zugang? Sind Rampen oder ein ebenerdiger Zugang vorhanden? Falls es Treppen gibt, existieren alternative Wege wie Aufzüge oder Treppenlifte?
                <br /><br />
                <strong>Türbreiten:</strong> Sind die Türen breit genug für Rollstühle oder Kinderwagen?
                <br /><br />
                <strong>Sanitäreinrichtungen:</strong> Gibt es speziell gekennzeichnete Rollstuhltoiletten? Sind sie gut zugänglich und mit notwendigen Haltegriffen ausgestattet?
                <br /><br />
                <strong>Parkmöglichkeiten:</strong> Gibt es ausgewiesene Behindertenparkplätze in der Nähe des Eingangs? Sind sie ausreichend breit und gut ausgeschildert?
                <br /><br />
                <strong>Öffentliche Verkehrsmittel:</strong> Ist der Ort gut mit barrierefreien öffentlichen Verkehrsmitteln erreichbar? Gibt es in der Nähe Haltestellen, die für Menschen mit Behinderungen zugänglich sind?
                <br /><br />
                <strong>Service und Unterstützung:</strong> Ist das Personal geschult und bereit, bei Bedarf Hilfe zu leisten?
                <br /><br />
                <strong>Informationen und Beschilderung:</strong> Sind die Schilder gut sichtbar, verständlich und in einer angemessenen Höhe angebracht? Gibt es Informationen in Brailleschrift oder taktile Karten?
                <br /><br />
                <strong>Akustische und visuelle Aspekte:</strong> Ist der Ort gut beleuchtet, um Menschen mit Sehbehinderungen zu unterstützen? Ist der Geräuschpegel für Menschen mit Hörbehinderungen oder kognitiven Beeinträchtigungen akzeptabel?
                <br /><br />
                <strong>Zusätzliche Einrichtungen:</strong> Gibt es Bereiche, in denen Menschen mit sensorischen Überempfindlichkeiten eine Pause einlegen können?
                <br /><br />
                Diese und weitere Aspekte können dir helfen, eine detaillierte und hilfreiche Bewertung zu verfassen.
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
      </div>
    </div>
    </div>
  );
}

export default CreateRating;