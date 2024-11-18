import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import React from "react";
import birdScene from "../assets/3d/low-poly_falling_astronaut_-_3december.glb";
//import birdScene from "../assets/3d/meteor-m2_no.2.glb"
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";


const Bird = ({ isRotating, isHovered, setIsHovered }) => {
  const birdRef = useRef();
  // const [isHovered, setIsHovered] = useState(false)

  const navigate = useNavigate();
  //   const renderer = new THREE.WebGLRenderer();
  //   const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
  //   const canvas = gl.domElement
  const { gl, viewport, camera } = useThree();

  // Load the 3D model and animations from the provided GLTF file
  const { scene, animations } = useGLTF(birdScene);

  // Get access to the animations for the bird
  const { actions } = useAnimations(animations, birdRef);

  // Play the "Take 001" animation when the component mounts
  // Note: Animation names can be found on the Sketchfab website where the 3D model is hosted.

  // useEffect(() => {
  //   actions["Armature|Armature|mixamo.com|Layer0"].play();
  // }, []);


  useFrame((_, delta) => {
    if(isRotating){
      birdRef.current.rotation.y += 0.15 * delta
    }
  })
  

  const handleOnHover = () => {
    setIsHovered(true)
    actions["Armature|Armature|mixamo.com|Layer0"].stop();
    // aboutRef.current.position.x = [-67]
  }

  const handleOnLeave = () => {
    setIsHovered(false)
    actions["Armature|Armature|mixamo.com|Layer0"].play();
  }

  useFrame(({ clock, camera }) => {
    // Update the Y position to simulate bird-like motion using a sine wave
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    // Check if the bird reached a certain endpoint relative to the camera
    if (birdRef.current.position.x > camera.position.x + 10) {
      // Change direction to backward and rotate the bird 180 degrees on the y-axis
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10) {
      // Change direction to forward and reset the bird's rotation
      birdRef.current.rotation.y = 0;
    }

    // Update the X and Z positions based on the direction
    if (birdRef.current.rotation.y === 0) {
      // Moving forward
      birdRef.current.position.x += 0.01;
      birdRef.current.position.z -= 0.01;
    } else {
      // Moving backward
      birdRef.current.position.x -= 0.01;
      birdRef.current.position.z += 0.01;
    }

    if (isHovered){

      //camera.lookAt(50,50,0);
      // camera.updateProjectionMatrix();
      // camera.position.set(10,50,50)

      // const targetfov = 70
      // const targetx = 22

      const targetfov = 70
      const targetx = 23

      if (camera.fov > targetfov || camera.position.x < targetx){
        camera.fov -= 0.3;
        camera.position.x += 0.3
        camera.updateProjectionMatrix();
      }
    }
    // else {
    //   const basefov = 7
    //   const basex = 5

    //   if (camera.fov < basefov && camera.position.x > basex){
    //     camera.fov += 0.5;
    //     camera.position.x -= 0.1;
    //     camera.updateProjectionMatrix();
    //   }
    // }
    
  });

  return (
    // to create and display 3D objects
    //   <mesh ref={birdRef} position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]}>
    <mesh
      ref={birdRef}
      position={[-Math.PI / 1, 2, 1]}
      scale={[0.5, 0.5, 0.5]}
      onClick={() => {
        console.log("hello")
        // navigate("/projects")
      }}
      onPointerDown={handleOnHover}
      //onPointerOver={handleOnHover}
      onPointerLeave={handleOnLeave}
    >
      <primitive object={scene} />
    </mesh>
  );
};

export default Bird;
