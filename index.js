};

//Animate functions
var animate = function(){
     var time = Date.now() * 0.00005;
     requestAnimationFrame(animate);

     city.rotation.y -= (mouse.x * 8 - camera.rotation.y) * uSpeed;
     city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed;
     if (city.rotation.x < -0.05){
          city.rotation.x = -0.05;
     } else if(city.rotation.x > 1){
          city.rotation.x = 1;
     }
     var cityRotation = Math.sin(Date.now() / 5000) * 13;
     for(let i = 0, l = town.children.length; i < l; i++){
          var object = town.children[i];
     }

     smoke.rotation.y += 0.01;
     smoke.rotation.x += 0.01;

     camera.lookAt(city.position);
     renderer.render(scene, camera);

};





//Calling Main Functions
generateLines();
init();
animate();