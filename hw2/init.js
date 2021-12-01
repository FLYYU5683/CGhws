import * as THREE from "https://threejs.org/build/three.module.js";
import {initHUD} from "./initHUD.js";
var obstacle = [];
var group = new THREE.Group();
var camera, scene, renderer;
var clock;
var Last_P,Last_Q;
function init() {
  Last_P = new THREE.Vector3();
  Last_Q = new THREE.Quaternion();
  
  clock = new THREE.Clock();
	
  scene = new THREE.Scene();
  var light = new THREE.PointLight( 0xffffff, 1, 300 );
  light.position.set( 70, 50, 70 );
  scene.add( light );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x888888);
  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);

  camera.position.set(-60,20,5);
  
  ////////////////////////////////////////////////////////////////
  var gridXZ = new THREE.GridHelper(400, 20, 'red', 'white');
  scene.add(gridXZ);
  
  var shape = new THREE.Shape();
  shape.moveTo( 0,0 );
  shape.lineTo(10,0);
  shape.lineTo(10,5);
  shape.lineTo(7.5,10);
  shape.lineTo(0,10);
  shape.lineTo(0,0);



  var extrudeSettings = {
	steps: 1,
	depth: 10,
	bevelEnabled: true,
	bevelThickness: 0,
	bevelSize: 0,
	bevelOffset: 0,
	bevelSegments: 1
};

var carHead = new THREE.Mesh( new THREE.ExtrudeGeometry( shape, extrudeSettings ), new THREE.MeshPhongMaterial());
var carBody = new THREE.Mesh( new THREE.BoxGeometry( 20, 8, 10 ), new THREE.MeshPhongMaterial());
carBody.position.set(-10,4,5);

var tireFL = new THREE.Mesh(new THREE.CylinderGeometry( 2, 2, 2, 64 ),new THREE.MeshPhongMaterial( {color: 0xffff00}));
tireFL.rotation.x = Math.PI/2;
tireFL.position.set(5,0,0.999);

var tireFR = new THREE.Mesh(new THREE.CylinderGeometry( 2, 2, 2, 64 ),new THREE.MeshPhongMaterial( {color: 0xffff00}));
tireFR.rotation.x = Math.PI/2;
tireFR.position.set(5,0,9.001);

var tireBL = new THREE.Mesh(new THREE.CylinderGeometry( 2, 2, 2, 64 ),new THREE.MeshPhongMaterial( {color: 0xffff00}));
tireBL.rotation.x = Math.PI/2;
tireBL.position.set(-15,0,0.999);

var tireBR = new THREE.Mesh(new THREE.CylinderGeometry( 2, 2, 2, 64 ),new THREE.MeshPhongMaterial( {color: 0xffff00}));
tireBR.rotation.x = Math.PI/2;
tireBR.position.set(-15,0,9.001);

group.add(carHead,carBody,tireFL,tireFR,tireBL,tireBR);
scene.add(group);
group.position.set(20,2,0);


var obstacle1 = new THREE.Mesh(new THREE.CylinderGeometry( 20, 20, 40, 32 ),new THREE.MeshPhongMaterial( {color: 0xffff00} ));
obstacle1.position.set(20,20,80);
var obstacle2 = new THREE.Mesh(new THREE.CylinderGeometry( 5, 5, 40, 32 ),new THREE.MeshPhongMaterial( {color: 0xffff00} ));
obstacle2.position.set(-90,20,20);
var obstacle3 = new THREE.Mesh(new THREE.CylinderGeometry( 15, 15, 40, 32 ),new THREE.MeshPhongMaterial( {color: 0xffff00} ));
obstacle3.position.set(100,20,-20);
var obstacle4 = new THREE.Mesh(new THREE.CylinderGeometry( 10, 10, 40, 32 ),new THREE.MeshPhongMaterial( {color: 0xffff00} ));
obstacle4.position.set(-70,20,-20);
var obstacle5 = new THREE.Mesh(new THREE.CylinderGeometry( 1, 1, 40, 32 ),new THREE.MeshPhongMaterial( {color: 0xffff00} ));
obstacle5.position.set(70,20,-60);
obstacle[0] = obstacle1;
obstacle[1] = obstacle2;
obstacle[2] = obstacle3;
obstacle[3] = obstacle4;
obstacle[4] = obstacle5;
scene.add(obstacle1,obstacle2,obstacle3,obstacle4,obstacle5);

  
  initHUD();
  renderer.autoClear = false;

}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
export{obstacle,group,camera, scene, renderer,clock,Last_P,Last_Q};
export{init};