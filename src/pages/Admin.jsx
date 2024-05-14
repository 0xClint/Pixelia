import React from "react";
import { ethers } from "ethers";
import {
  createWorldFunc,
  getAllNFTsFunc,
  getNFTsByOwnerFunc,
  updateWorldFunc,
} from "../utils/contractFunctionCall";

const Admin = () => {
  const createWorld = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    createWorldFunc(signer, "name1", "description1");
  };
  const updateWorld = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    updateWorldFunc(signer);
  };

  const getAllNFTs = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    await getAllNFTsFunc(signer);
  };

  const getNFTsByOwner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    await getNFTsByOwnerFunc(signer);
  };
  console.log(window.ethereum);
  return (
    <div className="adminpage w-screen flex px-20 gap-10 pt-10">
      <div className="w-1/2 make-flex flex-col">
        <button onClick={() => createWorld()}>Create World</button>
        <button onClick={() => updateWorld()}>Update World</button>
        <button onClick={() => getAllNFTs()}>get all NFTS</button>
        <button onClick={() => getNFTsByOwner()}>get NFTs By Owner</button>
      </div>
    </div>
  );
};

export default Admin;
