import { OrbitControls } from '@react-three/drei'
import { useGLTF, useTexture, Center, Sparkles, shaderMaterial } from '@react-three/drei'
import portalVertexShader from "./shaders/portal/vertex.glsl"
import portalFragmentShader from "./shaders/portal/fragment.glsl"
import * as THREE from "three"
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color("#a3e7ff"),
        uColorEnd: new THREE.Color("#ffffff"),
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial: PortalMaterial }) 

export default function Experience() {

    const sceneModel = useGLTF("./model/portal.glb")

    const bakedTextures = useTexture("./model/baked.jpg")
    bakedTextures.flipY = false

    const portalMaterial = useRef()

    useFrame((state, delta) => {
        portalMaterial.current.uTime += delta
    } )

    return <>

        <color args={["#030202"]} attach="background" />

        <OrbitControls makeDefault />

        <Center>
            <mesh geometry={sceneModel.nodes.Baked.geometry}>
                <meshBasicMaterial map={bakedTextures} />
            </mesh>

            <mesh 
            geometry={sceneModel.nodes.Circle.geometry} 
            position={sceneModel.nodes.Circle.position}
            rotation={sceneModel.nodes.Circle.rotation}
            > 

               <portalMaterial ref= { portalMaterial }/>

            </mesh>

            <mesh 
            geometry={sceneModel.nodes.LampInsides.geometry} 
            position={sceneModel.nodes.LampInsides.position}
            rotation={sceneModel.nodes.LampInsides.rotation}
            />

            <mesh 
            geometry={sceneModel.nodes.LampInsides001.geometry} 
            position={sceneModel.nodes.LampInsides001.position}
            rotation={sceneModel.nodes.LampInsides001.rotation}
            />

            <Sparkles 
                size={ 3 }
                scale={ [4, 2, 4] }
                position-y={ 1 }
                speed={ 0.5 }
                count={ 30 }
            />

        </Center>
    </>
}