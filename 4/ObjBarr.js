class ObjBarr extends THREE.Object3D
{

    constructor (gui, titleGUI)
    {
        super();

        this.createGUI(gui, titleGUI);

        //Material
        var material = new THREE.MeshNormalMaterial({flatShading:true});


        //Geometria
        var shape = new THREE.Shape();
        shape.moveTo (10,10);
        shape.lineTo(20,10);
        shape.quadraticCurveTo (30,10,30,20); 
        //var pts = [];
        //var path = new THREE.CatmullRomCurve3 (pts);
        var options = { amount:8, steps:2, curveSegments:4 ,
            bevelThickness:4, bevelSize:2, bevelSegments:2};
        var geometry = new THREE.ExtrudeGeometry (shape,options);


        //Malla
        var latheObject = new THREE.Mesh (geometry, material);



        //Lo añadimos como hijo del Object3D
        this.add(latheObject);

    }

    createGUI(gui, titleGUI)
    {
       
    }

    update ()
    {

    }
}
