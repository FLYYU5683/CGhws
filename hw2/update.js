import * as THREE from "https://threejs.org/build/three.module.js";
import {IsCollision,IsBCollision} from "./check_Collision.js";
import {temp} from "./animate.js";
var keyboard = new KeyboardState();
var pos = new THREE.Vector3();
var vel = new THREE.Vector3();
var force = new THREE.Vector3();
var power = 0;
var angle = 0;
var back = false;
var col = false

function update(dt) {
  keyboard.update();
  
  if (vel.length() > 0) {
    angle = 1.5 * Math.PI + Math.atan2(vel.x, vel.z); 
  }
  /*
  if(col){
	  angle = temp;
	  col = false;
  }
  */

  if (keyboard.pressed("space") && !back)  
 	  power = 0.1;
  if (keyboard.pressed("space") && back)
	  power = -0.1;
  if (keyboard.pressed("up")) 
    if(IsCollision)
	  power = 0;
	else
 	  power += 1.2;        
  if (keyboard.pressed("down")) 
    if(IsBCollision)
	  power = 0;
	else
 	  power -= 1.2;   
 
  power = Math.clamp (power, -160.0, 160.0);
  
  if(power > 0) back = false;
  else back = true;
  
  var angle_thrust = angle;
  if (keyboard.pressed("left"))
    angle_thrust += 0.5;
  if (keyboard.pressed("right"))
    angle_thrust -= 0.5;
   
  // compute force

    var thrust = new THREE.Vector3(1,0,0).multiplyScalar(Math.abs(power)).applyAxisAngle(new THREE.Vector3(0,1,0), angle_thrust);
    force.copy (thrust);
    force.add(vel.clone().multiplyScalar(-2))
	
	if(power < 0){
      vel.add(force.clone().multiplyScalar(dt));
	  pos.add(vel.clone().multiplyScalar(-1).multiplyScalar(dt));
	}
	else if (power == 0){
	  vel.add(force.clone().multiplyScalar(dt));
	  pos.add(vel.clone().multiplyScalar(0).multiplyScalar(dt));
	}
	else{
      vel.add(force.clone().multiplyScalar(dt));
	  pos.add(vel.clone().multiplyScalar(dt));
	}
	pos.y = 2;
}
function reSetPower(){
	power = 0;
}
function setCol(){
  col = true;	
}
export{reSetPower,update,pos,power,angle,setCol};