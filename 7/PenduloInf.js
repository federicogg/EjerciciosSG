class PenduloInf extends THREE.Object3D {

    constructor(gui,titleGui) {
        super();
      
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        this.h = 3;
        this.w = 1;

        var geometry = new THREE.BoxGeometry(this.w,this.h, this.w/2);
        geometry.translate(0,-this.h/3,0);
        var material = new THREE.MeshPhongMaterial({color:0x6f6c6b});

        this.mesh = new THREE.Mesh(geometry,material);
        

        this.add(this.mesh);
    
    }
    
    createGUI (gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
            this.escala = 1.0;
            this.rotacion = 0.0;
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'escala', 1.0, 5.0, 0.1).name ('Escala').listen();
        folder.add (this.guiControls, 'rotacion', -0.7, 0.7, 0.01).name ('Rotacion').listen();
    }
    
    update () {
        // Con independencia de cómo se escriban las siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación

        this.rotation.z = this.guiControls.rotacion;
    }
}