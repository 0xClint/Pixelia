import { useStore } from "../hooks/useStore";
import Cube from "./Cube";

const Cubes = () => {
  const [cubes, targetCubes, levelMode, switchModal, getLevel] = useStore(
    (state) => [
      state.cubes,
      state.targetCubes,
      state.levelMode,
      state.switchModal,
      state.getLevel,
    ]
  );
  if (switchModal) {
    // if (switchModal) {
    //   return cubes.map(({ key, pos, texture }) => {
    //     return <Cube key={key} position={pos} texture={texture} />;
    //   });
    // } else {
    console.log(getLevel);
    console.log(targetCubes[getLevel]);
    return targetCubes[getLevel].map(({ key, pos, texture }) => {
      return <Cube key={key} position={pos} texture={texture} />;
    });
    // }
  } else {
    return cubes.map(({ key, pos, texture }) => {
      return <Cube key={key} position={pos} texture={texture} />;
    });
  }
};

export default Cubes;
