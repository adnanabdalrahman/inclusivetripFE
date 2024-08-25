import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';


function Ratings() {
  return (
 
<div className="flex flex-col md:flex-row items-top justify-center p-4">

   <div>
  <div className="container mx-auto bg-[#C1DCDC] rounded-[24px]">
 
 <div className="flex w-full text-left p-8">
      <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
        Restaurant Bella Vita
      </h1>

{/* Sternebewertung Restaurant allgemein */}
 <div className="flex space-x-1 rating ml-auto">
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" defaultChecked />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
          </div>

    </div>

<div className="flex md:flex-row items-center justify-left ml-8 ">
  {/* Erste Box */}
  <div className="flex flex-col items-center text-center p-4 w-[85px] h-[75px] font-poppins font-medium text-[32px] leading-[48px] text-[#1E1E1E]">
    <div className="text-[32px] leading-[48px]">
      25
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
      5 
    </div>
    <div className="text-[18px] leading-[27px] mt-2">
      Sterne
    </div>
  </div>
</div>


{/* Beschreibungstext */}
            <p className="mt-10 ml-8 mr-10 font-medium font-poppins text-[rgba(30,30,30,0.5)] pb-6">
              Willkommen im La Bella Vita, einem charmanten italienischen Restaurant im Herzen der Stadt. Das La Bella Vita vereint traditionelles italienisches Flair mit einer modernen Note und bietet seinen Gästen ein unvergessliches kulinarisches Erlebnis. Das Interieur ist warm und einladend, mit rustikalen Holztischen, weichen Beleuchtung und einer gemütlichen Atmosphäre, die an die romantischen Gassen Italiens erinnert.

Die Speisekarte spiegelt die Vielfalt der italienischen Küche wider, von hausgemachter Pasta und knusprigen Pizzen aus dem Holzofen bis hin zu frischen Meeresfrüchten und saftigen Fleischgerichten. Jede Mahlzeit wird mit den besten, saisonalen Zutaten zubereitet, und die Leidenschaft des Küchenchefs für authentische Aromen ist in jedem Bissen spürbar.
            </p>
        </div>  

    {/* Fotogalerie  */}
        <div className="flex flex-wrap justify-center items-center gap-4 p-4 ">
          <div className="w-1/5 p-2 ">
            <img src="https://media.istockphoto.com/id/1307190527/de/foto/gl%C3%BCcklicher-kellner-serviert-essen-f%C3%BCr-gruppe-von-freunden-in-einer-kneipe.jpg?s=612x612&w=0&k=20&c=ibnkW2wUUsORthgoyJQR7Y3ej4Nix38XVXzAZA_dcms=" alt="Bild 1" className="w-full h-auto object-cover rounded-lg" />
          </div>
          <div className="w-1/5 p-2">
            <img src="https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg" alt="Bild 2" className="w-full h-auto object-cover rounded-lg" />
          </div>
          <div className="w-1/5 p-2">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzva470ITGU716RSlhsQpt-7B8S2ZAuO8IAtBmXNm9qdCcWMHYMNxU-Is9TZYuSG7Tvv8&usqp=CAU" alt="Bild 4" className="w-full h-auto object-cover rounded-lg" />
          </div>
          <div className="w-1/5 p-2">
            <img src="https://media.istockphoto.com/id/1404204719/de/foto/unkenntliche-multirassische-weibliche-und-m%C3%A4nnliche-freunde-die-auf-dem-balkon-des-restaurants.jpg?s=612x612&w=0&k=20&c=kxNTFIWHszVWDM9x78KQ2x7SQycpdq_o1EaWmv_60e8=" alt="Bild 4" className="w-full h-auto object-cover rounded-lg" />
          </div>
        </div>


    {/* Sternebewertung */}

        <div class="flex items-center justify-center">
          <div class="p-6">
            <ul class="list-none space-y-4">
              <li class="flex items-center space-x-4">

                <div class="w-4 h-4 bg-[#FFD700] rounded-full"></div>

                <span class="flex-1 text-lg">Rollstuhl geeignet</span>

                <div class="star-rating">
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                </div>
              </li>
              <li class="flex items-center space-x-4">
                <div class="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                <span class="flex-1 text-lg">Kinder geeignet</span>
                <div class="star-rating">
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                </div>
              </li>
              <li class="flex items-center space-x-4">
                <div class="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                <span class="flex-1 text-lg">für Blinde geeignet</span>
                <div class="star-rating">
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                </div>
              </li>
              <li class="flex items-center space-x-4">
                <div class="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                <span class="flex-1 text-lg">Taubstum geeignet</span>
                <div class="star-rating">
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                </div>
              </li>
              <li class="flex items-center space-x-4">
                <div class="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                <span class="flex-1 text-lg">Mehrsprachig ausgelegt</span>
                <div class="star-rating">
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                </div>
              </li>
            </ul>

</div>
</div>


{/* Button Bewertung hinzufügen */}

<button className="btn bg-[#FFD700] p-2 mt-4 h-12 min-h-2 m-2 justify-end float-right"
                    onClick={() => handleRateClick(place)}>Bewertung hinzufügen</button>

{/* Überschrift Blockeinträge */}

<h1 className="font-poppins font-bold text-[18px] text-center pt-12 mt-12 text-[#000000]">Bewertungen</h1>


{/* erster Blockeintrag*/}

  <div className="container mx-auto w-full  bg-[#C1DCDC] rounded-[24px] relative mt-8">
    <div className="w-full text-left p-8">
        <div className="flex items-center justify-between">
        <h1 className=" font-poppins font-bold text-[18px] text-[#000000]"> MaxMustermann schrieb</h1>
      
    <div className="space-x-1 rating">
            <input type="radio" name="rating-1" className="mask mask-star bg-[#FFD700]" />
            <input type="radio" name="rating-1" className="mask mask-star bg-[#FFD700]" defaultChecked />
            <input type="radio" name="rating-1" className="mask mask-star bg-[#FFD700]" />
            <input type="radio" name="rating-1" className="mask mask-star bg-[#FFD700]" />
            <input type="radio" name="rating-1" className="mask mask-star bg-[#FFD700]" />
          </div>
    </div>
     <p className="mt-4 font-poppins font-medium text-[rgba(30,30,30,0.5)] text-left">
       Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos 
    </p>
</div>
</div>

{/* zweiter Blockeintrag*/}

  <div className="container mx-auto w-full  bg-[#C1DCDC] rounded-[24px] relative mt-8">
    <div className="w-full text-left p-8">
        <div className="flex items-center justify-between">
        <h1 className=" font-poppins font-bold text-[18px] text-[#000000]"> MaxMustermann schrieb</h1>
      
    <div className="space-x-1 rating">
            <input type="radio" name="rating-1" className="mask mask-star bg-[#FFD700]" />
            <input type="radio" name="rating-1" className="mask mask-star bg-[#FFD700]" defaultChecked />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
          </div>
    </div>
     <p className="mt-4 font-poppins font-medium text-[rgba(30,30,30,0.5)] text-left">
       Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos 
    </p>
</div>
</div>



</div>
</div>


      );
}

export default Ratings;