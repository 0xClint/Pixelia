import React, { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import { useKeyboard } from "../hooks/useKeyboard";
import { ethers } from "ethers";
import {
  diamondImg,
  grassImg,
  glassImg,
  woodImg,
  quartzImg,
  stoneImg,
  treeImg,
} from "../images/block_icons/images";
import {

  InfoIcon,
  bagPackIcon,
  chatIcon,
  gearIcon,
  globeIcon,
  levelsIcon,
  profileIcon,
  saveIcon,
  shopIcon,
} from "../assets";
import Loader from "./Loader";

const images = {
  grass: grassImg,
  tree: treeImg,
  glass: glassImg,
  wood: woodImg,
  diamond: diamondImg,
  quartz: quartzImg,
  stone: stoneImg,
};

const TextureSelector = () => {
  const [
    cubes,
    items,
    targetCubes,
    activeWorldID,
    activeTexture,
    setTexture,
    chatBar,
    setChatBar,
    inventoryBar,
    setInventoryBar,
    settingMenu,
    setSettingMenu,
    shopMenu,
    setShopMenu,
    infoBar,
    setInfoBar,
    activeConfig,
    setActiveConfig,
    levelMode,
    setLevelMode,
    getLevel,
    setLevel,
  ] = useStore((state) => [
    state.cubes,
    state.items,
    state.targetCubes,
    state.activeWorldID,
    state.blockTexture,
    state.setBlockTexture,
    state.chatBar,
    state.setChatBar,
    state.inventoryBar,
    state.setInventoryBar,
    state.settingMenu,
    state.setSettingMenu,
    state.shopMenu,
    state.setShopMenu,
    state.infoBar,
    state.setInfoBar,
    state.activeConfig,
    state.setActiveConfig,
    state.levelMode,
    state.setLevelMode,
    state.getLevel,
    state.setLevel,
  ]);

  const {
    grass,
    tree,
    glass,
    wood,
    diamond,
    quartz,
    stone,
    chatMenu,
    inventory,
    settings,
    buyMenu,
    infoMenu,
    saveBtn,
    profileMenu,
  } = useKeyboard();

  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const textures = {
      grass,
      tree,
      glass,
      wood,
      diamond,
      quartz,
      stone,
      chatMenu,
      inventory,
      settings,
      buyMenu,
      infoMenu,
      saveBtn,
      profileMenu,
    };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      if (pressedTexture[0] == "chatMenu") {
        setChatBar(!chatBar);
        setActiveConfig(activeConfig == "chatMenu" ? "e" : "chatMenu");
      } else if (pressedTexture[0] == "inventory") {
        setInventoryBar(!inventoryBar);
        setActiveConfig(activeConfig == "inventory" ? "e" : "inventory");
      } else if (pressedTexture[0] == "settings") {
        setSettingMenu(!settingMenu);
        setActiveConfig(activeConfig == "setting" ? "e" : "setting");
      } else if (pressedTexture[0] == "buyMenu") {
        setShopMenu(!shopMenu);
        setActiveConfig(activeConfig == "shopMenu" ? "e" : "shopMenu");
      } else if (pressedTexture[0] == "infoMenu") {
        setInfoBar(!infoBar);
        setActiveConfig(activeConfig == "infoMenu" ? "e" : "infoMenu");
      } else if (pressedTexture[0] == "profileMenu") {
        // setLevelMode(!levelMode);
      } else {
        setTexture(pressedTexture[0]);
      }
    }
  }, [
    profileMenu,
    setTexture,
    grass,
    tree,
    glass,
    wood,
    diamond,
    quartz,
    stone,
    chatMenu,
    inventory,
    settings,
    saveBtn,
    buyMenu,
    infoMenu,
  ]);

  // console.log(levelMode);

  const saveGameData = async () => {
    setLoader(true);
    const objData = {
      cubes,
      items,
    };
    console.log("worldId: " + activeWorldID);
    console.log(objData);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyLevel = async () => {
    // setLoader(true);
    // const res = compare(cubes, targetCubes[getLevel]);
    // console.log(res);
    // if (res) {
    //   setSuccess(true);
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   await provider.send("eth_requestAccounts", []);
    //   const signer = await provider.getSigner();
    //   await mintLevel(signer);
    //   setModal(true);
    //   setLevel(getLevel + 1);
    // } else {
    //   setModal(true);
    // }
    // setLoader(false);
  };

  return (
    <div>
      <div className="texture-selector icon-container">
        {Object.entries(images).map(([k, src], index) => {
          return (
            <div key={k}>
              <span className="absolute text-[10px] m-1 translate-x-[6px] translate-y-[6px] text-[#7b260c] font-semibold">
                {index + 1}
              </span>
              <img
                key={k}
                src={src}
                style={{ scale: "1" }}
                className={`${k === activeTexture ? "active" : ""}`}
              />
            </div>
          );
        })}
      </div>
      <div className="icon-container absolute right-0 top-[30%] z-10 cursor-pointer">
        <div onClick={() => saveGameData()}>
          <span className="absolute text-[8px] m-1 translate-x-[7px] translate-y-[1px] text-[#7b260c] font-semibold">
            Ctrl+S
          </span>
          <img
            src={saveIcon}
            className={`${"save" === activeConfig ? "active" : ""}`}
          />
        </div>
        <div onClick={() => setSettingMenu(!settingMenu)}>
          <span className="absolute text-[9px] m-1 translate-x-[7px] translate-y-[3px] text-[#7b260c] font-semibold">
            E
          </span>
          <img
            src={gearIcon}
            className={`${"setting" === activeConfig ? "active" : ""}`}
          />
        </div>
        <div onClick={() => setShopMenu(!shopMenu)}>
          <span className="absolute text-[9px] m-1 translate-x-[7px] translate-y-[3px] text-[#7b260c] font-semibold">
            B
          </span>
          <img
            src={shopIcon}
            className={`${"shopMenu" === activeConfig ? "active" : ""}`}
          />
        </div>
        <div onClick={() => setInventoryBar(!inventoryBar)}>
          <span className="absolute text-[9px] m-1 translate-x-[7px] translate-y-[3px] text-[#7b260c] font-semibold">
            Q
          </span>
          <img
            src={bagPackIcon}
            className={`${"inventory" === activeConfig ? "active" : ""}`}
          />
        </div>
        <div onClick={() => setInfoBar(!infoBar)}>
          <span className="absolute text-[9px] m-1 translate-x-[7px] translate-y-[3px] text-[#7b260c]">
            I
          </span>
          <img
            src={InfoIcon}
            className={`${"infoMenu" === activeConfig ? "active" : ""}`}
          />
          {infoBar && (
            <ul className="btn absolute  -translate-x-[250px] -translate-y-[75px] w-[250px] text-[18px] py-2 px-3 font-vt">
              <li>To exist view press ESC</li>
              <li> Click on the center pointer to continue</li>
            </ul>
          )}
        </div>
      </div>
      <div
        className="icon-container absolute flex left-2 gap-3 cursor-pointer bottom-2"
        style={{ margin: 0 }}
      ></div>
      {loader && <Loader />}
    </div>
  );
};

export default TextureSelector;
