 
class MyCone extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var conGeom = new THREE.ConeGeometry( 5, 7, 32 );
    // Como material se crea uno a partir de un color
    var meshMaterial = new THREE.MeshNormalMaterial({color: 0x7777ff});
    // Ya podemos construir el Mesh
    var cone = new THREE.Mesh (conGeom, meshMaterial);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (cone);
    
    
  }
  createGUI(gui, titleGUI)
  {
      this.guiControls = new function ()
      {
         this.sizeX = 1.0;
         this.sizeY = 1.0;
         this.sizeZ = 1.0; 
         this.velocidadRz = 0.01;           
      }

      var folder = gui.addFolder (titleGUI);

      folder.add(this.guiControls, 'sizeX', 0.1, 130, 0.1).name('Tamaño X').listen();
      folder.add(this.guiControls, 'sizeY', 0.1, 130, 0.1).name('Tamaño Y').listen();
      folder.add(this.guiControls, 'sizeZ', 0.1, 130, 0.1).name('Tamaño Z').listen();
      folder.add(this.guiControls, 'velocidadRz', 0.01, 1, 0.01).name('Velocidad Rotación Z').listen();
  }

  update ()
  {
      this.rotation.z += this.guiControls.velocidadRz;
      this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}