import React, { useState } from "react";
import { BagIcon, landImg, landsImg } from "../assets";

const StartMenu = () => {
  const [start, setStart] = useState(true);
  return start ? (
    <div className="card-box absolute z-10 make-flex w-screen h-screen">
      <div className="menu-container card-container flex flex-col gap-7 p-12">
        <h1 className="text-center text-[1.7rem]">Start Game</h1>
        <div className="flex gap-10">
          <div className="font-vt w-[300px] text-[1.2rem] leading-6  text-justify make-flex">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div className="w-[300px] h-[300px] bg-slate-500 rounded-xl"></div>
        </div>
        <button
          className="btn w-[200px] mx-auto hover:scale-[102%]"
          onClick={() => setStart(false)}
        >
          Start
        </button>
      </div>
    </div>
  ) : (
    <div className="card-box absolute z-10 make-flex w-screen h-screen">
      <div className="menu-container card-container ">
        {/* <div className="text-right ">
          <span className="absolute -translate-x-7 hover:scale-105 hover:text-neutral-600 translate-y-2 cursor-pointer">
            x
          </span>
        </div> */}
        <div className="flex gap-7 p-12">
          {/* <span className="relative">X</span> */}
          <div className="w-[300px] rounded-2xl flex flex-col gap-5  justify-end p-7 items-center shadow-xl border-2 border-[#323232] hover:scale-[101%] cursor-pointer">
            <div className="w-[260px]  h-[230px] make-flex border-2 border-[#8b8b8b] rounded-xl">
              <img src={landImg} alt="landImg" className="h-[90%] w-auto" />
            </div>
            <h3 className="text-[1.3rem]">MainLand</h3>
          </div>
          <div className="w-[300px] rounded-2xl flex flex-col gap-5  justify-end p-7 items-center shadow-xl border-2 border-[#323232] hover:scale-[101%] cursor-pointer">
            <div className="w-[260px]  h-[230px] make-flex border-2 border-[#8b8b8b] rounded-xl">
              <img src={landsImg} alt="landImg" className="h-auto w-[95%]" />
            </div>
            <h3 className="text-[1.3rem]">Select Land</h3>
          </div>
          <div className="w-[300px] rounded-2xl flex flex-col gap-5  justify-end p-7 items-center shadow-xl border-2 border-[#323232] hover:scale-[101%] cursor-pointer">
            <div className="w-[260px]  h-[230px] make-flex border-2 border-[#8b8b8b] rounded-xl">
              <img src={BagIcon} alt="landImg" className="h-[85%] w-auto" />
            </div>
            <h3 className="text-[1.3rem]">Shop</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
