import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import {Candle} from "./Candle.js";
import {doPointerDown,onWindowResize,render} from "./method.js";
var camera, scene, renderer;
var candles = [];
var raycaster;
var mouseLoc;
function init() {
	
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
	renderer.setClearColor (0x888888);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0,30,150);
  let controls = new OrbitControls(camera, renderer.domElement);
  ////////////////////////////////////////////////////////////
  let floor = new THREE.Mesh(new THREE.PlaneGeometry(400,400),new THREE.MeshPhongMaterial());
  
  floor.rotation.x = - 1/2 * Math.PI;
  scene.add(floor);

  for(var k = 1,j = 1; k < 7; k++,j*=-1){
    candles.push(new Candle(k * j * 20 , k * j*20,(k-1)));
	}
	
  
    candles.forEach(function (b){ b.makeFlame();})
	
  	raycaster = new THREE.Raycaster();
	mouseLoc = new THREE.Vector2();
	document.addEventListener ('pointerdown', doPointerDown, false);

    //flameInterval = setInterval (a.textureAnimate.bine(this), 100);
    window.addEventListener('resize', onWindowResize, false);
  
  //flameInterval = setInterval (Candle[0].textureAnimate, 100);
}

function animate() {
  requestAnimationFrame(animate);
  render();
  // billboard
  // candle.lookAt (camera.position)  // does not work
  
  candles.forEach(function(b){b.flameMesh.lookAt(camera.position.x, 0, camera.position.z);});
  
}

export{camera, scene, renderer,mouseLoc,raycaster,candles};
export{init,animate};