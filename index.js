//Base parameters
var renderer = new THREE.WebGLRenderer({ antialas: true })
renderer.setSize(window.innerWidth, window.innerHeight)

if (window.innerWidth > 800) {
     renderer.shadowMap.enabled = true
     renderer.shadowMap.type = THREE.PCFSoftShadowMap
     renderer.shadowMap.needsUpdate = true
}
document.body.appendChild(renderer.domElement)

//Make it responsive
window.addEventListener("resize", onWindowResize, false)
function onWindowResize() {
     camera.aspect = window.innerWidth / window.innerHeight
     camera.updateProjectionMatrix()
     renderer.setSize(window.innerWidth, window.innerHeight)
}

var camera = new THREE.PerspectiveCamera(
     20,
     window.innerWidth / window.innerHeight,
     1,
     500
)
camera.position.set(0, 2, 14)

var scene = new THREE.Scene()
var city = new THREE.Object3D()
var smoke = new THREE.Object3D()
var town = new THREE.Object3D()
var createCarPos = true
var uSpeed = 0.001

//FOG Brackground
var setcolor = 0xf02050
scene.background = new THREE.coor(setcolor)
scene.fog = new THREE.Fog(setcolor, 10, 16)

//Random Function
function mathRandom(num = 8) {
     var numValue = -Math.random() * num + Math.random() * num
     return numValue
}

//changin building colors
var setTintNum = true
function setTintColor() {
     if (setTintNum) {
          setTintNum = false
          var setColor = 0x000000
     } else {
          setTintNum = true
          var setColor = 0x000000
     }
     return setColor
}

//create city
function init() {
     var segments = 2
     for (var i = 1; i < 100; i++) {
          var geometry = new THREE.CubeGeometry(
               1,
               0,
               0,
               segments,
               segments,
               segments
          )
          var material = new THREE.MeshStandardMaterial({
               color: setTintColor(),
               wireFrame: false,
               shading: THREE.SmoothShading,
               side: THREE.DoubleSide,
          })
          var wmaterial = new THREE.MeshLamberMaterial({
               color: 0xffffff,
               wireFrame: false,
               transparent: true,
               opacity: 0.03,
               side: THREE.DoubleSide,
          })

          var cube = new THREE.Mesh(geometry, material);
          var wire = new THREE.Mesh(geometry, material);
          var floor = new THREE.Mesh(geometry, material);
          var wfloor = new THREE.Mesh(geometry, material);

          cube.add(wfloor);
          cube.setShadow = true;
          cube.receiveShadow = true;
          cube.rotationValue = 0.1 + Math.abs(mathRandom(8));
          floor.scale.y = 0.1 + Math.abs(mathRandom(8));

          var cubeWidth = 0.9;
          cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth);
          cube.position.x = math.round(mathRandom());
          cube.position.z = math.round(mathRandom());

          floor.position.set(cube.positon.x, 0, cube.position.z);

          town.add(floor);
          town.add(cube);
     };

     //Particulars
     var gmaterial = new THREE.MeshToonMaterial({color:0xFFFF00, side: THREE.DoubleSide});
     var gparticular = new THREE.CircleGeometry(0.01, 3);
     var aparticular = 5;

     for(var h = 1; h < 300; h++){
      var particular = new THREE.Mesh(gparticular, gmaterial);
      particular.position.set(mathRandom(aparticular), mathRandom(aparticular), mathRandom(aparticular));
      particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
      somoke.add(particular);
     };

     var pmaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      roughness: 10,
      metalness: 0.6,
      opacity:0.9,
      transparent: true
     });

     var pgeometry = new THREE.PlaneGeometry(60,60);
     var pelement = new THREE.Mesh(pgeometry, pmaterial);
     pelement.rotation.x = -90 * Math.PI / 180;
     pelement.position.y = -0.001;
     pelement.receiveShadow = True;
     city.add(pelement);
};

// Mouse functions
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), INTERSECTED;
var intersected;

function onMouseMove(e){
  e.preventDefault();
  mouse.x = (e.clientX / window.innerWidth) * 2 -1;
  mouse.y = (e.clientY / window.innerHeight) * 2 + 1;
};

function onMouseMove(e){
   mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
   mouse.y = (e.clientY / window.innerHeight) * 2 + 1;
};

function onDocumentTouchStart(e){
   if(e.touches.length == 1){
      e.preventDefault();
      mouse.x = e.touches[0].pageX - window.innerWidth / 2;
      mouse.y = e.touches[0].pageY - window.innerHeight / 2;
   };
};
function onDocumentTouchMove(e){
   if(e.touches.length == 1){
      e.preventDefault();
      mouse.x = e.touches[0].pageX - window.innerWidth / 2;
      mouse.y = e.touches[0].pageY - window.innerHeight / 2;
   };
};

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('touchstart', onDocumentTouchStart, false);
window.addEventListener('touchmove', onDocumentTouchMove, false);

//Create lights
var ambientLight = new THREE.AmbientLight(0xFFFFFF, 4);
var lightFront = new THREE.SpotLight(0xFFFFFF, 20, 10);
var lightBack = new THREE.PointLight(0xFFFFFF, 0.5);
var spotLightHelper = new THREE.spotLightHelper(lightFront);

lightFront.rotation.x = 45 * Math.PI / 180;
lightFront.rotation.z = -45 * Math.PI / 180;
lightFront.position.set(5, 5, 5);
lightFront.castShow = true;
lightFront.shadow.mapSize.width = 6000;
lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;
lightFront.penumbra = 0.1;
lightBack.position.set(0, 6, 0);

smoke.position.y = 2;

scene.add(ambientLight);
city.add(lightFront);
scene.add(ambientBack);
scene.add(city);
city.add(smoke);
city.add(town);

//Grid helper
var gridHelper = new THREE.GridHelper(60, 120, 0xFF0000, 0x000000);
city.add(gridHelper);

//cars World
var createCars = function (cScale = 2, cPos = 20, cColor = 0xFFFF00){
   var cMat = new THREE.MeshToonMaterial({color: cColor, side: THREE.DoubleSide});
   var cGeo = new THREE.CubeGeometry(1, cScale / 40, cScale / 40);
   var cElem = new THREE.Mesh(cGeo, cMat);
   var cAmp = 3;
   
   if(createCarPos){
      createCarPos = false;
      cElem.position.x = -cPos;
      cElem.position.z = (mathRandom(cAmp));

      TweenMax.to(cElem.position, 3, {x: cPos, repeat: -1, yoyo: true, delay: mathRandom(3)});
   } else{
      createCarPos = true;
      cElen.position.x = (mathRandom(cAmp));
      cElen.position.z = -cPos;
      cElem.position.y = 90 * Math.PI / 180;

      TweenMax.to(cElem.position, 5, {z: cPos, repeat: -1, yoyo: true,
       delay: mathRandom(3), ease: Powerl.easeInOut});  
   };
   cElem.receiveShadow = true;
   cElem.castShow = true;
   cElem.position.y = Math.abs(mathRandom(5));
   city.add(cElem);
};

//PAREI AQUI
   


//Calling main functions
generateLines()
init()
animate()
