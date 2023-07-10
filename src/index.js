import './style.css'
import {
    AmbientLight,
    AxesHelper,
    DirectionalLight,
    GridHelper,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
  } from "three";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


  const scene = new Scene();

  const size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const aspect = size.width / size.height;
  const camera = new PerspectiveCamera(75, aspect);
  camera.position.z = 15;
  camera.position.y = 13;
  camera.position.x = 8;

  const lightColor = 0xffffff;

  const ambientLight = new AmbientLight(lightColor, 0.5);
  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(lightColor, 1);
  directionalLight.position.set(0, 10, 0);
  directionalLight.target.position.set(-5, 0, 0);
  scene.add(directionalLight);
  scene.add(directionalLight.target);

  const threeCanvas = document.getElementById("three-canvas");
  const renderer = new WebGLRenderer({
      canvas: threeCanvas,
      alpha: true
  });

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const grid = new GridHelper(50, 30);
  scene.add(grid);

  const axes = new AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  scene.add(axes);

  const controls = new OrbitControls(camera, threeCanvas);
  controls.enableDamping = true;
  controls.target.set(-2, 0, 0);

  const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  let geometry = new THREE.BoxGeometry(10, 10, 1);
  let material = new THREE.MeshBasicMaterial({color: 0x808080});
  let wall = new THREE.Mesh(geometry, material);
  scene.add(wall);
  wall.position.y = 5;

  window.addEventListener("resize", () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
  });