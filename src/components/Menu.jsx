import { useStore } from "../hooks/useStore";
import { useEffect, useState } from "react";

const Menu = () => {
  const [menu, setMenu, settingMenu, setSettingMenu] = useStore((state) => [
    state.menu,
    state.setMenu,
    state.settingMenu,
    state.setSettingMenu,
  ]);
  const [controlMenu, setControlMenu] = useState(false);

  return (
    <div className="menu absolute z-10 make-flex w-screen h-screen">
      <div
        className="absolute translate-x-[120px] text-white -translate-y-[120px] cursor-pointer"
        onClick={() => setSettingMenu(!settingMenu)}
      >
        X
      </div>
      <ul className="menu-container w-[300px] h-[300px] card-container make-flex flex-col gap-10">
        <li
          className="cursor-pointer hover:text-[#797979]"
          onClick={() => setSettingMenu(!settingMenu)}
        >
          Resume
        </li>
        <li
          className="cursor-pointer hover:text-[#797979]"
          onClick={() => setMenu(true)}
        >
          Home
        </li>
        <li
          className="cursor-pointer hover:text-[#797979]"
          onMouseOver={() => setControlMenu(true)}
          onMouseLeave={() => setControlMenu(false)}
        >
          Controls
        </li>
        <li className="cursor-pointer hover:text-[#797979]">Save</li>
      </ul>
      {controlMenu && (
        <ul className=" absolute translate-x-[420px] menu-container w-[500px]  py-12 card-container make-flex flex-col gap-8 rounded-3xl">
          <li className=" flex justify-between w-[80%] ">
            <div className="">W</div>
            <div className="">Forward</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">A</div>
            <div className="">Leftward</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">D</div>
            <div className="">Backward</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">S</div>
            <div className="">Forward</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">C</div>
            <div className="">Chatbox</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">Q</div>
            <div className="">Inventory</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">E</div>
            <div className="">Setting</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">B</div>
            <div className="">Buy</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">Space</div>
            <div className="">Jump</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">Click</div>
            <div className="">Build</div>
          </li>
          <li className=" flex justify-between w-[80%]">
            <div className="">Alt+Click</div>
            <div className="">Destroy</div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
