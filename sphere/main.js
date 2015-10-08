var scene  = new THREE.Scene(); // Create a Three.js scene object.
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Define the perspective camera's attributes.


var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(); // Fallback to canvas renderer, if necessary.
renderer.setSize(window.innerWidth, window.innerHeight); // Set the size of the WebGL viewport.
document.body.appendChild(renderer.domElement); // Append the WebGL viewport to the DOM.


// Be aware that a light source is required for MeshPhongMaterial to work:
// var pointLight = new THREE.PointLight(0xFFFFFF); // Set the color of the light source (white).
// pointLight.position.set(100, 100, 250); // Position the light source at (x, y, z).
// scene.add(pointLight); // Add the light source to the scene.


// var geometry = new THREE.SphereGeometry( 5, 32, 32 );
var radius = 15;
var widthSegments = 8;
var heightSegments = 6;
var phiStart = 0;
var phiLength = 6.3;
var thetaStart = 0;
var thetaLength = 3.1;


var geometry = new THREE.SphereGeometry(
	radius,
	widthSegments,
	heightSegments,
	phiStart,
	phiLength,
	thetaStart,
	thetaLength
);

var ambientLight = new THREE.AmbientLight( 0x0000ff );
scene.add( ambientLight );

// var lights = [];
// lights[0] = new THREE.PointLight( 0xff0000, 1, 0 );
// lights[1] = new THREE.PointLight( 0x00ff00, 1, 0 );
// lights[2] = new THREE.PointLight( 0x0000ff, 1, 0 );

// lights[0].position.set( 0, 200, 0 );
// lights[1].position.set( 100, 200, 100 );
// lights[2].position.set( -100, -200, -100 );

// scene.add( lights[0] );
// scene.add( lights[1] );
// scene.add( lights[2] );

var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );


var material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );
var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );


camera.position.z = 150; // Move the camera away from the origin, down the positive z-axis.


var render = function () {
  sphere.rotation.x += 0.002; // Rotate the sphere by a small amount about the x- and y-axes.
  sphere.rotation.y += 0.005;

  renderer.render(scene, camera); // Each time we change the position of the cube object, we must re-render it.
  requestAnimationFrame(render); // Call the render() function up to 60 times per second (i.e., up to 60 animation frames per second).
};

render();