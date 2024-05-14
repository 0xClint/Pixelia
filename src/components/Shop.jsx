import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useStore } from "../hooks/useStore";
import * as imgSrc from "../images/Items/index";
import Loader from "./Loader";

const Shop = () => {
  const [setShopMenu, allNFTsData, NFTData] = useStore((state) => [
    state.setShopMenu,
    state.allNFTsData,
    state.NFTData,
  ]);

  const [loader, setLoader] = useState(false);
  const [buyMenu, setBuyMenu] = useState(false);
  const [buyNFTdata, setBuyNFTData] = useState("");

  // useEffect(() => {
  //   console.log("owner NFTs : ");
  //   console.log(NFTData);
  //   console.log("Total NFTs : ");
  //   console.log(allNFTsData)
  //   const filterNFTs = () => {
  //     const data = allNFTsData;
  //     data.filter((item1) => NFTData.some((item2) => item1.cid == item2.cid));
  //     console.log(data);
  //   };
  //   filterNFTs();
  // }, [NFTData]);

  const purchase = async (itemNum, price) => {
    console.log(buyNFTdata);
    console.log(itemNum, price);
    setLoader(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
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
          <div
            className="card-container w-[400px] h-[300px] bg-[#919191] make-flex justify-start flex-col gap-1  px-5 pt-7 "
            style={{ backgroundColor: "rgba(164, 164, 164, 0.92)" }}
          >
            <div className="make-flex justify-between w-full px-3">
              <h3 className=" w-full ">{buyNFTdata.itemName}</h3>
              <h3 className=" w-full text-right make-flex gap-2">
                <span className="font-vt"> (NFTs remaining)</span>
                {buyNFTdata.itemTotalSupply - buyNFTdata.totalSold}/
                {buyNFTdata.itemTotalSupply}
              </h3>
            </div>
            <div className="w-full h-[170px] make-flex flex-col border-2 border-[#8b8b8b] rounded-lg">
              <img
                src={imgSrc[buyNFTdata.cid]}
                alt="landImg"
                className="h-[60%] "
              />
            </div>
            <div className="w-full make-flex justify-between my-2">
              <div className=" py-2 px-3 border make-flex rounded-md  h-8 text-lg w-[160px]">
                {buyNFTdata.price}$
              </div>
              <button
                className="btn w-[100px] hover:scale-105"
                onClick={() => purchase(buyNFTdata.itemNum, buyNFTdata.price)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="menu-container flex min-w-[900px] flex-col card-container p-7">
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
        <div className="flex h-auto min-h-[500px]  gap-7">
          <div className="right-menu w-full flex flex-wrap gap-2">
            {allNFTsData?.map(
              ({
                cid,
                itemAddress,
                itemName,
                itemTotalSupply,
                price,
                totalSold,
                itemNum,
              }) => {
                return (
                  <div
                    key={cid}
                    onClick={() => {
                      setBuyNFTData({
                        cid,
                        itemAddress,
                        itemName,
                        itemTotalSupply,
                        price,
                        totalSold,
                        itemNum,
                      });
                      setBuyMenu(true);
                    }}
                    className="w-[200px] cursor-pointer h-[250px] rounded-xl flex flex-col gap-1  justify-end p-2 pt-2 items-center shadow-xl border-2 border-white hover:scale-[101%]"
                  >
                    <div className="flex justify-between w-full px-1">
                      <h3 className=" w-full ">{itemName}</h3>
                      <button className="font-light text-[0.8rem] px-1 bg-[#50BA4A] rounded-lg">
                        buy
                      </button>
                    </div>
                    <div className="w-[175px]  h-[200px] make-flex flex-col border-2 border-[#a4a4a4] rounded-xl">
                      <img
                        src={imgSrc[cid]}
                        alt="landImg"
                        className="w-[60%] h-auto -translate-y-5"
                      />
                    </div>
                    <div className="absolute py-2 px-3 h-8 text-[0.65rem] w-[160px] bg-[#5A5A8E] rounded-2xl flex justify-between -translate-y-2 text-white">
                      <span>
                        {itemTotalSupply - totalSold}/{itemTotalSupply}
                      </span>
                      <span>{price}$</span>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default Shop;
