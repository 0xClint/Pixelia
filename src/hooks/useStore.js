import { nanoid } from "nanoid";
import create from "zustand";
import {
  flowersCoordinates,
  grassCoordinates,
  treesCoordinates,
} from "../assets/preData";
import { imgData } from "../images/Items";
import { dataLevel } from "../assets/dataLevel";

const getlocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set) => ({
  blockTexture: "grass",
  setBlockTexture: (blockTexture) => {
    set(() => ({ blockTexture }));
  },
  cubes: [],
  getLevel: 0,
  setLevel: (toggle) => {
    set(() => ({ getLevel: toggle }));
  },
  setData: (data) => {
    if (data) {
      set(() => ({
        cubes: [...data.cubes],
        items: [...data.items],
      }));
    }
  },
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: prev.blockTexture,
        },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  items: [],
  addItem: (x, y, z) => {
    set((prev) => ({
      items: [
        ...prev.items,
        { key: nanoid(), pos: [x, y, z], texture: prev.blockTexture },
      ],
    }));
  },
  removeItem: (x, y, z) => {
    set((prev) => ({
      items: prev.items.filter((item) => {
        const [X, Y, Z] = item.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  levelMode: false,
  setLevelMode: (toggle) => {
    set(() => ({ levelMode: toggle, cubes: [] }));
  },
  switchModal: false,
  setSwitchModal: (toggle) => {
    set(() => ({ switchModal: toggle }));
  },
  targetCubes: [...dataLevel],
  setTargetCubes: (toggle) => {
    set(() => ({ targetCubes: toggle }));
  },
  allNFTsData: [],
  setAllNFTsData: (args) => {
    if (args) {
      set(() => ({
        allNFTsData: [...args],
      }));
    }
  },
  NFTData: [],
  setNFTData: (args) => {
    if (args) {
      const data = imgData;
      data.forEach((item1) => {
        item1.isOpen = args.some((item2) => item2.cid == item1.texture);
      });
      set(() => ({
        NFTData: [...data],
      }));
    }
  },
  activeConfig: "e",
  setActiveConfig: (toggle) => {
    set(() => ({ activeConfig: toggle }));
  },
  setActiveWorldID: (toggle) => {
    set(() => ({ activeWorldID: toggle }));
  },
  infoBar: false,
  setInfoBar: (toggle) => {
    set(() => ({ infoBar: toggle }));
  },
  chatBar: false,
  setChatBar: (toggle) => {
    set(() => ({ chatBar: toggle }));
  },
  menu: true,
  setMenu: (toggle) => {
    set(() => ({ menu: toggle }));
  },
  inventoryBar: false,
  setInventoryBar: (toggle) => {
    set(() => ({ inventoryBar: toggle }));
  },

  settingMenu: false,
  setSettingMenu: (toggle) => {
    set(() => ({ settingMenu: toggle }));
  },
  shopMenu: false,
  setShopMenu: (toggle) => {
    set(() => ({ shopMenu: toggle }));
  },

  flowers: flowersCoordinates,
  addFlower: (x, y, z) => {
    set((prev) => ({
      flowers: [
        ...prev.flowers,
        { key: nanoid(), pos: [x, y, z], texture: prev.texture },
      ],
    }));
  },
  removeFlower: (x, y, z) => {
    set((prev) => ({
      flowers: prev.flowers.filter((flower) => {
        const [X, Y, Z] = flower.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  grass: grassCoordinates,
  addGrass: (x, y, z) => {
    set((prev) => ({
      grass: [
        ...prev.grass,
        { key: nanoid(), pos: [x, y, z], texture: prev.texture },
      ],
    }));
  },
  removeGrass: (x, y, z) => {
    set((prev) => ({
      grass: prev.grass.filter((item) => {
        const [X, Y, Z] = item.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  saveWorld: () => {
    set((prev) => {
      setLocalStorage("cubes", prev.cubes);
    });
  },
  resetWorld: () => {
    set(() => ({ cubes: [] }));
  },
}));
