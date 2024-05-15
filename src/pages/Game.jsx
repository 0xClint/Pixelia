import React, { useEffect, useState } from "react";
import { Physics } from "@react-three/cannon";
import "./Game.css";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { PointerLockControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Cubes,
  FPP,
  Ground,
  Header,
  Inventory,
  Items,
  Loader,
  Menu,
  Player,
  Shop,
  TextureSelector,
} from "../components";
import { useStore } from "../hooks/useStore";
import axios from "axios";
import { useParams } from "react-router-dom";
import Clouds from "../components/Clouds";
import { getItemNFTsByOwnerFunc } from "../utils/contractFunctionCall";

const Game = () => {
  const [
    menu,
    setMenu,
    shopMenu,
    setShopMenu,
    settingMenu,
    inventoryBar,
    setInventoryBar,
    items,
    setData,
    setNFTData,
    setAllNFTsData,
    setLevel,
  ] = useStore((state) => [
    state.menu,
    state.setMenu,
    state.shopMenu,
    state.setShopMenu,
    state.settingMenu,
    state.inventoryBar,
    state.setInventoryBar,
    state.items,
    state.setData,
    state.setNFTData,
    state.setAllNFTsData,
    state.setLevel,
  ]);

  const [loader, setLoader] = useState(false);
  const params = useParams();

  const { enableWeb3, isWeb3Enabled } = useMoralis();
  useEffect(() => {
    if (isWeb3Enabled) return;

    if (
      typeof window !== "undefined" &&
      window.localStorage.getItem("connected")
    ) {
      enableWeb3();
    }
  }, []);

  // useEffect(() => {
  //   const getGameData = async () => {
  //     setLoader(true);
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []);
  //     const signer = await provider.getSigner();

  //     await fetchGameData(signer);
  //     setLoader(false);
  //   };
  //   getGameData();
  // }, []);

  // useEffect(() => {
  //   const getAllNFTsMinted = async () => {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []);
  //     const signer = await provider.getSigner();
  //     try {

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getAllNFTsMinted();
  // }, [isWeb3Enabled]);

  useEffect(() => {
    const fetchItemNFTsData = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      try {
        const tempData = await getItemNFTsByOwnerFunc(signer);
        setNFTData(tempData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItemNFTsData();
  }, [isWeb3Enabled]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://gateway.lighthouse.storage/ipfs/${params.id}/`
      );

      console.log(res.data);
      setData(res.data);
    };
    fetchData();
  }, [isWeb3Enabled]);

  const getLevelcompleted = async () => {
    if (isWeb3Enabled) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        // setLevel(await fetchLevel(signer));
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="game-app">
      <Canvas style={{ height: "100vh" }}>
        <Sky sunPosition={[100, 40, 20]} turbidity={4} />
        <PointerLockControls selector="#enter-game" />
        <ambientLight intensity={0.6} />
        <Physics>
          <Clouds />
          <Player />
          <Ground />
          <Items />
          <Cubes />
        </Physics>
        <Stars />
      </Canvas>
      <div
        className="absolute centered cursor enter-game"
        style={{ zIndex: 1, cursor: "pointer" }}
        id="enter-game"
      >
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
          <path
            d="M9.54849 23V0H13.4515V23H9.54849ZM0 13.4515V9.54849H23V13.4515H0Z"
            fill="white"
          />
        </svg>
      </div>
      <TextureSelector />
      {shopMenu && <Shop />}
      {settingMenu && <Menu />}
      {inventoryBar && <Inventory />}
      <Header />
      {loader && <Loader />}
    </div>
  );
};

const Stars = () => {
  return (
    <group>
      {Array.from({ length: 100 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500,
          ]}
        >
          <sphereGeometry args={[Math.random() * 2]} />
          <meshBasicMaterial color={0xffffff} />
        </mesh>
      ))}
    </group>
  );
};
export default Game;
