import {camera,scene,renderer,mouseLoc,raycaster,candles} from "./main.js";
import {pickables} from "Candle.js";

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function doPointerDown (event) {
	event.preventDefault();
	
	mouseLoc.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouseLoc.y = -(event.clientY / window.innerHeight) * 2 + 1;
	
	raycaster.setFromCamera (mouseLoc, camera);
	var intersects = raycaster.intersectObjects (pickables);
	
	if (intersects.length > 0) {
	  if(intersects[0].object.name == "fire"){
	    switch(intersects[0].object.parent.name){
		  case 0:
		    intersects[0].object.parent.children[1].visible = false;
		    intersects[0].object.parent.children[2].visible = false;
		    candles[0].toReStartAgain();
			break;		  
		  case 1:
		    intersects[0].object.parent.children[1].visible = false;
		    intersects[0].object.parent.children[2].visible = false;
		    candles[1].toReStartAgain();
			break;		  
		  case 2:
		    intersects[0].object.parent.children[1].visible = false;
		    intersects[0].object.parent.children[2].visible = false;
		    candles[2].toReStartAgain();
			break;		  
	      case 3:
		    intersects[0].object.parent.children[1].visible = false;
		    intersects[0].object.parent.children[2].visible = false;
		    candles[3].toReStartAgain();
			break;		  
	      case 4:
		    intersects[0].object.parent.children[1].visible = false;
		    intersects[0].object.parent.children[2].visible = false;
		    candles[4].toReStartAgain();
			break;		  
	      case 5:
		    intersects[0].object.parent.children[1].visible = false;
		    intersects[0].object.parent.children[2].visible = false;
		    candles[5].toReStartAgain();
			break;		  
	      case 6:
		    intersects[0].object.parent.children[1].visible = false;
		    intersects[0].object.parent.children[2].visible = false;
		    candles[6].toReStartAgain();
			break;
		}		
	  }
	} else {
		console.log ('nothing picked...');
	  }  
	
}
export{doPointerDown,onWindowResize,render};