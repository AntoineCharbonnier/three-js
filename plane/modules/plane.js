function Plane( options ) {

    var options = options || {};
    
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.composer = null;
    this.container = options.container || document.body;

    this.params = {
        active: options.active || true,
        height: options.height || window.innerHeight,
        width: options.width || window.innerWidth
    };

    this.mouse = {
        x: null,
        y: null
    };

    this.clock = null;

    return this;
};

Plane.prototype.start = function() {

    var scope = this;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 45, this.params.width / this.params.height, 1, 10000 );
    this.camera.position.z = 100; 
    this.camera.target = new THREE.Vector3( 0, 0, 0 );

    this.scene.add( this.camera );

    this.addPlane();

    this.renderer = new THREE.WebGLRenderer({
        antialiasing: true
    });  

    this.renderer.setClearColor(  0xffffff, 1 );
    this.renderer.setSize( this.params.width, this.params.height );

    this.container.appendChild( this.renderer.domElement );        

    this.clock = Date.now();

    this.animate();

};

Plane.prototype.addPlane = function() {
    
    this.meshMaterial = new THREE.ShaderMaterial( {

        uniforms: { 
            time: { type: "f", value: 0 },
            noise: { type: "f", value: 0 }
        },
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        wireframe: true
        
    } );
    
    this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( 20, 20, 10, 10 ), this.meshMaterial );

    this.mesh.rotation.x = 90;
    this.mesh.scale.x = 4;
    this.mesh.scale.y = 4;
    this.scene.add( this.mesh );

};

Plane.prototype.animate = function( ts ) {

    if (this.params.active) {

        window.requestAnimationFrame( this.animate.bind(this) );

/*
        this.meshMaterial.uniforms[ 'time' ].value = .00025 * ( Date.now() - this.clock );

        var noise = this.weight * ( .5 + .5 * Math.sin( .00025 * ( Date.now() - this.clock ) ) );
        
        if ( noise <= this.weight ) {
            noise = this.weight;
        }
        
        this.meshMaterial.uniforms[ 'noise' ].value = noise;
*/  
        this.meshMaterial.uniforms[ 'time' ].value = .0025 * ( Date.now() - this.clock );

        this.render( ts );

    }
}

Plane.prototype.render = function( ts ) {

    if (!this.params.active)
        this.params.active = true;

    this.renderer.render( this.scene, this.camera );

}



module.exports = Plane;