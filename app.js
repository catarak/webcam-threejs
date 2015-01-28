if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
      
var camera, scene, renderer;
var geometry, material, mesh;
var videoTexture;

var lastTime = Date.now();

function setup() {
    var W = window.innerWidth, H = window.innerHeight;
    renderer = renderer = new THREE.WebGLRenderer();
    renderer.setSize( W, H );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(W / -2, W / 2,  H / 2, H / -2, -100, 100);
    geometry = new THREE.PlaneBufferGeometry( W, H );
    material  = new THREE.MeshBasicMaterial();

    // handle window resize events
    var winResize = new THREEx.WindowResize(renderer, camera);

    // create the webcamTexture
    videoTexture  = new THREEx.WebcamTexture();
    material.map = videoTexture.texture;  

    mesh  = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

function draw() {
    requestAnimationFrame( draw );

    videoTexture.update();

    renderer.render( scene, camera );

}

$(function() {
    setup();
    draw();
});