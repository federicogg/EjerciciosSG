

//Geometria basica 

//Federico García Garrido

class MyEscene extends THREE.Scene
{
    constructor (myCanvas)
    {
        super();

        this.renderer = this.createRenderer(myCanvas);

        this.gui = this.createGUI();

        this.createLights();

        this.createCamera();

        this.createGround();

        this.axis = new THREE.AxesHelper(5);
        this.add (this.axis);

        //this.model = new MyBox (this.gui, "Controles");
        //this.add (this.model);
    }

    createCamera()
    {
        //creamos la cámara
        this.camera = new THREE.PerspectiveCamera (45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(20,10,20);

        //Hacemos que mire al 000
        var look = new THREE.Vector3(0,0,0);
        this.camera.lookAt(look);
        this.add (this.camera);

        //Control de la camara
        this.cameraControl = new THREE.TrackBallControl (this.camera, this.renderer.domElement);

        //Velocidad de movimientos de la camara
        this.cameraControl.rotateSpeed = 5;
        this.cameraControl.zoomSpeed = -2;
        this.cameraControl.panSpeed = 0.5;
        // Debe orbitar con respecto al punto de mira de la cámara
        this.cameraControl.target = look;
    }

    createGround()
    {
        var geometryGround = new THREE.BoxGeometry (50,0.2,50);

        //Material con textura de madera
        var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
        var materialGround = new THREE.MeshPhongMaterial ({map: texture});

        //Construimos el mesh
        var ground = new THREE.mesh (geometryGround , materialGround);

        //Centrada en el origen
        ground.position.y = -0.1;

        this.add (ground);
    }

    createGUI ()
    {
        //creamos la gui
        var gui = new dat.GUI();

        //añadimos controles a la gui para la escena
        //en concreto si queremos los ejes
        //y la intensidad de la luz
        this.guiControls = new function()
        {
            this.lightIntesity = 0.5;
            this.axisOnOff = true;
        }

        //Creamos una sección de los controles
        var folder = gui.addFolder ('Luz y ejes');

        //añadimos a la sección sus subapartados
        folder.add (this.guiControls, 'lightIntesity', 0,1,0.1).name('Intensidad de la luz: ');

        folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');

        return gui;
    }

    createLights (){

        //Luz ambiental
        var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
        this.add(ambientLight);

        //Luz focal
        this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
        this.spotLight.position.set(60,60,40);
        this.add (this.spotLight);
    }

    createRenderer (myCanvas){

        //Se instancia un renderer WebGL
        var renderer = new THREE.WebGLRenderer();

        //Se establece un color de fonde de las imágenes
        renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

        //Se establece el tamaño (toda la ventana)
        renderer.setSize(window.innerWidth, window.innerHeight);

        //Se muestra en el lienzo recibido
        $(myCanvas).append(renderer.domElement);

        return renderer;
    }

    getCamera(){
        return this.camera;
    }

    setCameraAspect (ratio){
        this.camera.aspect = ratio;

        this.camera.updateProjectionMatrix();
    }

    onWindowResize () {
        this.setCameraAspect (window.innerWidth, window.innerHeight);

        this.renderer.setSize (window.innerWidth, window.innerHeight);
    }

    update () {

        //Cada vez que se refresque llamamos al método update
        requestAnimationFrame (() => this.update())

        //Se actualiza con cada frame
        this.spotLight.intensity = this.guiControls.lightIntesity;
        this.axis.visible = this.guiControls.axisOnOff;
        this.cameraControl.update();

        //this.model.update();

        //visualizar la escena con la cámara que te estoy pasando
        this.renderer.render(this, this.getCamera());
    }
}

$(function (){
    var scene = new MyScene ("#WebGL-output");

    window.addEventListener ("resize", () => scene.onWindowResize());

    scene.update();
});
