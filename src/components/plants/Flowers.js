import { useStore } from "../../hooks/useStore";
import Flower from "./Flower";

const Flowers = () => {
  const [flowers] = useStore((state) => [state.flowers]);

  return flowers.map(({ key, pos, texture }) => {
    return <Flower key={key} position={pos} textureID={texture} />;
  });
};

export default Flowers;
