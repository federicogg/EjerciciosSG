class MyScene extends THREE.Scene {
    constructor (myCanvas) {
      super();
      
      // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
      this.renderer = this.createRenderer(myCanvas);
      
      // Se añade a la gui los controles para manipular los elementos de esta clase
      this.gui = this.createGUI ();
      
      // Construimos los distinos elementos que tendremos en la escena
      
      // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
      // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
      this.createLights ();
      
      // Tendremos una cámara con un control de movimiento con el ratón
      this.createCamera ();
      
      // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
      this.axis = new THREE.AxesHelper (7);
      this.add (this.axis);

      this.dibujarObjRev("Controles Objeto por revolución");
      
      
    }

    dibujarObjRev (titleGUI)
    {
      this.ObjRev = new ObjRev(this.gui, titleGUI);
      this.add (this.ObjRev);
      
    }

    
    createCamera () {

      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.set (20, 10, 20);
      var look = new THREE.Vector3 (0,0,0);
      this.camera.lookAt(look);
      this.add (this.camera);

      this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);
      this.cameraControl.rotateSpeed = 5;
      this.cameraControl.zoomSpeed = -2;
      this.cameraControl.panSpeed = 0.5;

      this.cameraControl.target = look;
    }
    
    
    createGUI () {

      var gui = new dat.GUI();
      
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

      return this.camera;
    }
    
    setCameraAspect (ratio) {

      this.camera.aspect = ratio;
      // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
      this.camera.updateProjectionMatrix();
    }
    
    onWindowResize () {

      this.setCameraAspect (window.innerWidth / window.innerHeight);
      
      // Y también el tamaño del renderizador
      this.renderer.setSize (window.innerWidth, window.innerHeight);
    }
  
    update () {

      requestAnimationFrame(() => this.update())

      this.spotLight.intensity = this.guiControls.lightIntensity;

      this.axis.visible = this.guiControls.axisOnOff;

      this.cameraControl.update();

      this.renderer.render (this, this.getCamera());

      this.ObjRev.update();

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
  
