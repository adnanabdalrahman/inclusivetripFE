import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function User() {
  return (
    <div>
      <div className="flex flex-row md:flex-col items-top justify-center p-4">


        <div className=" container mx-auto w-full min-h bg-[#C1DCDC] rounded-[24px] relative">


          <div className="flex flex-col justify-start  p-8 ">
            <h1 className="flex-1 font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black flex-grow">
              Profil Julia Löw
            </h1>



            <div className="flex flex-col md:flex-row items-center justify-start ml-8 mt-[-24]">
              {/* Erste Box */}
              <div className="flex flex-col items-center text-center p-4 font-poppins font-medium text-[32px] text-[#1E1E1E]">
                <div className="text-[32px]">
                  25
                </div>
                <div className="text-[18px] leading-[27px] mt-2 ml-8">
                  Bewertungen
                </div>
              </div>

              {/* Strich */}
              <div className="w-[64px]  border border-[#1E1E1E] rotate-90"></div>

              {/* Zweite Box */}
              <div className="flex flex-col items-center text-center p-4 font-poppins font-medium text-[32px] leading-[48px] text-[#1E1E1E]">
                <div className="text-[32px] leading-[48px]">
                  Mitglied seit
                </div>
                <div className="text-[18px] leading-[27px] mt-2">
                  Datum
                </div>
              </div>
            </div>

            {/* Profilfoto */}
            {/* <div className="flex flex-row justify-end ">
           
    <img className="flex-2 w-48 h-auto" src="../images/profilfoto.jpg" alt="Profilfoto" />
  </div> */}

          </div>
        </div>


        {/* Formular persönliche Daten  */}

        <div className="flex flex-col items-start p-16 gap-12 rounded-t-lg">

          <form>

            <div className="flex flex-row gap-4">
              <div className="flex-1 p-4">
                <div className="flex flex-col items-start gap-2 w-[487px] h-[50px]">
                  <label htmlFor="username" className="w-full h-[22px] text-[20px] font-bold leading-[140%] text-[#1E1E1E]">
                    Persönliche Daten
                  </label>
                </div>

                <div className="flex flex-col items-start gap-2 w-[487px] h-[70px]">
                  <label htmlFor="username" className="w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E]">
                    User Name
                  </label>

                  <input className="flex items-center px-4 py-3 w-[487px] min-w-[240px] h-[40px] bg-white border border-[#D9D9D9] rounded-lg" type="text" value={"MustermannUser"} onChange={(e) => setUserfirstname(e.target.value)} placeholder="User Name" />
                </div>

                <div className="flex flex-col items-start gap-2 w-[487px] h-[70px]">
                  <label htmlFor="firstname" className="mt-6 w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E]">
                    Vorname
                  </label>

                  <input className="flex items-center px-4 py-3 w-[487px] min-w-[240px] h-[40px] bg-white border border-[#D9D9D9] rounded-lg" type="text" value={"Hans-Jörg"} onChange={(e) => setUserfirstname(e.target.value)} placeholder="Vorname" />
                </div>

                <div className="flex flex-col items-start gap-2 w-[487px] h-[70px]">
                  <label htmlFor="lastname" className="mt-12 w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E]">
                    Nachname
                  </label>

                  <input className="flex items-center px-4 py-3 w-[487px] min-w-[240px] h-[40px] bg-white border border-[#D9D9D9] rounded-lg" type="text" value={"Mustermann"} onChange={(e) => setUserlastname(e.target.value)} placeholder="Nachname" />
                </div>

                <div className="flex flex-col items-start gap-2 w-[487px] h-[70px]">
                  <label htmlFor="email" className="mt-16 w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E]">
                    Email
                  </label>

                  <input className="flex items-center px-4 py-3 w-[487px] min-w-[240px] h-[40px] bg-white border border-[#D9D9D9] rounded-lg" type="email" value={"mustermann@muster.de"} onChange={(e) => setUseremail(e.target.value)} placeholder="Email" />
                </div>

                <div className="flex flex-col items-start gap-2 w-[487px] h-[70px]">
                  <label htmlFor="telephone" className="mt-20 w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E]">
                    Telefon
                  </label>

                  <input className="flex items-center px-4 py-3 w-[487px] min-w-[240px] h-[40px] bg-white border border-[#D9D9D9] rounded-lg" type="email" value={"08345/542358"} onChange={(e) => setUseremail(e.target.value)} placeholder="Telefon" />
                </div>




              </div>

              <div className="flex-1 p-0 ml-16  mt-0">
                <div className="mt-6 flex flex-col items-start gap-2 w-[487px] h-[50px]">
                  <label htmlFor="username" className="w-full h-[22px] text-[20px] font-bold leading-[140%] text-[#1E1E1E]">
                    Kategorien
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input type="checkbox" defaultChecked className="checkbox" />
                    <span className="text-[16px] font-normal leading-[140%] text-[#1E1E1E]">Rollstuhlfahrer</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer ">
                    <input type="checkbox" defaultChecked className="checkbox  " />
                    <span className="text-[16px] m  font-normal leading-[140%] text-[#1E1E1E]">Kinderfreundlich</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer ">
                    <input type="checkbox" defaultChecked className="checkbox  " />
                    <span className="text-[16px] font-normal leading-[140%] text-[#1E1E1E]">Blind</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer ">
                    <input type="checkbox" defaultChecked className="checkbox  " />
                    <span className="text-[16px] font-normal leading-[140%] text-[#1E1E1E]">Taubstum</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer ">
                    <input type="checkbox" defaultChecked className="checkbox  " />
                    <span className="text-[16px] font-normal leading-[140%] text-[#1E1E1E]">Mehrsprachig</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="ml-4 mt-32 flex justify-center items-center px-4 py-3 w-[487px] h-[40px] bg-[#FFD700] border border-[#2C2C2C] rounded-lg">
              <button type="submit">bearbeiten</button>
            </div>



          </form>



        </div>

        <div>
          <h1 className="font-poppins font-bold text-[18px] text-center pt-12 mt-12 text-[#000000]">Deine Bewertungen</h1>

          {/* erster Blockeintrag*/}

          <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] mt-8">
            <div className="w-full text-left p-8">
              <div className="flex items-center justify-between">
                <h1 className=" font-poppins font-bold text-[18px] text-[#000000]"> Deine Bewertung vom 08.08.2024</h1>

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

              {/* Button ädern und löschen */}

              <button className="btn bg-[#FFD700]  border-black  w-36 p-2 h-12 min-h-2 m-2 justify-center float-right"
                onClick={() => handleRateClick(place)}>ändern</button>

              <button className="btn bg-[#FFD700] border-black w-36 p-2 h-12 min-h-2 m-2 justify-center float-right"
                onClick={() => handleRateClick(place)}>löschen</button>

            </div>
          </div>
          {/* zweiter Blockeintrag*/}

          <div className=" container mx-auto w-full  bg-[#C1DCDC] rounded-[24px] mt-16 mb-16">
            <div className="w-full text-left p-8">
              <div className="flex items-center justify-between">
                <h1 className=" font-poppins font-bold text-[18px] text-[#000000]"> Deine Bewertung vom 08.06.2024</h1>

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

              {/* Button ädern und löschen */}

              <button className="btn bg-[#FFD700]  border-black  w-36 p-2 h-12 min-h-2 m-2 justify-center float-right"
                onClick={() => handleRateClick(place)}>ändern</button>

              <button className="btn bg-[#FFD700] border-black w-36 p-2 h-12 min-h-2 m-2 justify-center float-right"
                onClick={() => handleRateClick(place)}>löschen</button>



            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default User;