import * as THREE from "https://threejs.org/build/three.module.js";
import {scene} from "./main.js";
var pickables = [];
class Candle{
    px;
	pz;
    count;
	spotLight;
	flameMesh;
	
    constructor(px,pz,name){
	this.px = px;
	this.pz = pz;
    this.candle = new THREE.Group();
	this.candle.name = name;
    var body = new THREE.Mesh (new THREE.CylinderGeometry(5,5,20,60), new THREE.MeshNormalMaterial());
    this.candle.add (body);
    body.position.y = 10;
			
	    this.spotLight = new THREE.SpotLight( 0xffffff );
		this.candle.add(this.spotLight);
	    this.spotLight.angle = Math.PI/4;
		this.spotLight.position.y = 30;
		this.spotLight.target = body;

		this.spotLight.castShadow = true;	
		this.spotLight.penumbra = 0.51;
		this.spotLight.shadow.mapSize.width = 1024;
		this.spotLight.shadow.mapSize.height = 1024;

		this.spotLight.shadow.camera.near = 10;
		this.spotLight.shadow.camera.far = 40;
		this.spotLight.shadow.camera.fov = 120;
		
	this.flameInterval = setInterval (this.textureAnimate.bind(this), 100);
	}
	
    makeFlame(){
	  var loader = new THREE.TextureLoader();
      // load a resource
      var texture = loader.load(
      // URL ...
      'https://i.imgur.com/M2tr5Tm.png?1',
      // onLoad ...
        function(texture) {
        // do something with the texture
        // Plane with default texture coordinates [0,1]x[0,1]
        },
	    undefined, // onProgress
        // onError ...
        function(xhr) {
          console.log('An error happened');
        }
        );
	    var texMat = new THREE.MeshBasicMaterial({
            map: texture,
            alphaTest:0.5
          });
        this.flameMesh = new THREE.Mesh(new THREE.PlaneGeometry(30,30), texMat);
		this.flameMesh.name = "fire";
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set (1/3,1/3);
        texture.offset.set (0,2/3);
        this.candle.add (this.flameMesh);
	    pickables.push(this.candle);
        scene.add (this.candle);
        this.flameMesh.position.y = 28;
	    this.candle.position.set(this.px,0.001,this.pz);
    }
  
    textureAnimate() {
      this.count = (this.count === undefined) ? 1 : this.count;
	    if (this.flameMesh!== undefined){
            var texture = this.flameMesh.material.map;
            //console.log (`${textureAnimate.count}: [${texture.offset.x},${texture.offset.y}]`);
            texture.offset.x += 1/3;
 		    if (this.count % 3 === 0) {
    	    texture.offset.y -= 1/3;
			}
            this.count++;
        }
    }
	toReStartAgain(){
	clearInterval (this.flameInterval);
	setTimeout(this.reStartAgain.bind(this),3000);
    }
	reStartAgain(){
	  this.flameMesh.visible = true;
	  this.spotLight.visible = true;
	  this.flameInterval = setInterval (this.textureAnimate.bind(this), 100);
	}
};
export{Candle,pickables};