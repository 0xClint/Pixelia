import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import * as THREE from "three";
import { useKeyboard } from "../hooks/useKeyboard";
import Axe from "./Axe";

const JUMP_FORCE = 4;
const SPEED = 4;

const Player = () => {
  const { moveBackward, moveForward, moveRight, moveLeft, jump } =
    useKeyboard();

  const axe = useRef();
  const { camera } = useThree();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [5, 5, 5],
  }));

  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  const pos = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);

  useFrame((state) => {
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );

    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );

    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    const rotation = new THREE.Vector3();
    const speed = new THREE.Vector3();
    speed.fromArray(vel.current);
    axe.current.children[0].rotation.x = THREE.MathUtils.lerp(
      axe.current.children[0].rotation.x,
      Math.sin((speed.length() > 1) * state.clock.elapsedTime * 10) / 6,
      0.1
    );
    axe.current.rotation.copy(camera.rotation);
    axe.current.position
      .copy(camera.position)
      .add(camera.getWorldDirection(rotation).multiplyScalar(1));

    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
  });

  return (
    <>
      <mesh ref={ref} />
      <group
        ref={axe}
        onPointerMissed={(e) => (axe.current.children[0].rotation.x = -0.5)}
      >
        <Axe position={[0.3, -0.5, 0.5]} />
      </group>
    </>
  );
};

export default Player;
