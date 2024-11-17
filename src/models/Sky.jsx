import React, {useRef, useEffect} from 'react'
import {useGLTF} from '@react-three/drei'
//import skyScene from '../assets/3d/sky.glb'
import skyScene from '../assets/3d/free_-_skybox_space_nebula.glb'
//import skyScene from '../assets/3d/ship_in_clouds.glb'
import { useFrame } from '@react-three/fiber'

const Sky = ({isRotating}) => {
  const skyRef = useRef()
  const sky = useGLTF(skyScene)

  useFrame((_, delta) => {
    // if(isRotating){
      //skyRef.current.rotation.y += 0.15 * delta
      skyRef.current.rotation.y += 0.10 * delta
    // }
  })

  useFrame((_, delta) => {
    if(isRotating){
      skyRef.current.rotation.y += 0.15 * delta
    }
  })

  // useEffect(() => {
  //   skyRef.current.rotation.y += 0.20
  // }, []);

  return (
    <mesh ref={skyRef} scale={1.5}> 
        <primitive object={sky.scene}/>
    </mesh>
  )
}

export default Sky