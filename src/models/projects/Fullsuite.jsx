import React, {useRef, useEffect, useState} from 'react'
import {useGLTF} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { a } from "@react-spring/three"

import * as THREE from "three"

import textureImage from "../../assets/images/fullsuite.png"

const Fullsuite = ({...props}) => {
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

 const handleOnHover = () => {
  setIsHovered(true)
 }

  return ( 
    <mesh
      ref={tabletRef}
      material={material}
      scale={10}
      position={[-28, -100, -50]}
    >
      <primitive object={plane} />
    </mesh>
  )
}

export default Fullsuite