import React, { useState } from "react";
import { usePlane } from "@react-three/cannon";
import * as textures from "../../images/grass/textures";
import { useStore } from "../../hooks/useStore";

const Grass = ({ position, textureID }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [ref1] = usePlane(() => ({
    position,
    args: [10, 10],
    collisionResponse: false,
  }));
  const [ref2] = usePlane(() => ({
    position,
    args: [10, 10],
    collisionResponse: false,
    rotation: [0, Math.PI, 0],
  }));

  const [removeGrass] = useStore((state) => [state.removeGrass]);

  const activeTexture = textures[`grass${textureID}Texture`];

  const handleRemove = (e) => {
    e.stopPropagation();
    const { x, y, z } = ref1.current.position;
    if (e.altKey) {
      removeGrass(x, y, z);
      return;
    }
  };

  return (
    <group
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onClick={(e) => handleRemove(e)}
    >
      <mesh ref={ref1}>
        <planeGeometry />
        <meshStandardMaterial
          color={isHovered ? "grey" : "white"}
          map={activeTexture}
          transparent={true}
          attach="material"
        />
      </mesh>
      <mesh ref={ref2}>
        <planeGeometry />
        <meshStandardMaterial
          color={isHovered ? "grey" : "white"}
          map={activeTexture}
          transparent={true}
          attach="material"
        />
      </mesh>
    </group>
  );
};

export default Grass;
