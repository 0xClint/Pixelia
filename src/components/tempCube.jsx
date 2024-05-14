import { useBox } from "@react-three/cannon";
import {
  glass_texture,
  grass_block_side_texture,
} from "../images/block/textures";

const TempCube = () => {
  const [ref] = useBox(() => ({
    type: "Static",
    position: [1, 0, 1],
    collisionResponse: true,
    args: [0.5, 0.5, 0.5],
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial attachArray="material" map={glass_texture} />
      <meshStandardMaterial attachArray="material" map={glass_texture} />
      <meshStandardMaterial
        attachArray="material"
        map={grass_block_side_texture}
      />
      <meshStandardMaterial attachArray="material" map={glass_texture} />
      <meshStandardMaterial attachArray="material" map={glass_texture} />
      <meshStandardMaterial attachArray="material" map={glass_texture} />
    </mesh>
  );
};

export default TempCube;
