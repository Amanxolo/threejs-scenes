import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//Setting the Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff) // Changes the background color of the scene
//Setting the camera, window.inner function sets the camera aspect ratio according to window size and resizes by using the callback function onWindowresize declared below
const camera1 = new THREE.PerspectiveCamera(
    70, //vertical field of view of the frustum renderer
    200/200,//window.innerWidth / window.innerHeight, aspect ration : 1 for a box if 200/100 then the width of the camera aspect increases and box looks stretched in width and same for height
    0.1,//near plane --See doc-- anything before near plane is clipped by renderer
    1000//far plane --See doc-- anything after the far plane is clipped by renderer
    //Only the frustum between the near and far plane is shown by renderer
)
camera1.position.z = 2


//Second kind of camera
const camera2 = new THREE.OrthographicCamera(-2,2,2,-2)//parameters -- left,right,top,bottom
//far and near plane dimensions are always the same
camera2.position.z = 3

//Setting the canvas
const canvas1 = document.getElementById("c1") as HTMLCanvasElement
const canvas2 = document.getElementById("c2") as HTMLCanvasElement
const canvas3 = document.getElementById("c3") as HTMLCanvasElement
const canvas4 = document.getElementById("c4") as HTMLCanvasElement

const renderer1 = new THREE.WebGLRenderer({canvas:canvas1})
renderer1.setSize(200, 200) //Hardcoded value--not adapting to window size but remains 200/200 which are canvas dimensions on resizing too
//document.body.appendChild(renderer.domElement) //The canvas element is not in the html file but is added by bundle.js which is appended here as renderer
const renderer2 = new THREE.WebGLRenderer({canvas:canvas2})
renderer2.setSize(200, 200)
const renderer3 = new THREE.WebGLRenderer({canvas:canvas3})
renderer3.setSize(200, 200)
const renderer4 = new THREE.WebGLRenderer({canvas:canvas4})
renderer4.setSize(200, 200)

new OrbitControls(camera1, renderer1.domElement)

const geometry = new THREE.TorusKnotGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
cube.scale.x=0.5
cube.scale.y=0.5
cube.scale.z=0.5
scene.add(cube)

// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    render()
}

function render() {
    renderer1.render(scene, camera1)
    renderer2.render(scene, camera2)
    renderer3.render(scene, camera1)
    renderer4.render(scene, camera1)

}

animate()