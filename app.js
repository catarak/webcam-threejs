if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
      
var camera, scene, renderer;
var geometry, material, mesh;
var videoTexture;
var composer;

var lastTime = Date.now();

function setup() {
    var W = window.innerWidth, H = window.innerHeight;
    renderer = renderer = new THREE.WebGLRenderer();
    // renderer.setSize( W, H );
    // document.body.appendChild( renderer.domElement );
    charSet = " \u2B1C\u2709\u2B1B";
    effect = new THREE.AsciiEffect( renderer, charSet);
    effect.setSize( W, H );
    document.body.appendChild( effect.domElement );

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

    //postprocessing
    // composer = new THREE.EffectComposer( renderer );
    // composer.addPass( new THREE.RenderPass( scene, camera ) );

    // var dotScreenEffect = new THREE.ShaderPass( THREE.DotScreenShader );
    // dotScreenEffect.uniforms[ 'scale' ].value = 4;
    // composer.addPass( dotScreenEffect );

    // var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
    // effect.uniforms[ 'amount' ].value = 0.0015;
    // effect.renderToScreen = true;
    // composer.addPass( effect );

    // glitchPass = new THREE.GlitchPass();
    // glitchPass.renderToScreen = true;
    // composer.addPass( glitchPass );

}

function draw() {
    requestAnimationFrame( draw );

    videoTexture.update();

    // composer.render( );
    effect.render( scene, camera );
    $("body div").emojify();

}

$(function() {
    setup();
    draw();
});