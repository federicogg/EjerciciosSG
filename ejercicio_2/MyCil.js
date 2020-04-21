 
class MyCil extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var cilGeom = new THREE.CylinderGeometry( 5, 5, 5, 32 );
    // Como material se crea uno a partir de un color
    var meshMaterial = new THREE.MeshNormalMaterial({color: 0x7777ff});
    // Ya podemos construir el Mesh
    var cil = new THREE.Mesh (cilGeom, meshMaterial);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (cil);
    
  }

  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;           
      this.velocidadRz = 0.01;           

    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    
    folder.add(this.guiControls, 'sizeX', 0.1, 130, 0.1).name('Tamaño X').listen();
    folder.add(this.guiControls, 'sizeY', 0.1, 130, 0.1).name('Tamaño Y').listen();
    folder.add(this.guiControls, 'sizeZ', 0.1, 130, 0.1).name('Tamaño Z').listen();
    folder.add(this.guiControls, 'velocidadRz', 0.01, 1, 0.01).name('Velocidad Rotación Z').listen();

  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.rotation.z += this.guiControls.velocidadRz;
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}