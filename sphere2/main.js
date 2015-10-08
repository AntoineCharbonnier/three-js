var scene    = new THREE.Scene(); // Create a Three.js scene object.
var camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Define the perspective camera's attributes.
var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(); // Fallback to canvas renderer, if necessary.

renderer.setSize(window.innerWidth, window.innerHeight); // Set the size of the WebGL viewport.
document.body.appendChild(renderer.domElement); // Append the WebGL viewport to the DOM.


// var geometry = new THREE.SphereGeometry( 5, 32, 32 );
var radius         = 15;
var widthSegments  = 8;
var heightSegments = 6;
var phiStart       = 0;
var phiLength      = 6.3;
var thetaStart     = 0;
var thetaLength    = 3.1;


var geometry = new THREE.SphereGeometry(
	radius,
	widthSegments,
	heightSegments,
	phiStart,
	phiLength,
	thetaStart,
	thetaLength
);

// var geometry       = new THREE.SphereGeometry( 4,3,2 );

var material       = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );

var sphere         = new THREE.Mesh( geometry, material );

var bufferMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 , wireframe: true} );

var bufferGeo      = new THREE.BufferGeometry().fromGeometry(geometry);

bufferGeo.dynamic = true;

var bufferSphere   = new THREE.Mesh(bufferGeo,bufferMaterial);

// var initial = bufferSphere.geometry.attributes.position.array;
var initial = sphere.geometry.vertices;

// scene.add( bufferSphere );
scene.add( sphere );

console.log(sphere)

camera.position.z = 150; // Move the camera away from the origin, down the positive z-axis.


var render = function (ts) {


	// var position = sphere.geometry.attributes.position.array;
	var position = sphere.geometry.vertices;

  // for(var i = 0; i < position.length; i += 3){
  for(var i = 0; i < position.length; i ++){
  	var random = Math.random() > 0.5 ? 0.199 : -0.199;
  	// var x = position[i];
  	// var y = position[i + 1];

  	var x = position[i].x;
  	var y = position[i].y;

  	// position[i+1] += (( initial[i+1] - y ) * 0.08) + random;
  	position[i].y += (( initial[i].y - y ) * 0.08) + random;
  }

  bufferSphere.geometry.attributes.position.needsUpdate = true;
  sphere.geometry.verticesNeedUpdate = true;
  renderer.render(scene, camera); // Each time we change the position of the cube object, we must re-render it.
  requestAnimationFrame(render); // Call the render() function up to 60 times per second (i.e., up to 60 animation frames per second).
};

render();