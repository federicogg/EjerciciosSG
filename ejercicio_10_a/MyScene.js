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

      
      this.createGround();
      this.crearTierra();
      this.crearSatelite1();
      this.crearSatelite2();
      this.crearSatelite3();
      this.rotacion = new THREE.Object3D();
      this.rotacion.add(this.satelite2);
      this.rotacion.add(this.satelite3);
      this.add(this.rotacion);
    }

    crearSatelite1()
    {
      var textureLoader = new THREE.TextureLoader();
      var texture = textureLoader.load('../imgs/cara.jpg');
      var material = new THREE.MeshPhongMaterial ({map: texture});

      var radio = 2;
      var geometry = new THREE.SphereGeometry(radio, 20);
      geometry.rotateY(Math.PI);
      geometry.translate(10,0,0);

      this.satelite1Mesh =  new THREE.Mesh (geometry,material);

      this.satelite1 = new THREE.Object3D();
      this.satelite1.add (this.satelite1Mesh);

      this.satelite1.position.y=radio;
      this.add(this.satelite1);

    }

    crearSatelite2()
    {
      var textureLoader = new THREE.TextureLoader();
      var texture = textureLoader.load('../imgs/cara.jpg');
      var material = new THREE.MeshPhongMaterial ({map: texture});

      var radio = 2;
      var geometry = new THREE.SphereGeometry(radio, 20);
      geometry.rotateY(Math.PI);

      this.satelite2Mesh =  new THREE.Mesh (geometry,material);

      this.satelite2 = new THREE.Object3D();
      this.satelite2.add (this.satelite2Mesh);

      this.satelite2.position.y = radio;
      this.satelite2.position.x = 20;

    }

    crearSatelite3()
    {
      var textureLoader = new THREE.TextureLoader();
      var texture = textureLoader.load('../imgs/cara.jpg');
      var material = new THREE.MeshPhongMaterial ({map: texture});

      var radio = 2;
      var geometry = new THREE.SphereGeometry(radio, 20);
      geometry.rotateY(-1.5);

      this.satelite3Mesh = new THREE.Mesh (geometry,material);

      this.satelite3 = new THREE.Object3D();
      this.satelite3.add (this.satelite3Mesh);

      this.satelite3.position.y=radio;
      this.satelite3.position.x = 30;
    }

    crearTierra()
    {
      var textureLoader = new THREE.TextureLoader();
      var texture = textureLoader.load('../imgs/tierra.jpg');
      var material = new THREE.MeshPhongMaterial ({map: texture});

      var radio = 3;
      var geometry = new THREE.SphereGeometry(radio, 20);

      this.tierraMesh =  new THREE.Mesh (geometry,material);

      this.tierra = new THREE.Object3D();
      this.tierra.add (this.tierraMesh);
      this.tierra.position.y = radio;
      this.tierra.rotation.y = -0.6;
      this.add(this.tierra);

    }


    update () {

      requestAnimationFrame(() => this.update())
      this.spotLight.intensity = this.guiControls.lightIntensity;
      this.axis.visible = this.guiControls.axisOnOff;
      
      //Satelite 1 y tierra
      this.satelite1.rotation.y += 0.01;
      this.tierraMesh.rotation.y += 0.01;

      //Rotación sobre el eje
      this.satelite2Mesh.rotation.y += 0.01;

      //Mirada del satélite 3 a la cámara
      this.satelite3.lookAt(this.camera.position.x,this.camera.position.y,this.camera.position.z);

      //Satelites 2 y 3
      this.rotacion.rotation.y += 0.01;

      this.cameraControl.update();

      
      this.renderer.render (this, this.getCamera());
    }


    createGround () {
      // El suelo es un Mesh, necesita una geometría y un material.
      
      // La geometría es una caja con muy poca altura
      var geometryGround = new THREE.BoxGeometry (100,0.2,100);
      
      // El material se hará con una textura de madera
      var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
      var materialGround = new THREE.MeshPhongMaterial ({map: texture});
      
      // Ya se puede construir el Mesh
      var ground = new THREE.Mesh (geometryGround, materialGround);
      
      // Todas las figuras se crean centradas en el origen.
      // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
      ground.position.y = -0.1;
      
      // Que no se nos olvide añadirlo a la escena, que en este caso es  this
      this.add (ground);
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
  
