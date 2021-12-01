import * as THREE from "https://threejs.org/build/three.module.js";
import {group} from "./init.js";

function makeRect() {
	let Rect = {};
    Rect.max = group.localToWorld ( new THREE.Vector3(10, 0, 10) );
    Rect.min = group.localToWorld ( new THREE.Vector3(-20, 0,0) );
    Rect.px = group.localToWorld ( new THREE.Vector3(1,0,0)).sub (group.position);
    return Rect;
}
export {makeRect};