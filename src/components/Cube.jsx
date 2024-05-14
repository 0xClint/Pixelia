import { useBox } from "@react-three/cannon";
import * as textures from "../images/block/textures";
import { useStore } from "../hooks/useStore";
import { useState } from "react";

const blockTextures = {
  grass: [
    textures.grass_block_side_texture,
    textures.grass_block_side_texture,
    textures.grass_block_top_texture,
    textures.grass_block_side_texture,
    textures.grass_block_side_texture,
    textures.grass_block_side_texture,
  ],
  tree: [
    textures.oak_log_texture,
    textures.oak_log_texture,
    textures.oak_log_top_texture,
    textures.oak_log_texture,
    textures.oak_log_texture,
    textures.oak_log_texture,
  ],
  glass: [
    textures.glass_texture,
    textures.glass_texture,
    textures.glass_texture,
    textures.glass_texture,
    textures.glass_texture,
    textures.glass_texture,
  ],
  diamond: [
    textures.diamond_block_texture,
    textures.diamond_block_texture,
    textures.diamond_block_texture,
    textures.diamond_block_texture,
    textures.diamond_block_texture,
    textures.diamond_block_texture,
  ],
  stone: [
    textures.stone_texture,
    textures.stone_texture,
    textures.stone_texture,
    textures.stone_texture,
    textures.stone_texture,
    textures.stone_texture,
  ],
  quartz: [
    textures.quartz_texture,
    textures.quartz_texture,
    textures.quartz_texture,
    textures.quartz_texture,
    textures.quartz_texture,
    textures.quartz_texture,
  ],
  wood: [
    textures.wood_texture,
    textures.wood_texture,
    textures.wood_texture,
    textures.wood_texture,
    textures.wood_texture,
    textures.wood_texture,
  ],
  leaves: [
    textures.leaves_texture,
    textures.leaves_texture,
    textures.leaves_texture,
    textures.leaves_texture,
    textures.leaves_texture,
    textures.leaves_texture,
  ],
};

const Cube = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref] = useBox(() => ({
    type: "Static",
    position,
    args: [0.5, 0.5, 0.5],
  }));
  const [addCube, removeCube, blocktexture] = useStore((state) => [
    state.addCube,
    state.removeCube,
    state.blockTexture,
  ]);

  const activeTexture = blockTextures[texture];

  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();

        const clickedFace = Math.floor(e.faceIndex / 2);
        const { x, y, z } = ref.current.position;
        if (e.altKey) {
          removeCube(x, y, z);
          return;
        } else if (clickedFace === 0) {
          addCube(x + 0.5, y, z);
          return;
        } else if (clickedFace === 1) {
          addCube(x - 0.5, y, z);
          return;
        } else if (clickedFace === 2) {
          addCube(x, y + 0.5, z);
          return;
        } else if (clickedFace === 3) {
          addCube(x, y - 0.5, z);
          return;
        } else if (clickedFace === 4) {
          addCube(x, y, z + 0.5);
          return;
        } else if (clickedFace === 5) {
          addCube(x, y, z - 0.5);
          return;
        }
      }}
    >
      <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 0.5]} />
      {activeTexture
        ? activeTexture.map((texture, index) => {
            return (
              <meshStandardMaterial
                key={index}
                color={isHovered ? "grey" : "white"}
                map={texture}
                transparent={true}
                opacity={texture === "glass" ? 0.6 : 1}
                attachArray="material"
              />
            );
          })
        : ""}
    </mesh>
  );
};

export default Cube;
