import React from "react";
import { usePlane } from "@react-three/cannon";
import * as textures from "../images/flowers/textures";

const Plane = ({ position, textureID }) => {
  const [ref1] = usePlane(() => ({
    position: [1, 0, 1],
    args: [20, 20],
    collisionResponse: false,
  }));
  const [ref2] = usePlane(() => ({
    position: [1, 0, 1],
    args: [20, 20],
    collisionResponse: false,
    rotation: [0, Math.PI, 0],
  }));
  console.log(textures.flower1Texture);

  const activeTexture = textures[`flower${3}Texture`];

  return (
    <>
      <mesh ref={ref1}>
        <planeGeometry />
        <meshStandardMaterial map={activeTexture} transparent={true} />
      </mesh>
      <mesh ref={ref2}>
        <planeGeometry />
        <meshStandardMaterial map={activeTexture} transparent={true} />
      </mesh>
    </>
  );
};

export default Plane;
