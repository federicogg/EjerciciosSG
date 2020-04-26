class Jet extends THREE.Object3D
{
    constructor()
    {
        super();

        

        this.createModel();
        this.createSpline();
        this.createRightTween();
        
    }

    createSpline() {

        this.spline = new THREE.CatmullRomCurve3(
            [new THREE.Vector3(0, 5, 0), new THREE.Vector3(4, 5., -5), new THREE.Vector3(10, 5, 0),
            new THREE.Vector3(3, 5., 3), new THREE.Vector3(0, 5., 0)]);

    }


    createRightTween() {

        var origen = { x: 0, y: 5, z: 0 };
        this.parametro = 0;
        var destino = this.spline.getPointAt(1);
        this.movimiento = new TWEEN.Tween(origen).to(destino, 4000);
        this.movimiento.easing(TWEEN.Easing.Quadratic.InOut);

        var that = this;
    
        this.movimiento.onUpdate(function () {
            var posicion = that.spline.getPointAt(that.parametro);
            that.jet.position.copy(posicion);
            
            var tangente = that.spline.getTangentAt(that.parametro);
            posicion.add(tangente);
            that.jet.lookAt(posicion);

            var time = Date.now();
            var looptime = 4000;
            that.parametro = (time % looptime) / looptime;
        });
    
        this.movimiento.repeat(Infinity);
        this.add(this.jet);
        this.movimiento.start();
    }
      
    createModel() {

        this.jet = new THREE.Object3D();
        var that = this.jet ;
        var objectLoader = new THREE.OBJLoader();
        objectLoader.load( 'jet/jetanima.obj',
        function ( object ) {
            var modelo = object;
            that.add(modelo) ;
        } , null , null ) ;

        
    }
      
    createSphere()
    {
        var material = new THREE.MeshPhongMaterial({color:0x990808});
        var geometry = new THREE.SphereGeometry(0.5,20,20);
        
        this.sphere = new THREE.Mesh(geometry,material);

    }
}