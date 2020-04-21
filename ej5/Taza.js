class Taza extends THREE.Object3D
{

    constructor (gui, titleGUI)
    {
        super();

        this.createGUI(gui, titleGUI);
        var material = new THREE.MeshNormalMaterial({flatShading:true})

        var extrudeSettings = {
            amount : 5,
            steps : 5,
            bevelEnabled: false,
            curveSegments: 12
        };
        //cilindro hueco
        var cilGShape = new THREE.Shape();
        cilGShape.absarc(0, 0, 3, 0, Math.PI * 2, 0, false);

        var cilPShape = new THREE.Path();
        cilPShape.absarc(0, 0, 2.8, 0, Math.PI * 2, true);
        cilGShape.holes.push(cilPShape);

        var geometry = new THREE.ExtrudeGeometry(cilGShape, extrudeSettings);
        var cylinder = new THREE.Mesh( geometry, material );
        cylinder.rotation.x=Math.PI * (0.5);
        cylinder.position.y=5;

        //asa
        var geometryT = new THREE.TorusGeometry (1.5, 0.5, 20,20,3.1 );
        var torus = new THREE.Mesh(geometryT , material );
        torus.rotation.z=Math.PI * (0.5);
        torus.position.x=-2.9;
        torus.position.y=2.2;


        //fondo
        var fondo = new THREE.CylinderGeometry(2.9,2.9,0.2,20);
        var F = new THREE.Mesh(fondo , material );   

        
        var group = new THREE.Group();
        group.add(F);
        group.add( torus );
        group.add(cylinder);

        this.add( group );
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

