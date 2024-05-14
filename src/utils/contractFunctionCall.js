import { ethers } from "ethers";
import {
  ITEM_NFT_CONTRACT_ABI,
  ITEM_NFT_CONTRACT_ADDRESS,
  WORLD_CONTRACT_ABI,
  WORLD_CONTRACT_ADDRESS,
} from "../Contracts/constant";
import { makeFileObjects, uploadFile } from "./lightouse";

// ***********world NFT contract************

export const createWorldFunc = async (signer, name, description) => {
  const CID = await uploadFile(await makeFileObjects({ cubes: [], items: [] }));
  try {
    const contract = new ethers.Contract(
      WORLD_CONTRACT_ADDRESS,
      WORLD_CONTRACT_ABI,
      signer
    );
    const account = await signer.getAddress();
    const nextToken = Number(await contract.nextTokenId());
    const tx = await contract.createWorld(account, CID, name, description, 1, {
      value: 10000,
    });
    await tx.wait();
    return { nextToken, CID };
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

export const updateWorldFunc = async (signer, tokenID, objData) => {
  const CID = await uploadFile(await makeFileObjects(objData));
  try {
    const contract = new ethers.Contract(
      WORLD_CONTRACT_ADDRESS,
      WORLD_CONTRACT_ABI,
      signer
    );
    const tx = await contract.updateURI(tokenID, CID);
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
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

// ***********item NFT contract************

export const mintitemNFTFunc = async (signer, itemID) => {
  try {
    const contract = new ethers.Contract(
      ITEM_NFT_CONTRACT_ADDRESS,
      ITEM_NFT_CONTRACT_ABI,
      signer
    );
    const tx = await contract.mint(itemID, { value: 10000 });
    await tx.wait();
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};

export const getItemNFTsByOwnerFunc = async (signer) => {
  try {
    const contract = new ethers.Contract(
      ITEM_NFT_CONTRACT_ADDRESS,
      ITEM_NFT_CONTRACT_ABI,
      signer
    );
    const account = await signer.getAddress();
    const res = await contract.getItemsForUser(account);
    return res;
  } catch (error) {
    console.error("Error calling contract function:", error);
  }
};
