import {obstacle} from "./init.js";
import {power} from "./update.js";
import {Check_Intersect} from "./Check_Intersect.js";
var IsBCollision = false;
var IsCollision  = false;
function check_Collision(Rect){
	if((Check_Intersect (Rect,obstacle[0], 20) || Check_Intersect (Rect,obstacle[1], 5) || Check_Intersect (Rect,obstacle[2], 15) || Check_Intersect (Rect,obstacle[3], 10) || Check_Intersect (Rect,obstacle[4], 1)) && power >= 0)
		IsCollision = true;
	else
		IsCollision = false;
	if((Check_Intersect (Rect,obstacle[0], 20) || Check_Intersect (Rect,obstacle[1], 5) || Check_Intersect (Rect,obstacle[2], 15) || Check_Intersect (Rect,obstacle[3], 10) || Check_Intersect (Rect,obstacle[4], 1)) && power <= 0)
		IsBCollision = true;
	else
		IsBCollision = false;
}
export {check_Collision,IsBCollision,IsCollision};