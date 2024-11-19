import React, {useRef, useEffect} from 'react'
import {useGLTF} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { a } from "@react-spring/three"

import * as THREE from "three"

import textureImage from "../../assets/images/kriya.png"

const Kriya = ({...props}) => {
  const tabletRef = useRef()
  // const { nodes, materials} = useGLTF(tabletScene)
  const texture = new THREE.TextureLoader().load(textureImage);
  texture.encoding = THREE.sRGBEncoding;
  texture.colorSpace = THREE.SRGBColorSpace;
  //const material = new THREE.MeshBasicMaterial( { map: texture } );

  const geometry = new THREE.BoxGeometry( 1.5, 1, 0.05);
  const material = new THREE.MeshPhongMaterial( {map: texture, side: THREE.FrontSide });
  material.toneMapped = false
  const plane = new THREE.Mesh( geometry, material );

  useFrame((_, delta) => {
    tabletRef.current.rotation.y += 0.30 * delta
    tabletRef.current.rotation.z += 0.05 * delta
 })

  return ( 
    <mesh
      ref={tabletRef}
      material={material}
      scale={2}
      position={[24, 0, -10]}
    >
      <primitive object={plane} />
    </mesh>
  )
}

export default Kriya