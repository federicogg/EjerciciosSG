class Animation extends THREE.Object3D
{
    constructor(gui)
    {
        super();
        this.createGui(gui);
        this.ellipse = this.createEllipse(0);
        this.createSphere();
        
        this.createTween();
        this.add (this.ellipse);
        this.extension = 0;

    }



    createSphere()
    {
        var sphereRadius = 3;
        var geometry = new THREE.SphereGeometry(sphereRadius/2,20);
        geometry.translate (this.xRadius+sphereRadius/3,0,0);
        var material = new THREE.MeshNormalMaterial();
        this.sphereMesh = new THREE.Mesh(geometry, material);
    }

    createTween()
    {
        var origen = {x : 0};
        var destino = {x:  2*Math.PI};

        var movimientoGiratorio = new TWEEN.Tween(origen).to(destino,4000);
        var that = this;

        movimientoGiratorio.onUpdate(function()
        {
            that.sphereMesh.rotation.y = origen.x;
        });

        movimientoGiratorio.repeat(Infinity);

        var origen2 = {x: 1};
        var destino2 = {x:-1};
        var movimientoEmpuje = new TWEEN.Tween(origen2).to(destino2, 2000);
        movimientoEmpuje.easing(TWEEN.Easing.Quadratic.InOut);

        movimientoEmpuje.onUpdate(function()
        {
            that.sphereMesh.position.x = origen2.x * that.guiControls.extension;
        });

        movimientoEmpuje.yoyo(true);
        movimientoEmpuje.repeat(Infinity);

        movimientoGiratorio.start();
        movimientoEmpuje.start();

        this.add(this.sphereMesh);
    }


    createEllipse(extension)
    {
        
        var shape = new THREE.Shape();

        // shape.absellipse({aX:0, aY:0, xRadius:10, yRadius:10, 
        //     aStartAngle:0, aEndAngle:2*Math.PI, aClockwise:false, aRotation:0});
        var yRadius = 10;
        this.xRadius = extension + yRadius;
        shape.absellipse(0, 0, this.xRadius, yRadius, 0, 2*Math.PI, false, 0);
        var options = {
            depth: 4, bevelEnabled: true, bevelSegments: 2,
            steps: 2, bevelSize: 1, bevelThickness: 1, curveSegments: 20
        };

        var geometry = new THREE.ExtrudeGeometry(shape, options);
        geometry.rotateX(1.55);
        geometry.translate(0,4.4,0);
        var material = new THREE.MeshBasicMaterial( {opacity:0.5,transparent:true, color:0xdd98e1} );
        var ellipse = new THREE.Mesh( geometry, material );
        return ellipse;
    }

    createGui (gui)
    {
        this.guiControls = new function ()
        {
            this.extension = 0;          
        }
        var folder = gui.addFolder ('Animación');

        folder.add (this.guiControls, 'extension', 0, 20.0, 0.1).name ('Extensión').listen();
    }

    update()
    {
        if (this.extension != this.guiControls.extension)
        {
            this.remove(this.ellipse);
            this.ellipse = this.createEllipse(this.guiControls.extension); 
            this.add(this.ellipse);
            this.extension = this.guiControls.extension;
        }
    }
}