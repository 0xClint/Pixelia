import React from "react";
import { useFrame } from "@react-three/fiber";

const Cloud = ({ position, scale }) => {
  const cloudRef = React.useRef();

  useFrame(() => {
    if (cloudRef.current) {
      cloudRef.current.position.x -= 0.01; // Move the cloud horizontally
    }
  });

  return (
    <mesh ref={cloudRef} position={position} scale={scale}>
      <sphereBufferGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={0xEFF5FF} />
    </mesh>
  );
};

const Clouds = () => {
  return (
    <group>
      <Cloud position={[0, 30, -50]} scale={[5, 5, 5]} />
      <Cloud position={[10, 25, -30]} scale={[4, 4, 4]} />
      <Cloud position={[-15,35 , -40]} scale={[3, 3, 3]} />
    </group>
  );
};

export default Clouds;
