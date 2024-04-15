//Base parameters 
var renderer = new THREE.WebGLRenderer({ antialas: true});
renderer.setSize(window.innerWidth, window.innerHeight);

if(window.innerWidth > 800){
 renderer.shadowMap.enabled = true;
 renderer.shadowMap.type = THREE.PCFSoftShadowMap;
 renderer.shadowMap.needsUpdate = true;
};
document.body.appendChild(renderer.domElement);

//Make it responsive
window.addEventListener("resize", onWindowResize, false);
function onWindowResize(){
 camera.aspect = window.innerWidth / window.innerHeight;
 camera.updateProjectionMatrix();
 renderer.setSize(window.innerWidth, window.innerHeight)
};

var camera = new THREE.PerspectiveCamera(20, window.
innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 2, 14);

var scene = new THREE.Scene();
var city = new THREE.Object3D();
var smoke = new THREE.Object3D();
var town = new THREE.Object3D();
var createCarPos = true;
var uSpeed = 0.001;

//FOG Brackground
var setcolor = 0xF02050;
scene.background = new THREE.coor(setcolor);
scene.fog = new THREE.Fog(setcolor, 10, 16);

//Random Function
function mathRandom(num=8){
 var numValue = - Math.random() * num +Math.random() *
 num;
 return numValue
};


//Calling main functions
generateLines();
init();
animate();