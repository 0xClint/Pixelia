import { useStore } from "../../hooks/useStore";
import Grass from "./Grass";

const Grasses = () => {
  const [grass] = useStore((state) => [state.grass]);

  return grass.map(({ key, pos, texture }) => {
    return <Grass key={key} position={pos} textureID={texture} />;
  });
};

export default Grasses;
