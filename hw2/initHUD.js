import * as THREE from "https://threejs.org/build/three.module.js";


  var cameraHUD2;
function initHUD() {
  // sceneHUD: a simple line boundary
  cameraHUD2 = new THREE.OrthographicCamera(-200,200,200,-200,-400,400);
  cameraHUD2.position.set (0,30,0);
  cameraHUD2.up.set (0,0,-1)   // for top view
  cameraHUD2.lookAt (new THREE.Vector3())
}
export {initHUD,cameraHUD2};