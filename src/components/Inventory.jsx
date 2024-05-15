import React, { useEffect, useState } from "react";
import { imgData } from "../images/Items/index";
import { useStore } from "../hooks/useStore";
import Loader from "./Loader";
import { ethers } from "ethers";
import {
  createCustomItemFunc,
  getNextItemIDFunc,
} from "../utils/contractFunctionCall";
import { uploadFile } from "../utils/lightouse";

const Inventory = () => {
  const [setBlockTexture, setInventoryBar, NFTData] = useStore((state) => [
    state.setBlockTexture,
    state.setInventoryBar,
    state.NFTData,
  ]);
  const [loader, setLoader] = useState(false);
  const [itemName, setItemName] = useState("");
  const [customNFTData, setCustomNFTData] = useState(null);
  const [customMenu, setCustomMenu] = useState(false);
  const [itemDescription, setItemDescription] = useState("");

  useEffect(() => {
    const getCUstomNFTData = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setCustomNFTData(await getNextItemIDFunc(signer));
    };
    getCUstomNFTData();
  }, []);

  const createCustomItem = async () => {
    if (itemName && itemDescription) {
      setLoader(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      console.log(itemDescription);
      const CID = await uploadFile(itemDescription);

      await createCustomItemFunc(signer, itemName, CID);
      setLoader(false);
      setCustomMenu(false);
      setInventoryBar(false);
    }
  };

  return (
    <div className="card-box absolute z-1 make-flex w-screen h-screen">
      {customMenu && (
        <div className="menu absolute z-10 make-flex w-screen h-screen">
          <div
            className="absolute z-10 translate-x-[180px] text-white -translate-y-[100px] cursor-pointer"
            onClick={() => setCustomMenu(false)}
          >
            X
          </div>
          <div className="z-100 text-lg gameloader-container w-[400px] bg-[#76311d] min-h-[200px]  py-7 card-container make-flex justify-start flex-col gap-3 px-7">
            <div className="w-full">
              <label className="">Name of Item</label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="border-2 mt-1 border-black w-full px-1 text-md text-black rounded-md font-vt"
              />
            </div>
            <div className="w-full">
              <label>Upload image</label>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => setItemDescription(e.target.files)}
              />
              {/* <textarea
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                className="border-2 mt-1 border-black w-full px-1 text-md text-black rounded-md font-vt"
              /> */}
            </div>
            <button
              className="btn py-2 px-4 text-md text-white hover:scale-[102%]"
              onClick={() => createCustomItem()}
            >
              Create
            </button>
          </div>
        </div>
      )}
      <div className="menu-container w-[800px] flex flex-col items-end card-container p-7">
        <div
          className="absolute  cursor-pointer"
          onClick={() => setInventoryBar(false)}
        >
          X
        </div>
        <div className="w-full flex gap-6">
          <div className="relative -translate-y-3">Inventory | Items owned</div>
          <button
            onClick={() => setCustomMenu(true)}
            className="relative -translate-y-3 bg-[#ead04e] rounded px-2 cursor-pointer text-[#41190e] hover:scale-105"
          >
            Create custom NFT
          </button>
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
          {customNFTData && (
            <div
              className={`w-[120px] h-[140px] rounded-xl flex flex-col gap-1 border-2 bg-[#6b2b19] border-[#41190e] justify-end p-2 pt-2 items-center shadow-xl  hover:scale-[101%]`}
            >
              <div className="flex justify-between w-full">
                <h3 className=" text-xs">{customNFTData.name}</h3>
                <h3 className="text-xs bg-green-600 rounded px-1">custom</h3>
              </div>
              <div className="w-[105px]  h-[150px] make-flex justify-end flex-col bg-[#ead04e] rounded-xl">
                <img
                  src={`https://gateway.lighthouse.storage/ipfs/${customNFTData.description}`}
                  className="w-[70%]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default Inventory;
