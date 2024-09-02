import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky, PerspectiveCamera } from "@react-three/drei";
import { RecoilRoot } from "recoil";

function House() {
  return (
    <group position={[0, 0.5, -5]}>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4, 2.5, 4]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>

      <mesh position={[0, 3, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[3.5, 2, 4]} />
        <meshStandardMaterial color="darkred" />
      </mesh>

      <mesh position={[-2, 1.0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>

      <mesh position={[2, 1.0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>

      <mesh position={[0, 0.75, 2.01]}>
        <boxGeometry args={[1, 1.5, 0.1]} />
        <meshStandardMaterial color="saddlebrown" />
      </mesh>

      <mesh position={[-1.5, 3.0, -1]}>
        <boxGeometry args={[0.8, 1.2, 0.8]} />
        <meshStandardMaterial color="darkgray" />
      </mesh>
    </group>
  );
}

function MovableBox() {
  const [position, setPosition] = useState([0, 0.5, 0]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setPosition((prev) => [prev[0], prev[1], prev[2] - 0.1]);
          break;
        case "ArrowDown":
          setPosition((prev) => [prev[0], prev[1], prev[2] + 0.1]);
          break;
        case "ArrowLeft":
          setPosition((prev) => [prev[0] - 0.1, prev[1], prev[2]]);
          break;
        case "ArrowRight":
          setPosition((prev) => [prev[0] + 0.1, prev[1], prev[2]]);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

function Tree({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.5, 2, 8]} />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.5]} />
        <meshStandardMaterial color="brown" />
      </mesh>
    </group>
  );
}

function Road() {
  return (
    <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, Math.PI, 0]}>
      <planeGeometry args={[10, 100]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

function NightSky() {
  return (
    <Sky
      distance={450000}
      sunPosition={[0, 1, 0]}
      inclination={0.6}
      azimuth={0.25}
    />
  );
}

function CameraRig() {
  const boxRef = useRef();
  const cameraRef = useRef();

  useFrame(() => {
    if (boxRef.current && cameraRef.current) {
      // Update the camera position to follow the box
      cameraRef.current.position.set(
        boxRef.current.position.x,
        boxRef.current.position.y + 5,
        boxRef.current.position.z + 10
      );
      cameraRef.current.lookAt(boxRef.current.position);
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={75}
        near={0.1}
        far={1000}
      />
      <MovableBox ref={boxRef} />
    </>
  );
}

const Camara = () => {
  const cameraRef = useRef();

  const [position, setPosition] = useState([0, 5, 5]);
  const [positionBox, setPositionBox] = useState([0, 0, 0]);

  // useFrame(() => {
  //   cameraRef.current.lookAt(position);
  // });

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          setPosition((prev) => [prev[0], prev[1], prev[2] - 0.1]);
          setPositionBox((prev) => [prev[0], prev[1], prev[2] - 0.1]);
          break;
        case "ArrowDown":
          setPosition((prev) => [prev[0], prev[1], prev[2] + 0.1]);
          setPositionBox((prev) => [prev[0], prev[1], prev[2] + 0.1]);
          break;
        case "ArrowLeft":
          setPosition((prev) => [prev[0] - 0.1, prev[1], prev[2]]);
          setPositionBox((prev) => [prev[0] - 0.1, prev[1], prev[2]]);
          break;
        case "ArrowRight":
          setPosition((prev) => [prev[0] + 0.1, prev[1], prev[2]]);
          setPositionBox((prev) => [prev[0] + 0.1, prev[1], prev[2]]);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={position} // Set the camera position
        fov={75} // Field of view
        near={0.1} // Near clipping plane
        far={1000} // Far clipping plane
      />
    </>
  );
};

function App() {
  return (
    <Canvas style={{ background: "black", height: "100vh", width: "100vw" }}>
      <RecoilRoot>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <NightSky />
        <Camara />
        <MovableBox />
        <House />
        <Road />
        <Tree position={[-4, 0, -3]} />
        <Tree position={[3, 0, 2]} />
        <Tree position={[3, 0, -6]} />
        <OrbitControls />
      </RecoilRoot>
    </Canvas>
  );
}

export default App;
