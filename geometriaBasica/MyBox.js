class MyBox extends THREE.Object3D{

    constructor (gui, titleGUI)
    {
        super();

        //Geometria
        var boxGeom = new THREE.BoxGeometry (1,1,1);

        //Material
        var boxMat = new THREE.MeshPhongMaterial({color:0xCF0000});

        //Malla (Geometria y material)
        var box = new THREE.Mesh (boxGeom,boxMat);

        //Lo añadimos como hijo del Object3D
        this.add(box);

        box.position.y = 0.5;
    }

    
    

}

