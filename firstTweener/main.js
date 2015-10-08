var container, 
    renderer, 
    scene, 
    camera, 
    mesh,
    initial, 
    start = Date.now(),
    fov = 30,
    tick;

window.addEventListener( 'load', function() {

  // grab the container from the DOM
  container = document.getElementById( "container" );
  
  // create a scene
  scene = new THREE.Scene();

  // create a camera the size of the browser window
  // and place it 100 units away, looking towards the center of the scene
  camera = new THREE.PerspectiveCamera( 
    fov, 
    window.innerWidth / window.innerHeight, 
    1, 
    10000 );
  camera.position.z = 100;
  
  camera.target = new THREE.Vector3( 0, 0, 0 );

  scene.add( camera );

var lights = [];
lights[0] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[1] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[2] = new THREE.PointLight( 0xffffff, 1, 0 );

lights[0].position.set( 0, 200, 0 );
lights[1].position.set( 100, 200, 100 );
lights[2].position.set( -100, -200, -100 );

scene.add( lights[0] );
scene.add( lights[1] );
scene.add( lights[2] );

geo =  new THREE.IcosahedronGeometry(10,4),
 mesh = new THREE.Object3D()
      
      mesh.add( new THREE.LineSegments(
        
        new THREE.WireframeGeometry(geo),
        
        new THREE.LineBasicMaterial({
          color: 0xff0000,
          transparent: true,
          opacity: 1
        })
        
      ));
      
      mesh.add( new THREE.Mesh(
        
        geo,
        
        new THREE.MeshPhongMaterial({
          color: 0x156289,
          emissive: 0x072534,
          side: THREE.DoubleSide,
          transparent:true,
          opacity:0.8,
          shading: THREE.FlatShading
        })
        
      ));

  scene.add( mesh );
  
  // create the renderer and attach it to the DOM
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  
  container.appendChild( renderer.domElement );

  initial = mesh.children[1].geometry.vertices.slice(0);

  tick = 0;
  render();
} );

function clamp(number ,max ,min){
  return Math.max(max,Math.min(min,number));
};

function render() {
  tick+=0.01;
  renderer.render( scene, camera );

  var vertices = mesh.children[1].geometry.vertices;

  var keepRendering = false; 


  for(var i = 0; i < vertices.length; i++){

    var random = Math.random() > 0.5 ? 0.099 : -0.099;

    var z      = vertices[i].z;
    var x      = vertices[i].x;
    var y      = vertices[i].y;


    var clampz =  Math.max(-20, Math.min(20, random + z)) 
    var clampy =  Math.max(-20, Math.min(20, random + y)) 
    var clampx =  Math.max(-20, Math.min(20, random + x)) 


    // var initialValue = { x : vertices[i].x, y: vertices[i].y, z: vertices[i].z };
    // var targetValue = { x : clampx, y: clampy, z: clampz};

    // var tween  = TweenMax.to(
    //   initialValue, 0.1, 
    //   { 
    //     targetValue, 

    //     onUpdate:  function(){
    //       vertices[i].x = initialValue.x;
    //       vertices[i].y = initialValue.y;
    //       vertices[i].z = initialValue.z;
    //     },

    //     onComplete: function(){
    //       keepRendering = true;
    //     },
    //     ease:Linear.easeNone
    //   }
    // );
  


   vertices[i].z = clampz;
   vertices[i].y = clampy;
   vertices[i].x = clampx;

    // + Math.sin((( initial[i].z - z ) * 0.08) + random)
  }
  mesh.children[1].geometry.verticesNeedUpdate = true;

  mesh.rotation.x += 0.001;
  mesh.rotation.y += 0.005;
  scale = Math.cos(tick);

  mesh.children[0].scale.x = scale;
  mesh.children[0].scale.y = scale;
  mesh.children[0].scale.z = scale;

  // if(keepRendering){
    requestAnimationFrame( render );
  // }

}