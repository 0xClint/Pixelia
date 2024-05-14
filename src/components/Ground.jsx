import { useCylinder, usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/block/textures";
import { useStore } from "../hooks/useStore";

const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  const [addCube, addItem, setSelector, blockTexture] = useStore((state) => [
    state.addCube,
    state.addItem,
    state.setSelector,
    state.blockTexture,
  ]);

  const Texture = (args) => {
    if (
      args == "grass" ||
      args == "tree" ||
      args == "glass" ||
      args == "diamond" ||
      args == "stone" ||
      args == "wood" ||
      args == "quartz"
    ) {
      return true;
    }
  };

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val));
        if (Texture(blockTexture)) {
          addCube(x, y, z);
        } else {
          addItem(x, y, z);
        }
      }}
    >
      <circleBufferGeometry args={[10, 200]} />
      <meshStandardMaterial attach={"material"} map={groundTexture} />
    </mesh>
  );
};

export default Ground;
