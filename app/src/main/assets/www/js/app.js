var tween0, tween1, tween2, tween3, tween4, tween5;
var moveVector;
var scene, camera, effect, renderer, clock, dirLight, dirLight2, time;
var skyBox, mesh, mesh3, mesh4, mesh5, mesh6, moon;
var fighter, fighter2, fighter3, fighter4, fighter5, cruiser;
var controls;

init();
animate();

function cruiserTween() {
var tween = new TWEEN.Tween({x: -8000, y: 100, z: 550})
        .to({x: 8000, y: 120, z: 550}, 60000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onStart(function () {
            cruiser.rotation.y = 260.75;
        })
        .onUpdate(function () {
            cruiser.position.set(this.x, this.y, this.z);
        })
        .repeat(Infinity)
        .start();

return tween;
}

function fighter1Tween() {
var tween = new TWEEN.Tween({x: -1000, y: 140, z: -3500})
        .to({x: -1000, y: 170, z: 3500}, 55000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onStart(function () {
            fighter.rotation.y = 50.2;;
        })
        .onUpdate(function () {
            fighter.position.set(this.x, this.y, this.z);
        })
        .repeat(Infinity)
        .start();

return tween;
}
function fighter2Tween() {
var tween = new TWEEN.Tween({x: -1000, y: 0, z: -3500})
        .to({x: -1000, y: -140, z: 3500}, 62000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onStart(function () {
            fighter2.rotation.y = 50.2;;
        })
        .onUpdate(function () {
            fighter2.position.set(this.x, this.y, this.z);
        })
        .repeat(Infinity)
        .start();

return tween;
}

function fighter3Tween() {
var tween = new TWEEN.Tween({x: 5000, y: -100, z: 480})
        .to({x: -5000, y: 0, z: 480}, 40000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onStart(function () {
            fighter3.rotation.y = 257.60;
        })
        .onUpdate(function () {
            fighter3.position.set(this.x, this.y, this.z);
        })
        .repeat(Infinity)
        .start();

return tween;
}

function fighter4Tween() {
var tween = new TWEEN.Tween({x: 5000, y: 0, z: 150})
        .to({x: -5000, y: -100, z: 150}, 40000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onStart(function () {
            fighter4.rotation.y = 257.60;
        })
        .onUpdate(function () {
            fighter4.position.set(this.x, this.y, this.z);
        })
        .repeat(Infinity)
        .start();

return tween;
}

function fighter5Tween() {
var tween = new TWEEN.Tween({x: 5000, y: 0, z: 850})
        .to({x: -5000, y: -100, z: 850}, 40000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onStart(function () {
            fighter5.rotation.y = 257.60;
        })
        .onUpdate(function () {
            fighter5.position.set(this.x, this.y, this.z);
        })
        .repeat(Infinity)
        .start();

return tween;
}

function animate() {

time = clock.getElapsedTime();

mesh.rotation.y -= 0.03;
mesh2.rotation.y += 0.003;
mesh3.rotation.y -= 0.02;
mesh4.rotation.y += 0.02;
mesh5.rotation.y -= 0.02;
mesh6.rotation.y += 0.02;

requestAnimationFrame( animate );
TWEEN.update();
update(clock.getDelta());
render(clock.getDelta());
}

function resize() {
var width = window.innerWidth;
var height = window.innerHeight;

camera.aspect = width / height;
camera.updateProjectionMatrix();

renderer.setSize(width, height);
effect.setSize(width, height);
}

function update(dt) {
resize();

camera.updateProjectionMatrix();

controls.update(dt);
}

function render(dt) {
effect.render(scene, camera);
}

function fullscreen() {
if (document.body.requestFullscreen) {
  document.body.requestFullscreen();
} else if (document.body.msRequestFullscreen) {
  document.body.msRequestFullscreen();
} else if (document.body.mozRequestFullScreen) {
  document.body.mozRequestFullScreen();
} else if (document.body.webkitRequestFullscreen) {
  document.body.webkitRequestFullscreen();
}
}

function init() {

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.01, 100000 );
camera.position.set(-1000, 15, 300);
scene.add(camera);

effect = new THREE.StereoEffect(renderer);
clock = new THREE.Clock();

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(
  camera.position.x + 0.15,
  camera.position.y,
  camera.position.z
);
controls.noPan = true;
controls.noZoom = true;
    
var loader = new THREE.ImageLoader();

function setOrientationControls(e) {
  if (!e.alpha) {
    return;
  }

  controls = new THREE.DeviceOrientationControls(camera, true);
  controls.connect();
  controls.update();

  renderer.domElement.addEventListener('click', fullscreen, false);

  window.removeEventListener('deviceorientation', setOrientationControls, true);
}
window.addEventListener('deviceorientation', setOrientationControls, true);

dirLight = new THREE.DirectionalLight(0xeec39a, 1);
dirLight.position.set(-100, 100, 50);
scene.add(dirLight);

dirLight2 = new THREE.DirectionalLight(0xf2f2f2, 1);
dirLight2.position.set(500, 500, 0);
scene.add(dirLight2);

var light = new THREE.AmbientLight( 0xcef2ff );
scene.add( light );

var customMaterial = new THREE.ShaderMaterial(
{
    uniforms:
    {
        "c":   { type: "f", value: 0.02 },
        "p":   { type: "f", value: 6.0 },
        glowColor: { type: "c", value: new THREE.Color(0xffae00) },
        viewVector: { type: "v3", value: camera.position }
    },
    vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true
}   );

var customMaterial2 = customMaterial.clone();
var customMaterial3 = customMaterial.clone();

var textureMap = new THREE.Texture();
var mesh2Map = new THREE.Texture();
var mesh3Map = new THREE.Texture();
var mesh4Map = new THREE.Texture();
var mesh5Map = new THREE.Texture();
var mesh6Map = new THREE.Texture();
var bg2Map = new THREE.Texture();    
    
loader.load( 'img/deathstar.jpg', function ( image ) { textureMap.image = image;  textureMap.needsUpdate = true; });
loader.load( 'img/yavin.png', function ( image )     { mesh2Map.image   = image;  mesh2Map.needsUpdate   = true; });
loader.load( 'img/mustafar.jpg', function ( image )  { mesh3Map.image   = image;  mesh3Map.needsUpdate   = true; });
loader.load( 'img/naboo.jpg', function ( image )     { mesh4Map.image   = image;  mesh4Map.needsUpdate   = true; });
loader.load( 'img/kamino.jpg', function ( image )    { mesh5Map.image   = image;  mesh5Map.needsUpdate   = true; });
loader.load( 'img/pandora.jpg', function ( image )   { mesh6Map.image   = image;  mesh6Map.needsUpdate   = true; });
loader.load( 'img/bg2.jpg', function ( image )       { bg2Map.image     = image;  bg2Map.needsUpdate     = true; });
    
var material  = new THREE.MeshPhongMaterial( { map: textureMap } );
var geometry = new THREE.SphereGeometry( 160, 60, 40 );
mesh = new THREE.Mesh( geometry, material );
mesh.position.z = -300;
mesh.position.x = -180;
mesh.rotation.y = 300;
scene.add( mesh );

var geometry2 = new THREE.SphereGeometry( 8800, 60, 40 );
var material2  = new THREE.MeshLambertMaterial( { map: mesh2Map } );
mesh2 = new THREE.Mesh( geometry2, material2 );
mesh2.position.z = 500;
mesh2.position.x = 16500;
scene.add( mesh2 );

var geometry3 = new THREE.SphereGeometry( 3000, 60, 40 );
var material3  = new THREE.MeshPhongMaterial( { map: mesh3Map } );
mesh3 = new THREE.Mesh( geometry3, material3 );
mesh3.position.z = 500;
mesh3.position.x = -15900;
scene.add( mesh3 );

var geometry4 = new THREE.SphereGeometry( 2510, 60, 40 );
var material4  = new THREE.MeshLambertMaterial( { map: mesh4Map } );
mesh4 = new THREE.Mesh( geometry4, material4 );
mesh4.position.z = 15900;
mesh4.position.x = -1000;
scene.add( mesh4 );

var geometry5 = new THREE.SphereGeometry( 150, 60, 40 );
var material5  = new THREE.MeshLambertMaterial( { map: mesh5Map } );
mesh5 = new THREE.Mesh( geometry5, material5 );
mesh5.position.z = -600;
mesh5.position.x = -600;
scene.add( mesh5 );

var geometry6 = new THREE.SphereGeometry( 110, 60, 40 );
var material6  = new THREE.MeshLambertMaterial( { map: mesh6Map } );
mesh6 = new THREE.Mesh( geometry6, material6 );
mesh6.position.z = -500;
mesh6.position.x = -1600;
scene.add( mesh6 );

var blueGlow2 = new THREE.Mesh( geometry5.clone(), customMaterial2.clone() );
blueGlow2.position.z = -600;
blueGlow2.position.x = -600;
blueGlow2.scale.multiplyScalar(1.1);
scene.add( blueGlow2 );

var blueGlow3 = new THREE.Mesh( geometry6.clone(), customMaterial2.clone() );
blueGlow3.position.z = -500;
blueGlow3.position.x = -1600;
blueGlow3.scale.multiplyScalar(1.1);
scene.add( blueGlow3 );

var redGlow = new THREE.Mesh( geometry3.clone(), customMaterial3.clone() );
redGlow.position.z = 500;
redGlow.position.x = -15900;
redGlow.scale.multiplyScalar(1.45);
scene.add( redGlow );
    
var yavinGlow = new THREE.Mesh( geometry2.clone(), customMaterial.clone() );
yavinGlow.position.z = 500;
yavinGlow.position.x = 16500;
yavinGlow.scale.multiplyScalar(1.1);
scene.add( yavinGlow );

var geometry_bg = new THREE.SphereGeometry(30000, 60, 40);

var material_bg  = new THREE.MeshBasicMaterial( { map: bg2Map } );

skyBox = new THREE.Mesh(geometry_bg, material_bg);
skyBox.scale.set(-1, 1, 1);
skyBox.rotation.x = -90;
skyBox.rotation.z = -80;

scene.add(skyBox);
    
var texture = new THREE.Texture();
var texture2 = new THREE.Texture();
var texture3 = new THREE.Texture();

loader.load( 'img/color_0.jpg', function ( image ) { texture.image = image; texture.needsUpdate = true; });
loader.load( 'img/dark_fighter_6_color.png', function ( image ) { texture2.image = image; texture2.needsUpdate = true; });
loader.load( 'img/space_cruiser_4_color.png', function ( image ) { texture3.image = image; texture3.needsUpdate = true; });    

var OBJloader = new THREE.OBJLoader();   
    
OBJloader.load( 'obj/SpaceCraft.obj', function ( object ) {
    
  fighter = object;
    
  fighter.traverse( function ( child ) { if ( child instanceof THREE.Mesh ) { child.material.map = texture; } });

  fighter.scale.set(4.5, 4.5, 4.5);
  fighter.position.set(-1000,150,-3500)
  fighter.rotation.y = 50.2;
    
  fighter2 = fighter.clone();
  fighter2.position.y = 140;
    
  scene.add( fighter );
  scene.add( fighter2 );
    
  tween1 = fighter1Tween();
  tween2 = fighter2Tween();

});
    

OBJloader.load( 'obj/dark_fighter_6.obj', function ( object ) {
    
  fighter3 = object;
    
  fighter3.traverse( function ( child ) { if ( child instanceof THREE.Mesh ) { child.material.map = texture2; }});
    
  fighter3.scale.set(4, 4, 4);
  fighter4 = fighter3.clone();
  fighter5 = fighter3.clone();
    
  scene.add( fighter3 );
  scene.add( fighter4 );
  scene.add( fighter5 );
    
  tween3 = fighter3Tween();
  tween4 = fighter4Tween();
  tween5 = fighter5Tween();

});

OBJloader.load( 'obj/space_cruiser_4.obj', function ( object ) {
    
  cruiser = object;
  cruiser.traverse( function ( child ) { if ( child instanceof THREE.Mesh ) { child.material.map = texture3; } } );
  cruiser.scale.set(15, 15, 15);
  scene.add( cruiser );
  tween0 = cruiserTween();
    
});

document.body.appendChild( renderer.domElement );

}
