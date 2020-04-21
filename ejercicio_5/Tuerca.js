class Tuerca extends THREE.Object3D
{
    constructor (gui, titleGUI)
    {
        super();
        
        this.createGUI(gui, titleGUI);

        var extrudeSettings = {
            amount : 2,
            steps : 1,
            bevelEnabled: false,
            curveSegments: 8,
            
        };
        var material = new THREE.MeshNormalMaterial({flatShading:true})
        
        var geometry=this.creaHex(extrudeSettings);
        var ins=this.creaEspiral(material);

        var c = new THREE.Mesh(geometry , material ); 
        
        this.add(c);
        this.add(ins);

    }
    creaHex(extrude){
         
        var shape = new THREE.Shape();
        shape.moveTo(0,2);
        shape.lineTo(2,0);
        shape.lineTo(4,0);
        shape.lineTo(6,2);
        shape.lineTo(6,4);
        shape.lineTo(4,6);
        shape.lineTo(2,6);
        shape.lineTo(0,4);
        shape.lineTo(0,2);
        var cilPShape = new THREE.Path();
        cilPShape.absarc(3, 3, 2, 0, Math.PI * 2, true);
        shape.holes.push(cilPShape);

        var geometry = new THREE.ExtrudeGeometry(shape, extrude);
        return geometry;
    }
    creaEspiral(material){
        var geometry = new THREE.TorusGeometry( 2, 0.2, 16, 100 );
        var group = new THREE.Group();

        for(var i=0;i<9;i++){
        var e=  new THREE.Mesh(geometry , material ); 
        e.position.x=3;
        e.position.y=3;
        e.position.z=1.8-(0.2*i);
        group.add(e);
        }
        return group;
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