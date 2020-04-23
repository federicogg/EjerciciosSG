class Esfera extends THREE.Object3D
{
    constructor(gui)
    {
        super();
        this.createGUI(gui,"Animación");
        this.radio = 20.0;
        this.sphereRadius = 3;
        this.desajuste = 0.0;
        this.subiendo = true;

        this.geometry = new THREE.SphereGeometry(this.sphereRadius/2,20);
        this.geometry.translate(this.radio, this.sphereRadius,0);
        this.material = new THREE.MeshPhongMaterial({color:0xbb0dee});
        this.sphere = new THREE.Mesh(this.geometry, this.material);


        this.geometryCylinder = new THREE.CylinderGeometry(this.radio, this.radio, 40, 32);
        this.materialCylinder = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true})
        
        this.cylinder = new THREE.Mesh (this.geometryCylinder,this.materialCylinder);

        this.add(this.cylinder);
        this.add(this.sphere);
    }


    createGUI (gui) {

        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
            this.radio = 20.0;
            this.velocidadSubida = 0.5;
            this.velocidadBajada = 0.5;
        } 

        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder ("Animación");

        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        folder.add (this.guiControls, 'radio', 5, 40.0, 1.0).name ('Radio').listen();
        folder.add (this.guiControls, 'velocidadSubida', 0.5, 2.5, 0.5).name ('VelocidadSubida').listen();
        folder.add (this.guiControls, 'velocidadBajada', 0.5, 2.5, 0.5).name ('VelocidadBajada').listen();
    
    }
      
    update () {

        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación
        if (this.desajuste >= 15)
        {
            this.subiendo = false;
            this.desajuste = 15;
        }
        else if (this.desajuste <= 0)
        {
            this.subiendo = true;
            this.desajuste = 0;
        }

        if (this.subiendo)
            this.desajuste += this.guiControls.velocidadSubida;
        else
            this.desajuste -= this.guiControls.velocidadBajada;
            

        if (this.radio != this.guiControls.radio)
        {
            
            this.remove(this.cylinder);
            
            this.geometryCylinder = new THREE.CylinderGeometry(this.guiControls.radio, this.guiControls.radio,40,32);
            this.cylinder = new THREE.Mesh (this.geometryCylinder, this.materialCylinder);
            this.radio = this.guiControls.radio;
            
            this.add(this.cylinder);
        }
        
        this.geometry = new THREE.SphereGeometry(this.sphereRadius,20);
        this.geometry.translate(this.guiControls.radio , this.sphereRadius/2 +this.desajuste , this.sphere.position.z);
        this.rotateY(this.sphere.rotation.y);

        this.remove(this.sphere);
        this.sphere = new THREE.Mesh (this.geometry,this.material);
        this.add(this.sphere);

        this.sphere.rotation.y += 0.06;

        
    }
}