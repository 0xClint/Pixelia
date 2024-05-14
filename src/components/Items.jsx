import React from "react";
import { useStore } from "../hooks/useStore";
import Item from "./Item";

const Items = () => {
  const [items] = useStore((state) => [state.items]);
  return items.map(({ key, pos, texture }) => {
    return <Item key={key} position={pos} textureID={texture} />;
  });
};

export default Items;
