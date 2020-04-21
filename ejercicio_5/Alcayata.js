class Alcay extends THREE.Object3D
{

    constructor (gui, titleGUI)
    {
        super();

        this.createGUI(gui, titleGUI);
        var material = new THREE.MeshNormalMaterial({flatShading:true})
        
        //curva
       var curva=this.CurveShape();
        //laterales con hueco
       var lat=this.LatShape(material);
       var lat2=this.LatShape(material);

       lat.rotation.y=Math.PI*-0.5;
       lat.position.x=2;

       lat2.position.x=5;
       lat2.position.z=10;
       lat2.rotation.x=Math.PI*-0.5;


       var c = new THREE.Mesh(curva , material );      


       var group = new THREE.Group();
       group.add(c);
       group.add(lat);
       group.add(lat2);
       this.add( group );

    }
    LatShape(material){

        var extrudeSettings = {
            amount : 2,
            steps : 1,
            bevelEnabled: false,
            curveSegments: 8
        };
        var shape = new THREE.Shape();

        shape.moveTo(0,5);
        shape.lineTo(0,10);
        shape.lineTo(5,10);
        shape.lineTo(5,5);
        shape.lineTo(0,5);

        var cilShape = new THREE.Shape();
        cilShape.absarc(2.5,7.5, 0.5, 0, Math.PI * 2, 0,false);
        shape.holes.push(cilShape);

        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        var lat= new THREE.Mesh(geometry , material ); 
        
        return lat;
    }
    CurveShape(){
        var extrudeSettings = {
            amount : 5,
            steps : 1,
            bevelEnabled: false,
            curveSegments: 8,
            
        };
        var shape = new THREE.Shape();
        shape.moveTo(0,5);
        shape.lineTo(2,5);
        shape.absarc(5, 5, 3,Math.PI,1.5* Math.PI, 0,true);
        shape.lineTo(5,0);
        shape.lineTo(0,0);
        shape.lineTo(0,5);

        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        return geometry;
    }
    createGUI(gui, titleGUI)
    {
        this.guiControls = new function ()
        {
           this.sizeX = 1.0;
           this.sizeY = 1.0;
           this.sizeZ = 1.0; 
           this.velocidadRz = 0.05;           
        }

        var folder = gui.addFolder (titleGUI);

        folder.add(this.guiControls, 'sizeX', 0.1, 130, 0.1).name('Tamaño X').listen();
        folder.add(this.guiControls, 'sizeY', 0.1, 130, 0.1).name('Tamaño Y').listen();
        folder.add(this.guiControls, 'sizeZ', 0.1, 130, 0.1).name('Tamaño Z').listen();
        folder.add(this.guiControls, 'velocidadRz', 0.05, 1, 0.05).name('Velocidad Rotación Z').listen();
    }

    update ()
    {
        this.rotation.y += this.guiControls.velocidadRz;
        this.rotation.z += this.guiControls.velocidadRz;
        this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    }
}