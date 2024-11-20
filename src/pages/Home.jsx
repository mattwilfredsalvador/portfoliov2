import { useState, useEffect, Suspense, useRef } from "react";
import { Canvas, extend } from "@react-three/fiber";
import Loader from "../components/Loader";
import Planet from "../models/Planet";
import Bird from "../models/Bird";
import Sky from "../models/Sky";
import Kriya from "../models/projects/Kriya"
import Fullsuite from "../models/projects/Fullsuite"
import Capstone from "../models/projects/Capstone"
import Internship from "../models/projects/Internship"
import Prediction from "../models/projects/Prediction"
import Training from "../models/projects/Training"
import Plane from "../models/Plane";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import fontToUse from "../assets/fonts/Rubik Iso_Regular.json";

extend({ TextGeometry });

import { OrbitControls } from "@react-three/drei";

const Home = () => {
  const font = new FontLoader().parse(fontToUse);
  const [isHovered, setIsHovered] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const nameRef = useRef()
  const portfolioRef = useRef()

  const aboutRef = useRef();

  const [currentStage, setCurrentStage] = useState(1);

  var option = "portfolio"



  const adjustPlanetForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      //screenScale = [0.9, 0.9, 0.9]
      screenScale = [11, 11, 11];
    } else {
      //screenScale = [1, 1, 1]
      screenScale = [16, 16, 16];
    }

    return [screenScale, screenPosition, rotation];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustNameLettersForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = 5;
      screenPosition = [-29.5, 17, -90];
    } else {
      screenScale = 8;
      screenPosition = [-46, 22, -90];
    }
    return [screenScale, screenPosition];
  };

  const adjustPortfolioLettersForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = 9;
      screenPosition = [-30, 10, -90];
    } else {
      screenScale = 15;
      screenPosition = [-47, 10, -90];
    }
    return [screenScale, screenPosition];
  };

  const adjustProjectsLettersForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = 4;
      screenPosition = [-12, -50, -50];
    } else {
      screenScale = 7;
      screenPosition = [-20, -50, -45];
    }
    return [screenScale, screenPosition];
  };

  const [planetScale, planetPosition, planetRotation] = adjustPlanetForScreenSize();
  //const [planeScale, planePosition] = adjustPlaneForScreenSize();
  const [nletterScale, nletterPosition] = adjustNameLettersForScreenSize();
  const [pletterScale, pletterPosition] = adjustPortfolioLettersForScreenSize();
  const [projLetterScale, projLetterPosition] = adjustProjectsLettersForScreenSize();

  return (
    <section className="w-full h-screen relative">

      {/* <div className="absolute bottom-0 right-0 z-10 flex items-center justify-center bg-red-500 font-xl text-white">
        Matt Wilfred Salvador
      </div> */}

      <Canvas
        onPointerMissed={() =>
          console.log("you clicked, but hit nothing at all")
        }
        className={`w-full h-screen bg-transparent ${
          isRotating ? `cursor-grabbing` : `cursor-grab`
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        {/* <OrbitControls minDistance={5} maxDistance={10} enableZoom={false}/> */}

        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={0.1} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={10}
          />

          <Planet
            scale={planetScale}
            position={planetPosition}
            rotation={planetRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            nameRef={nameRef}
            portfolioRef={portfolioRef}
          />

          <mesh
            ref={nameRef}
            onClick={() => console.log("you clicked me")}
            position={nletterPosition}
          >
            <textGeometry
              args={["matt's", { font, size: nletterScale, height: 1 }]}
            />
            <meshPhysicalMaterial attach="material" color={"white"} />
          </mesh>

          <mesh 
            ref={portfolioRef}
            position={pletterPosition}>
            <textGeometry
              args={[option, { font, size: pletterScale, height: 1 }]}
            />
            <meshPhysicalMaterial attach="material" color={"white"} />
          </mesh>

          <Bird 
            isRotating={isRotating} 
            isHovered={isHovered} 
            setIsHovered={setIsHovered} 
            nameRef={nameRef}
            portfolioRef={portfolioRef}
          />
          
          <Sky isRotating={isRotating} />

          <mesh
            position={projLetterPosition}
          >
            <textGeometry
              args={["projects", { font, size: projLetterScale, height: 0.5 }]}
            />
            <meshPhysicalMaterial attach="material" color={"white"} />
          </mesh>

          <Kriya />
          <Fullsuite />
          <Capstone />
          <Internship />
          <Training />
          <Prediction />

          {/* <Plane 
                scale={planeScale}
                position={planePosition}
                isRotating={isRotating}
                rotation={[0, 20, 0]}
                /> */}
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
