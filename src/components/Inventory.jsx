import React, { useEffect, useState } from "react";
import { BagIcon, gearIcon, landImg, landsImg } from "../assets";
import { imgData } from "../images/Items/index";
import { useStore } from "../hooks/useStore";

const Inventory = () => {
  // console.log(imgData);
  const [setBlockTexture, setInventoryBar, NFTData] = useStore((state) => [
    state.setBlockTexture,
    state.setInventoryBar,
    state.NFTData,
  ]);
  const [NFTItemData, setNFTItemData] = useState(imgData);
  console.log(NFTData);

  return (
    <div className="card-box absolute z-1 make-flex w-screen h-screen">
      <div className="menu-container w-[800px] flex flex-col items-end card-container p-7">
        <div
          className="absolute  cursor-pointer"
          onClick={() => setInventoryBar(false)}
        >
          X
        </div>
        <div className="w-full">
          <div className="relative -translate-y-3">Inventory | Items owned</div>
        </div>
        <div className="flex h-auto min-h-[300px] justify-center items-center flex-wrap gap-3">
          {NFTData.map(({ texture, src, isOpen }) => (
            <div
              key={texture}
              onClick={() => {
                if (isOpen) {
                  setBlockTexture(texture);
                }
              }}
              style={{ filter: isOpen ? "brightness(1)" : "brightness(0.5)" }}
              className={`w-[120px] h-[140px] rounded-xl flex flex-col gap-1 border-2 bg-[#6b2b19] border-[#41190e] justify-end p-2 pt-2 items-center shadow-xl  hover:scale-[101%]`}
            >
              <h3 className=" w-full ml-3 text-xs">{texture}</h3>
              <div className="w-[105px]  h-[150px] make-flex justify-end flex-col bg-[#ead04e] rounded-xl">
                <img src={src} className="w-[70%]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
