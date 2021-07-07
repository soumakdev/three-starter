import "./style.css"

import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Stats from "stats.js"
import * as Dat from "dat.gui"

// @ts-ignore
import vertexShader from "./shaders/vertex.glsl?raw"
// @ts-ignore
import fragmentShader from "./shaders/fragment.glsl?raw"

/**
 * Global variables
 */
const canvas = {
	width: window.innerWidth,
	height: window.innerHeight
}

/**
 * Dat Gui
 */
const gui = new Dat.GUI()
const guiProps = {}

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(80, canvas.width / canvas.height, 0.1, 1000)
camera.position.set(0, 0, 5)

/**
 * Demo Plane
 */
function addPlane() {
	const geometry = new THREE.PlaneGeometry(5, 5, 10, 10)
	const material = new THREE.ShaderMaterial({
		uniforms: {
			uTime: { value: 0.0 },
			uResolution: { value: new THREE.Vector2(canvas.width, canvas.height) }
		},
		vertexShader,
		fragmentShader,
		wireframe: true
	})
	const mesh = new THREE.Mesh(geometry, material)
	return mesh
}
const plane = addPlane()
scene.add(plane)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
renderer.physicallyCorrectLights = true
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(canvas.width, canvas.height)
const root = document.getElementById("app")
root.appendChild(renderer.domElement)

/**
 * Controls
 */
const orbit = new OrbitControls(camera, renderer.domElement)
orbit.enableDamping = true

/**
 * Stats
 */
const stats = new Stats()
root.appendChild(stats.dom)

/**
 * Animation loop
 */
const clock = new THREE.Clock()
function animate() {
	const elapsedTime = clock.getElapsedTime()
	plane.material.uniforms.uTime.value = elapsedTime

	stats.update()
	orbit.update()
	renderer.render(scene, camera)
	window.requestAnimationFrame(animate)
}
animate()

/**
 * Resize window
 */
function onResize() {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	camera.aspect = canvas.width / canvas.height
	camera.updateProjectionMatrix()

	renderer.setSize(canvas.width, canvas.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}
window.addEventListener("resize", onResize)
