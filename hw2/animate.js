import {camera,group,Last_P,Last_Q,clock} from "./init.js";
import {check_Collision,IsBCollision,IsCollision} from "./check_Collision.js";
import {update,pos,angle,reSetPower,setCol} from "./update.js";
import {render} from "./render.js";
import {makeRect} from "./makeRect.js";
import * as THREE from "https://threejs.org/build/three.module.js";
var backOnce = false;
var temp;
(function() {
  Math.clamp = function(val,min,max){
    return Math.min(Math.max(val,min),max);
    
  }})();
function animate() {

  let Rect = makeRect();
  check_Collision(Rect);
	
  camera.position.copy(group.localToWorld(new THREE.Vector3(-60,20,5)));
  camera.lookAt(group.localToWorld(new THREE.Vector3(10,0,5)));

  //console.log(temp,angle);
	console.log(`現在的(${group.quaternion.x},${group.quaternion.y},${group.quaternion.z})`);
	console.log(`上一幀(${Last_Q.x},${Last_Q.y},${Last_Q.z})`);
  if(IsCollision || IsBCollision){
	console.log("撞到了-------------------------------------------");
    reSetPower();
	/*if(!backOnce){
	  backOnce = true; 
	}
	*/
	  pos.copy(Last_P);
      group.position.copy(pos);
	  group.quaternion.copy(Last_Q);
	  //setCol();
      group.rotation.y = angle;
  }
  else{
	console.log("還沒有撞到-------------------------------------------");
    backOnce = false;
    Last_P.copy(group.position);
	Last_Q.copy(group.quaternion);
	group.position.copy(pos);
    group.rotation.y = angle;
    //temp = angle;	
  }
  
  var dt = clock.getDelta();
  update(dt);

  requestAnimationFrame(animate);
  render();
}
export{animate,temp};