class MyScene extends THREE.Scene {
    constructor (myCanvas) {
      super();
      
      // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
      this.renderer = this.createRenderer(myCanvas);
      
      this.gui = this.createGUI ();

      this.createLights ();
      
      this.createCamera ();
      
      
      this.axis = new THREE.AxesHelper (7);
      this.add (this.axis);

      this.addDiamond();
      this.addHearth();
      this.addHearthB();

      this.rotacion = new THREE.Object3D();
      this.rotacion.add(this.diamond);
      this.rotacion.add(this.hearth);

      this.add(this.rotacion);
    }

    addHearth ()
    {
      this.hearth = new Hearth();
      this.hearth.position.x = -15;
      this.add (this.corazon);
    }
    addHearthB(){
      this.hearthb = new HearthBarr();
      this.hearthb.position.x = 30;
      this.add (this.hearthb);
    }
    addDiamond()
    {
      this.diamond = new Diamond();
      this.diamond.position.x = 15;
      this.add(this.diamond);
    }

    

    
    createCamera () {
      // Para crear una cámara le indicamos
      //   El ángulo del campo de visión en grados sexagesimales
      //   La razón de aspecto ancho/alto
      //   Los planos de recorte cercano y lejano
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      // También se indica dónde se coloca
      this.camera.position.set (0, 20, 40);
      // Y hacia dónde mira
      var look = new THREE.Vector3 (0,0,0);
      this.camera.lookAt(look);
      this.add (this.camera);
      
      // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
      this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);
      // Se configuran las velocidades de los movimientos
      this.cameraControl.rotateSpeed = 5;
      this.cameraControl.zoomSpeed = -2;
      this.cameraControl.panSpeed = 0.5;
      // Debe orbitar con respecto al punto de mira de la cámara
      this.cameraControl.target = look;
    }
    
    
    createGUI () {
        // Se crea la interfaz gráfica de usuario
        var gui = new dat.GUI();
      
        // La escena le va a añadir sus propios controles. 
        // Se definen mediante una   new function()
        // En este caso la intensidad de la luz y si se muestran o no los ejes
        this.guiControls = new function() {
        // En el contexto de una función   this   alude a la función
        this.lightIntensity = 0.5;
        this.axisOnOff = true;
      }
  
      // Se crea una sección para los controles de esta clase
      var folder = gui.addFolder ('Luz y Ejes');
      
      // Se le añade un control para la intensidad de la luz
      folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
      
      // Y otro para mostrar u ocultar los ejes
      folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');
      
      return gui;
    }
    
    createLights () {

      var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
      // La añadimos a la escena
      this.add (ambientLight);
      
      this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
      this.spotLight.position.set( 60, 60, 40 );
      this.add (this.spotLight);
    }
    
    createRenderer (myCanvas) {
      // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
      
      // Se instancia un Renderer   WebGL
      var renderer = new THREE.WebGLRenderer();
      
      // Se establece un color de fondo en las imágenes que genera el render
      renderer.setClearColor(new THREE.Color(0xB1A9BE), 1.0);
      
      // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // La visualización se muestra en el lienzo recibido
      $(myCanvas).append(renderer.domElement);
      
      return renderer;  
    }
    
    getCamera () {
      // En principio se devuelve la única cámara que tenemos
      // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
      return this.camera;
    }
    
    setCameraAspect (ratio) {
      // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
      // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
      this.camera.aspect = ratio;
      // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
      this.camera.updateProjectionMatrix();
    }
    
    onWindowResize () {
      // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
      // Hay que actualizar el ratio de aspecto de la cámara
      this.setCameraAspect (window.innerWidth / window.innerHeight);
      
      // Y también el tamaño del renderizador
      this.renderer.setSize (window.innerWidth, window.innerHeight);
    }
  
    update () {

      requestAnimationFrame(() => this.update())
      this.spotLight.intensity = this.guiControls.lightIntensity;
      this.axis.visible = this.guiControls.axisOnOff;
      

      this.cameraControl.update();

      this.rotacion.rotation.z += 0.01;
      this.diamond.rotation.z -= 0.01;
      this.hearth.rotation.z -= 0.01;

      this.hearth.update();
      this.diamond.update();
      this.hearthb.update();
      
      this.renderer.render (this, this.getCamera());
    }
  }
  
  /// La función   main
  $(function () {
    
    // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
    var scene = new MyScene("#WebGL-output");
  
    // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
    window.addEventListener ("resize", () => scene.onWindowResize());
    
    // Que no se nos olvide, la primera visualización.
    scene.update();
  });
