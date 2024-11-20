import React, {useRef, useEffect, useState} from 'react'
import {useGLTF} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { a } from "@react-spring/three"

import * as THREE from "three"

import textureImage from "../../assets/images/wp-training.gif"

const Training = ( {isVisible, setIsVisible, ...props}) => {
  const [isClicked, setIsClicked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const tabletRef = useRef()
  // const { nodes, materials} = useGLTF(tabletScene)
  const texture = new THREE.TextureLoader().load(textureImage);
  texture.encoding = THREE.sRGBEncoding;
  texture.colorSpace = THREE.SRGBColorSpace;
  //const material = new THREE.MeshBasicMaterial( { map: texture } );

  const geometry = new THREE.BoxGeometry( 1.5, 1, 0.05);
  const material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.FrontSide} );
  material.toneMapped = false
  const plane = new THREE.Mesh( geometry, material );

  // useFrame((_, delta) => {
  //     tabletRef.current.rotation.x += 0.30 * delta  
  // })

  useFrame((_, delta) => {
    if (isHovered){
      tabletRef.current.position.lerp(new THREE.Vector3(-10, -78, -37), 0.1)
    } else if(!isHovered){
      tabletRef.current.rotation.x += 0.15 * delta
      tabletRef.current.rotation.y += 0.1 * delta
      tabletRef.current.position.lerp(new THREE.Vector3(-10, -80, -40), 0.1)
    }

    // if (isClicked){
    //   //tabletRef.current.position.lerp(new THREE.Vector3(3, -73, -5), 0.1)
    //   //tabletRef.current.position.lerp(new THREE.Vector3(3, -73, -5), 0.1)
    //   // tabletRef.current.rotation.y = 0
    // }
  })
  
  const handleOnHover = () => {
    setIsHovered(true)
    tabletRef.current.rotation.x = 0
    tabletRef.current.rotation.y = 0
    setIsVisible(true)
  }

  const handleOnLeave = () => {
    setIsHovered(false)
    setIsVisible(false)
  }

  const handleOnClick = () => {
    setIsClicked(true)
    //setIsVisible(true)
  }

  return ( 
    <mesh
      ref={tabletRef}
      material={material}
      scale={7}
      //position={[-40, -60, -40]}
      onPointerOver={handleOnHover}
      onPointerLeave={handleOnLeave}
      onPointerDown={handleOnClick}
    >
      <primitive object={plane} />
    </mesh>
  )
}

export default Training