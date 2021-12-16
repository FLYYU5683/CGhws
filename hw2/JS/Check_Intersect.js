import * as THREE from "https://threejs.org/build/three.module.js";

function Check_Intersect(Rect, C, Rad) {
	const Rad2 = Rad * Rad;
  
  let xHat = Rect.px;
  let zHat = xHat.clone().cross (new THREE.Vector3(0,1,0)).normalize();
  
  let R = {max:{x:0, z:0}, min:{x:0, z:0}};
  let cp = Rect.max.clone().sub (C.position);   
  R.max.x = cp.dot (xHat), R.max.z = cp.dot (zHat);
  
	cp = Rect.min.clone().sub (C.position);
  R.min.x = cp.dot (xHat), R.min.z = cp.dot (zHat);
  
	if (R.max.x < 0) 			/* R to left of circle center */
   	if (R.max.z < 0) 		/* R in lower left corner */
     		return ((R.max.x * R.max.x + R.max.z * R.max.z) < Rad2);
   	else if (R.min.z > 0) 	/* R in upper left corner */
     		return ((R.max.x * R.max.x + R.min.z * R.min.z) < Rad2);
   	else 					/* R due West of circle */
     		return(Math.abs(R.max.x) < Rad);
 	else if (R.min.x > 0)  	/* R to right of circle center */
   		if (R.max.z < 0) 	/* R in lower right corner */
     			return ((R.min.x * R.min.x + R.max.z * R.max.z) < Rad2);
   	else if (R.min.z > 0)  	/* R in upper right corner */
     		return ((R.min.x * R.min.x + R.min.z * R.min.z) < Rad2);
   	else 				/* R due East of circle */
     		return (R.min.x < Rad);
 	else				/* R on circle vertical centerline */
   		if (R.max.z < 0) 	/* R due South of circle */
     		return (Math.abs(R.max.z) < Rad);
   	else if (R.min.z > 0)  	/* R due North of circle */
     		return (R.min.z < Rad);
   	else 				/* R contains circle centerpoint */
     		return(true);
}
export{Check_Intersect};
