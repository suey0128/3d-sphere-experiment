import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading - load the normal map for the material (skin)
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('./texture/NormalMap.png')

// Debug - the controls on top right of the screen
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials - the skin of the obj
// const material = new THREE.MeshBasicMaterial()
// material.color = new THREE.Color(0xff0000)

// const material = new THREE.MeshStandardMaterial({
//     //you can define the argument here 
// })
const material = new THREE.MeshStandardMaterial()
//the argument that put to material
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture
material.color = new THREE.Color(0x292929)


// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

// Light 1
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Light 2
const pointLight2 = new THREE.PointLight(0xff0000, 0.1)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
pointLight2.position.set(-2.25,1,-0.28)
pointLight2.intensity = 1
scene.add(pointLight2)


// Light 3
//HOW TO ADD LIGHT
// 1) create the light
const pointLight3 = new THREE.PointLight(0xa4ff, 0.1)
// 2) set all the artribute of the light
pointLight3.position.set(0.48,-0.35,0.24)
pointLight3.intensity = 5.18
// 3) add the light to the Scene
scene.add(pointLight3)
// 4) use gui and pointLightHelper to test the attrubutes and change above numbers
    //by adding gui to pointLight2 and set what you want to debug, you'd see it on the top right.
    //you can left click the textfield and drag up or down to control the numbers
    //of you specify the min and max, the textfield will become a slider
// gui.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
// gui.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
// gui.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
// gui.add(pointLight3, 'intensity').min(0).max(10).step(0.01)
    // you can group it into folder by 
    // const light3 = gui.addFolder('Light 2')
    // light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)

    //experiment colors
// const light3Color = {
//     color: 0x0000FF
// }

// gui.addColor(light3Color, 'color')
//     .onChange(()=> {
//         pointLight3.color.set(light3Color.color)
//     })

        //pointerLightHelper => the 2nd parameter is the scale of the helper
// const pointLightHelper = new THREE.PointLightHelper(pointLight3,1)
// scene.add(pointLightHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    //make the background transparent
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

// the sphere changes when mouse move
let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth /2;
const windowHalfY = window.innerHeight /2

const onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

document.addEventListener('mousemove', onDocumentMouseMove)

// add eventlistener make the sphere change when scroll
const onDocumentScroll = (event) => {
    sphere.position.y = window.scrollY * .001
}


document.addEventListener('scroll', onDocumentScroll)


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()