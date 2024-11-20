import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import React from "react";
import birdScene from "../assets/3d/low-poly_falling_astronaut_-_3december.glb";
//import birdScene from "../assets/3d/meteor-m2_no.2.glb"
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import * as THREE from "three"


const Bird = ({ isRotating, isHovered, setIsHovered, nameRef, portfolioRef }) => {
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

  var startRotation = new THREE.Quaternion();
  var targetRotation = new THREE.Quaternion();
  var renderer = new THREE.WebGLRenderer();

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

      camera.position.lerp(new THREE.Vector3(0, -80, 5), 0.01)
    }
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
