var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// rajouter le render dans le dom /!\ obligatoire
document.body.appendChild( renderer.domElement );

var cube = null;
var creatingCube = function (){
	// creer un geometry & un meshMaterial pour créer un Mesh a render
	//  /!\ CUBE
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
}

var updatingCubeRotation = function () {	
	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;
}

creatingCube();

// var geometry = new THREE.SphereGeometry( 5, 32, 32 );
// var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
// var sphere = new THREE.Mesh( geometry, material );
// scene.add( sphere );


camera.position.z = 5;

var render = function () {
	requestAnimationFrame( render );
	updatingCubeRotation();
	renderer.render(scene, camera);
};

render();