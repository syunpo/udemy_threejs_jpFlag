import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shaders/vertexShader";
import flagmentShader from "./shaders/fragmentShader";
import * as dat from "lil-gui";
import jpFlag from "./textures/jp-flag.png";

//デバッグ
const gui = new dat.GUI({width: 300});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const flagTexture = textureLoader.load(jpFlag);

// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

// Material
// const material = new THREE.RawShaderMaterial({
//   vertexShader: vertexShader,
//   fragmentShader: flagmentShader,
//   transparent: true,
//   side: THREE.DoubleSide,
//   // wireframe: true,
// });

const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: flagmentShader,
  transparent: true,
  side: THREE.DoubleSide,
  // wireframe: true,
  uniforms: {
    uFrequency: {value: new THREE.Vector2(10, 5)}, 
    uTime: {value: 0},
    uColor: {value: new THREE.Color("pink")},
    uTexture: {value: flagTexture},
  },
});

//デバッグを追加
gui
 .add(material.uniforms.uFrequency.value, "x")
 .min(0)
 .max(20)
 .step(0.001)
 .name("frequencyX");
 gui
 .add(material.uniforms.uFrequency.value, "y")
 .min(0)
 .max(20)
 .step(0.001)
 .name("frequencyY");

// Mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.scale.y = 2/ 3;
scene.add(mesh);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0.25, -0.25, 1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const animate = () => {
  //時間取得
  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime);
  material.uniforms.uTime.value = elapsedTime;

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
