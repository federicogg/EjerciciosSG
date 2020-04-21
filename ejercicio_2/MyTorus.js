class MyTorus extends THREE.Object3D
{

    constructor (gui, titleGUI)
    {
        super();

        this.createGUI(gui, titleGUI);

         //Geometria
         var geometry = new THREE.TorusGeometry (10, 3, 16, 100);

         //Material
         var material = new THREE.MeshNormalMaterial({flatShading:true})
 
         //Malla (Geometria y material)
         var torus = new THREE.Mesh (geometry,material);
         torus.material.needsUpdate = true;
 
         //Lo añadimos como hijo del Object3D
         this.add(torus);

    }

    createGUI(gui, titleGUI)
    {
        this.guiControls = new function ()
        {
           this.tube = 10;
           this.radialSegments = 0.1;
           this.tubularSegments = 1.0;
           this.arc = 100;  
           this.velocidadRy = 0.01;           
        }

        var folder = gui.addFolder (titleGUI);

        folder.add(this.guiControls, 'tube', 10, 100, 0.1).name('Tubo').listen();
        folder.add(this.guiControls, 'radialSegments', 3, 12, 0.1).name('radialSegments').listen();
        folder.add(this.guiControls, 'tubularSegments', 16, 100, 0.1).name('tubularSegments').listen();
        folder.add(this.guiControls, 'arc', 100, 200, 0.01).name('Arco').listen();
        folder.add(this.guiControls, 'velocidadRy', 0.01, 1, 0.01).name('Velocidad Rotación Y').listen();
    }

    update ()
    {
        this.rotation.y += this.guiControls.velocidadRz;
        this.scale.set (this.guiControls.tube,this.guiControls.radialSegments,this.guiControls.tubularSegments, this.guiControls.arc);
    }
}

