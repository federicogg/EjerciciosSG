class MyBox extends THREE.Object3D
{

    constructor (gui, titleGUI)
    {
        super();
        

        this.createGUI(gui, titleGUI);

        //Geometria
        var boxGeom = new THREE.BoxGeometry (5,5,5);

        //Material
        var boxMat = new THREE.MeshNormalMaterial({flatShading:true});

        //Malla (Geometria y material)
        var box = new THREE.Mesh (boxGeom,boxMat);
        box.material.needsUpdate = true;


        //Lo añadimos como hijo del Object3D
        this.add(box);


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

