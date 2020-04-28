class Reloj extends THREE.Object3D {
  constructor(gui) {
    super();
    

    this.createGUI(gui,"Animación");
    var geometry = new THREE.SphereGeometry();
    geometry.scale(2,2,2);
    geometry.translate(15,2,0);


    // Las instrucciones de ajuste de texturas ya se explicarán en el tema correspondiente
    var material = new THREE.MeshPhongMaterial ({color: 0xee430d});
    
    this.mesh = new THREE.Mesh(geometry,material);
    this.createTween();
    
  }
  
  createTween()
  {
    var origen = {x:0.0};
    var destino = {x:2*Math.PI};
    this.loop = 8000; //Numero de marcas x 1000ms
    this.movimiento = new TWEEN.Tween(origen).to(destino, this.loop);
    
    var that = this;
    this.movimiento.onUpdate(function()
    {
      that.mesh.rotation.y = origen.x *  that.guiControls.velocidad;
    });

    this.add(this.mesh);
    this.movimiento.repeat(Infinity);
    this.movimiento.start();
    
  }
  
  createGUI (gui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.velocidad = 1.0;
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder ("Animación");

    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    folder.add (this.guiControls, 'velocidad', -20.0, 20.0, 1.0).name ('Velocidad').listen();

  }


}
