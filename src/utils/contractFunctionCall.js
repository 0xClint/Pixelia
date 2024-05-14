import { ethers } from "ethers";
import {
  WORLD_CONTRACT_ABI,
  WORLD_CONTRACT_ADDRESS,
} from "../Contracts/constant";
import { makeFileObjects, uploadFile } from "./lightouse";

export const createWorldFunc = async (signer, name, description) => {
  const CID = await uploadFile(await makeFileObjects({ cubes: [], items: [] }));
  try {
    const contract = new ethers.Contract(
      WORLD_CONTRACT_ADDRESS,
      WORLD_CONTRACT_ABI,
      signer
    );
    const account = await signer.getAddress();
    const tx = await contract.createWorld(account, CID, name, description, 1, {
      value: 10000,
    });
    await tx.wait();
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};
export const updateWorldFunc = async (signer) => {
  try {
    const contract = new ethers.Contract(
      WORLD_CONTRACT_ADDRESS,
      WORLD_CONTRACT_ABI,
      signer
    );
    const tx = await contract.updateURI(1, "newCID");
    await tx.wait();
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

export const getAllNFTsFunc = async (signer) => {
  try {
    const contract = new ethers.Contract(
      WORLD_CONTRACT_ADDRESS,
      WORLD_CONTRACT_ABI,
      signer
    );

    const res = await contract.getAllNFTs();
    console.log(res);
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};
export const getNFTsByOwnerFunc = async (signer) => {
  try {
    const contract = new ethers.Contract(
      WORLD_CONTRACT_ADDRESS,
      WORLD_CONTRACT_ABI,
      signer
    );
    const account = await signer.getAddress();
    const res = await contract.getNFTsByOwner(account);
    return res
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};
