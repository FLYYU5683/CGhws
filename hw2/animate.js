import {camera,group,Last_P,clock} from "./init.js";
import {check_Collision,IsBCollision,IsCollision} from "./check_Collision.js";
import {update,pos,angle,reSetPower} from "./update.js";
import {render} from "./render.js";
import {makeRect} from "./makeRect.js";
import * as THREE from "https://threejs.org/build/three.module.js";
var backOnce = false;
(function() {
  Math.clamp = function(val,min,max){
    return Math.min(Math.max(val,min),max);
    
  }})();
function animate() {

  let Rect = makeRect();
  check_Collision(Rect);
	
  camera.position.copy(group.localToWorld(new THREE.Vector3(-60,20,5)));
  camera.lookAt(group.localToWorld(new THREE.Vector3(10,0,5)));

  if(IsCollision || IsBCollision){
    reSetPower();
	console.log("boom");
	if(!backOnce){
	  backOnce = true; 
	  pos.copy(Last_P);
	}
    group.position.copy(pos);
	//group.quaternion.copy(Last_Q);
    group.rotation.y = angle;
  }
  else{
    backOnce = false;
    Last_P.copy(group.position);
	//Last_Q.copy(group.quaternion);
	group.position.copy(pos);
    group.rotation.y = angle;	  	
  }
  
  var dt = clock.getDelta();
  update(dt);

  requestAnimationFrame(animate);
  render();
}
export{animate};