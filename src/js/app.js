/* Demo JS */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { gsap } from 'gsap';
import { DoubleSide, EquirectangularRefractionMapping } from 'three';
import { AnimationUtils } from 'three';

const canvas = document.querySelector('.canvas');

const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfefefe);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(-90, 140, 140);
orbit.autoRotate = true;
orbit.enableDamping = true;
orbit.dampingFactor = 0.5;
orbit.rotateSpeed = 0.5; 
orbit.autoRotateSpeed = 1;
orbit.maxDistance = 500;
orbit.minDistance = 50;

// Light
const ambientLight = new THREE.AmbientLight(0x333333);
const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(ambientLight, pointLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  '/images/stars.jpg',
  '/images/stars.jpg',
  '/images/stars.jpg',
  '/images/stars.jpg',
  '/images/stars.jpg',
  '/images/stars.jpg',
  
])

const loader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16,30,30);
const sunMat = new THREE.MeshBasicMaterial({map: loader.load('/images/sun.jpg')})
const sun = new THREE.Mesh(sunGeo, sunMat);

scene.add(sun);

function createPlanet(size,texture,position, ring){
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({map: loader.load(texture)})
  const mesh = new THREE.Mesh(geo, mat);
  
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if(ring){
    const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      map: loader.load(ring.texture),
      side: THREE.DoubleSide
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh)
    ringMesh.position.x = position
    ringMesh.rotation.x = ring.rotation * Math.PI;
  }
  scene.add(obj);
  mesh.position.x = position;

  return { mesh, obj}
}

const mercury = createPlanet(3.2, '/images/mercury.jpg', 28);
const venus = createPlanet(5.8, '/images/venus.jpg', 44);
const earth = createPlanet(6, '/images/earth.jpg', 62);
const mars = createPlanet(4, '/images/mars.jpg', 78);
const jupiter = createPlanet(12, '/images/jupiter.jpg', 100);
const saturn = createPlanet(10, '/images/saturn.jpg', 138, {
  innerRadius:11,
  outerRadius:20,
  texture: '/images/saturn-ring.png',
  rotation: -0.4
});
const uranus = createPlanet(7, '/images/uranus.jpg', 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: '/images/uranus-ring.png',
  rotation: 0.5
});
const neptune = createPlanet(7, '/images/neptune.jpg', 200);
const pluto = createPlanet(2.8, '/images/pluto.jpg', 216);



function animate() {
//Self-rotation
sun.rotateY(0.004);
mercury.mesh.rotateY(0.004);
venus.mesh.rotateY(0.002);
earth.mesh.rotateY(0.02);
mars.mesh.rotateY(0.018);
jupiter.mesh.rotateY(0.04);
saturn.mesh.rotateY(0.038);
uranus.mesh.rotateY(0.03);
neptune.mesh.rotateY(0.032);
pluto.mesh.rotateY(0.008);

//Around-sun-rotation
mercury.obj.rotateY(0.04);
venus.obj.rotateY(0.015);
earth.obj.rotateY(0.01);
mars.obj.rotateY(0.008);
jupiter.obj.rotateY(0.002);
saturn.obj.rotateY(0.0009);
uranus.obj.rotateY(0.0004);
neptune.obj.rotateY(0.0001);
pluto.obj.rotateY(0.00007);


  renderer.render(scene, camera);
  orbit.update();
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', resizeEvent);

function resizeEvent() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
