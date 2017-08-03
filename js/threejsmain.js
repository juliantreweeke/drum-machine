// var app = app || {};
//
// app.controller = {
//   step: 0,
//   rotationSpeed: 0.02,
//   bouncingSpeed: 0.02,
//   cameraPosIndex: 0,
//   velocityScale: 1.0,
//   gravityScale: 0.05,
//   reverbTime: 13
//
// };
//
// app.init = function(){
//   console.log('Hello My World');
//
//   app.scene = new THREE.Scene();
//
//   app.width  = window.innerWidth;
//   app.height = window.innerHeight;
//
//   // 4 params:
//   // field of view (FOV)
//   // screen ratio
//   // near field: how close to render things
//   // far field:  how far to render thiings
//   app.camera = new THREE.PerspectiveCamera(
//     60, // FOV
//     app.width / app.height, // screen ratio
//     0.1, // near field
//     5000 // far field
//   );
//
//   // Position our camera somewhere in the scene; it has a perspective
//   app.camera.position.x = -30;
//   app.camera.position.y = 40;
//   app.camera.position.z = 30;
//   // Tell the camera where its looking - at the center of the scene, the origin (0, 0, 0)
//   app.camera.lookAt( app.scene.position );
//
//   // The renderer calculates how the canvas/browser will see these elements, based on the camera position.
//   // It also defines how it will do the rendering calculation under the hood, i.e. WebGL
//   // hardware acceleration or fallback to a software renderer
//   app.renderer = new THREE.WebGLRenderer();
//   // set the size
//   app.renderer.setSize( app.width, app.height );
//   app.renderer.setClearColor( 0x000000 ); // background colour
// //   app.renderer.shadowMap.enabled = true; // shadows are computationally expensive, so disabled by default
// //   app.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//
//
//   // app.axes = new THREE.AxisHelper( 40 );
//   // app.scene.add( app.axes );
//   //
//   // app.plane = app.createPlane();
//   // app.scene.add( app.plane );
//
//   app.spotlight = app.createSpotlight();
//   app.scene.add( app.spotlight );
//
//
//   app.cube = app.createCube( 15, 15, 15, 5 );
//   // app.scene.add( app.cube );
//
//
//
//
//   // app.cubes = [];
//   // for (var i = 0; i < 1000; i++) {
//   //
//   //   var cube = app.createCube(
//   //     THREE.Math.randInt(-500, 500 ),  // x
//   //     THREE.Math.randInt(-500, 500 ), // y
//   //     THREE.Math.randInt(-500, 500 ), // z
//   //     THREE.Math.randInt(4, 50 ) //4 // size
//   //   );
//   //
//   //   cube.material.color.setHSL( Math.random(), 1.0, 0.5);
//   //
//   //   app.cubes.push( cube );
//   //   app.scene.add( cube );
//   //
//   // }
//
//   app.sphere = app.createSphere();
//   // app.scene.add( app.sphere );
//
//   app.ambient = new THREE.AmbientLight( 0x555555 );
//   app.scene.add( app.ambient );
//
//   // app.line = app.createLineFromSpline( app.spline );
//   // app.scene.add( app.line );
//
//
//   app.controls = new THREE.OrbitControls( app.camera, app.renderer.domElement );
//
//   // app.controller = {
//   //   step: 0,
//   //   rotationSpeed: 0.02,
//   //   bouncingSpeed: 0.02
//   // };
//   // app.gui = new dat.GUI();
//   // app.gui.add( app.controller, 'rotationSpeed', 0, 0.2 );
//   // app.gui.add( app.controller, 'bouncingSpeed', 0, 2.0 );
//   // app.gui.add( app.controller, 'velocityScale', -2, 2);
//   // app.gui.add( app.controller, 'gravityScale', -0.1, 0.1);
//   // app.gui.add( app.controller, 'reverbTime', 0, 1000);
//
//   // Attach the canvas element created by the renderer onto the page
//   document.getElementById("output").appendChild( app.renderer.domElement );
//
//
//
//   // Actually draw something
//   app.animate();
//
// }; // app.init
//
//
//
//
//
// app.animate = function(){
//
//
//   app.cube.rotation.x += app.controller.rotationSpeed;
//   app.cube.rotation.y += app.controller.rotationSpeed;
//   app.cube.rotation.z += app.controller.rotationSpeed;
//   app.controller.step += app.controller.bouncingSpeed;
//   app.sphere.rotation.y += app.controller.rotationSpeed;
//   // app.sphere.position.x = -20 + ( 10 * Math.cos(app.controller.step) );
//   // app.sphere.position.y =   4 + ( 10 * Math.abs(Math.sin(app.controller.step)) );
//
//   app.renderer.render( app.scene, app.camera );
//   requestAnimationFrame( app.animate );
//
// };
//
//
// app.createSpotlight = function(){
//
//   var spotlight = new THREE.SpotLight( 0xFFFFFF );
//   spotlight.position.set( 30, 60, 10 );
// //   spotlight.castShadow = true;
// //   spotlight.shadow.mapSize.width = 2048;
// // //   spotlight.shadow.mapSize.height = 2048;
//
//   return spotlight;
// };
//
//
// app.createSphere = function(){
//
//   var sphereGeometry = new THREE.SphereGeometry( 20, 30, 30 );  // radius, X and Y segments to approximate sphere with
//   var sphereMaterial = new THREE.MeshLambertMaterial({
//     color: 0xFFFFFF,
//     wireframe: false,
//     // map: THREE.ImageUtils.loadTexture("img/earth.jpg"),
//     side: THREE.DoubleSide
//   });
//
//   var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
//
//   sphere.position.set( 0, 0, 0 );
// // //   sphere.castShadow = true;
//
//   return sphere;
// };
//
// app.createCube = function(x, y, z, size){
//
//   var cubeGeometry = new THREE.BoxGeometry( size, size, size );
//   var cubeMaterial = new THREE.MeshLambertMaterial({
//     color: 0xFF8F00,   // mustard cube, the culinary hit of the 4th millenium
//     wireframe: false
//   });
//
//   var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
//
//   cube.position.set( x, y, z );
// // //   // cube.castShadow = true;
//
//   return cube;
// };
//
// app.createPlane = function(){
//
//   var planeGeometry = new THREE.PlaneGeometry( 120, 20 );  // 120 x 20 plane (no height)
//   var planeMaterial = new THREE.MeshLambertMaterial({
//     color: 0xCFD8DB // a kind of dull grey
//   });
//
//   // combine shape and material into a final object, a mesh
//   var plane = new THREE.Mesh( planeGeometry, planeMaterial );
//
//   plane.position.x = 15;
//   plane.position.y = 0;
//   plane.position.z = 0;
//   plane.rotation.x = -0.5 *  Math.PI;  // don't ask... it's because of math(s)
// //   plane.receiveShadow = true;
//
//   return plane;
// };
//
//
//
//
//
//
//
//
//
//
//
// app.onResize = function(){
//   app.width = window.innerWidth;
//   app.height = window.innerHeight;
//
//   app.camera.aspect = app.width / app.height;
//   app.camera.updateProjectionMatrix();
//
//   app.renderer.setSize( app.width, app.height );
// }
//
// window.addEventListener( "resize", app.onResize, false );
//
//
//
//
//
//
//
//
//
//
//
//
// window.onload = app.init;  // no jQuery today, but this is basically $(document).ready(function(){ ... })
