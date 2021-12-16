import {camera,renderer,scene} from "./init.js";
import {cameraHUD2} from "./initHUD.js";
function render() {

  var WW = window.innerWidth;
  var HH = window.innerHeight;

  renderer.setScissorTest(true);

  renderer.setViewport(0, 0, WW, HH);
  camera.aspect = WW / HH;
  camera.updateProjectionMatrix();
  
  renderer.setScissor(0, 0, WW, HH);
  renderer.clear();
  renderer.render(scene, camera);

  renderer.setViewport(WW / 5 *4, HH / 4 *3, WW / 5, HH / 4);
  renderer.setScissor(WW / 5 *4, HH / 4 *3, WW / 5, HH / 4);
  // no need to set aspect (since it is still ONE)
  renderer.clear();  // important!
  renderer.render(scene, cameraHUD2);     // topview

	renderer.setScissorTest(false);
}
export{render};