class Pendulos extends THREE.Object3D {
  constructor(gui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,"Controles de los péndulos");
    var green_Material = new THREE.MeshPhongMaterial({color:0x11e71e});
    var red_Material = new THREE.MeshPhongMaterial({color:0xee3107});

    //Geometria 1
    this.h_green = 2;
    this.w_green = 2; 
    var geometryGreen = new THREE.BoxGeometry(this.w_green, this.h_green);

    //Geometria 2
    this.h_red = 5;
    this.w_red = 2; 
    var geometryRed = new THREE.BoxGeometry(this.w_red, this.h_red);

    //Caja de arriba
    this.boxUp = new THREE.Mesh(geometryGreen,green_Material);
    
    //Caja de en medio
    this.boxMid = new THREE.Mesh(geometryRed, red_Material);
    this.boxMid.position.y = -this.h_red/2 -this.h_green/2;
    
    //Caja de abajo
    this.boxDown = new THREE.Mesh(geometryGreen, green_Material);
    this.boxDown.position.y = 2*(-this.h_green/2) - this.h_red*this.guiControls.escala;

    //Pendulo inferior
    this.h = 3;
    this.w = 1;

    var geometry = new THREE.BoxGeometry(this.w,this.h, this.w/2);
    geometry.translate(0,-this.h/3,0);
    var material = new THREE.MeshPhongMaterial({color:0x6f6c6b});

    this.boxInf = new THREE.Mesh(geometry,material);
    this.boxInf.position.z = 0.7;
    

    this.add(this.boxInf);
  
    this.add(this.boxUp);
    this.add(this.boxMid);
    this.add(this.boxDown);    
  }
  
  createGUI (gui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.escala = 1.0;
      this.rotacion = 0.0;

      this.escala2 = 1.0;
      this.rotacion2 = 0.0;

      this.posicion = 0;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.longitud = 5.0;
        this.rotacion = 0.0;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Control del péndulo superior");
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'escala', 1.0, 2.0, 0.1).name ('Escala').listen();
    folder.add (this.guiControls, 'rotacion', -0.7, 0.7, 0.01).name ('Rotación').listen();


    var folder2 = gui.addFolder ("Controles péndulo Inferior");
    folder2.add (this.guiControls, 'escala2', 1.0, 2.0, 0.1).name ('Escala').listen();
    folder2.add (this.guiControls, 'rotacion2', -0.7, 0.7, 0.01).name ('Rotación').listen();
    folder2.add (this.guiControls, 'posicion', 0, 1, 0.01).name ('Posición').listen();
  }
  
  update () {
    // Con independencia de cómo se escriban las siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.boxDown.position.y = 2*(-this.h_green/2) - this.h_red*this.guiControls.escala;
    this.boxMid.scale.y = this.guiControls.escala;
    this.boxMid.position.y = -(this.h_red*this.guiControls.escala/2)-this.h_green/2;
    this.rotation.z = this.guiControls.rotacion;


    this.boxInf.rotation.z = this.guiControls.rotacion2;
    this.boxInf.scale.y = this.guiControls.escala2;
    this.boxInf.position.y = -(this.guiControls.escala2/2)-1.5 - (this.guiControls.posicion* (4*this.guiControls.escala));
    //this.boxInf.position.y = - (this.guiControls.posicion % this.h_red);


  }
}