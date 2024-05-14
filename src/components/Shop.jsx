import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useStore } from "../hooks/useStore";
import * as imgSrc from "../images/Items/index";
import Loader from "./Loader";
import { mintitemNFTFunc } from "../utils/contractFunctionCall";

const Shop = () => {
  const [setShopMenu, allNFTsData, NFTData] = useStore((state) => [
    state.setShopMenu,
    state.allNFTsData,
    state.NFTData,
  ]);

  const [loader, setLoader] = useState(false);
  const [buyMenu, setBuyMenu] = useState(false);
  const [buyNFTdata, setBuyNFTData] = useState("");

  useEffect(() => {
    const filterNFTs = () => {
      const data = allNFTsData;
      data.filter((item1) => NFTData.some((item2) => item1.cid == item2.cid));
      console.log(data);
    };
    filterNFTs();
  }, [NFTData]);

  const buyItemNFT = async (tokenId) => {
    setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    await mintitemNFTFunc(signer, tokenId);
    setLoader(false);
    setBuyMenu(false);
  };

  return (
    <div
      className="card-box absolute z-100 make-flex w-screen h-screen"
      style={{ background: "rgba(223, 223, 223, 0.22)" }}
    >
      {buyMenu && (
        <div className="menu absolute z-10 make-flex w-screen h-screen">
          <div
            className="absolute z-10 translate-x-[175px] text-white -translate-y-[125px] cursor-pointer"
            onClick={() => setBuyMenu(false)}
          >
            X
          </div>
          <div className="card-container w-[400px] h-[300px] bg-[#863c26] make-flex justify-start flex-col gap-1  px-5 pt-7 ">
            <div className="make-flex justify-between w-full px-3">
              <h3 className=" w-full ">{buyNFTdata?.texture}</h3>
              <h3 className=" w-full text-right make-flex gap-2">Mintable</h3>
            </div>
            <div className="w-full h-[170px] make-flex flex-col bg-[#ead04e] rounded-lg">
              <img src={buyNFTdata.src} alt="landImg" className="h-[60%] " />
            </div>
            <div className="w-full make-flex justify-between my-2">
              <div className=" py-2 px-3 border make-flex rounded-md  h-8 text-lg w-[160px]">
                10k Wei
              </div>
              <button
                className="btn w-[100px] hover:scale-105"
                onClick={() => buyItemNFT(buyNFTdata?.tokenId)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="menu-container flex min-w-[600px] max-w-[1100px] flex-col card-container p-7">
        <div className=" w-full ">
          <div className="w-full make-flex justify-end">
            <div
              className="absolute  cursor-pointer translate-x-2 "
              onClick={() => setShopMenu(false)}
            >
              X
            </div>
          </div>
          <div className="relative -translate-y-3">Marketplace</div>
        </div>
        <div className="flex h-auto min-h-[400px] gap-7">
          <div className="right-menu w-full flex justify-center flex-wrap gap-2">
            {imgSrc.imgData.map(({ texture, src, isOpen, tokenId }) => {
              console.log(texture, src, isOpen);
              return (
                <div
                  key={tokenId}
                  onClick={() => {
                    setBuyNFTData({
                      texture,
                      src,
                      tokenId,
                    });
                    setBuyMenu(true);
                  }}
                  className="w-[150px] h-[180px] cursor-pointer rounded-xl flex bg-[#5e2919] flex-col gap-1  justify-end p-2 pt-2 items-center shadow-xl hover:scale-[101%]"
                >
                  <div className="flex justify-between w-full px-1 text-xs">
                    <h3 className=" w-full ">{texture}</h3>
                    <button className="font-light text-[0.8rem] px-1 bg-[#50BA4A] rounded-lg">
                      buy
                    </button>
                  </div>
                  <div className="w-full  h-[150px] make-flex flex-col rounded-xl bg-[#ead04e]">
                    <img
                      src={src}
                      alt="landImg"
                      className="w-[60%] h-auto -translate-y-5"
                    />
                  </div>
                  <div className="absolute w-[125px] py-1 px-3 font-medium text-xs bg-[#c9953b] rounded-2xl flex justify-between -translate-y-2 text-white">
                    <span>price</span>
                    <span>10k Wei</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default Shop;
