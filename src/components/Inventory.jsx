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

  return (
    <div className="card-box absolute z-1 make-flex w-screen h-screen">
      <div className="menu-container w-[900px] flex flex-col items-end card-container p-7">
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
          {NFTData.map(({ texture, src, isOpen }) => {
            return (
              <div
                key={texture}
                onClick={() => {
                  if (isOpen) {
                    setBlockTexture(texture);
                  }
                }}
                style={{ backgroundColor: isOpen ? "#9e9e9e76" : "#56565676" }}
                className={`w-[120px] h-[140px] rounded-xl flex flex-col gap-1 bg-[#56565676] justify-end p-2 pt-2 items-center shadow-xl border-2 border-white hover:scale-[101%]`}
              >
                <h3 className=" w-full ml-3 text-xs">Item</h3>
                <div className="w-[105px]  h-[150px] make-flex justify-end flex-col border-2 border-[#c2c2c2] rounded-xl">
                  <img src={src} className="w-[70%]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
