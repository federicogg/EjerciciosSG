class Jet extends THREE.Object3D {
    constructor() {
        super();



        this.createModel();
        this.createSpline();
        //this.createSphere();
        this.createTweens();

    }

    createSpline() {

        this.spline = new THREE.CatmullRomCurve3(
            [new THREE.Vector3(0, 5, 0), new THREE.Vector3(4, 5, -5), new THREE.Vector3(10, 5, 0),
            new THREE.Vector3(3, 5, 3), new THREE.Vector3(0, 5, 0), new THREE.Vector3(-4, 5, -5), new THREE.Vector3(-10, 5, 0),
            new THREE.Vector3(-3, 5, 3), new THREE.Vector3(0, 5, 0)]);

    }



    createTweens() {

        var origen = {x:0.0};
        this.parametro = 0;
        var destino = {x:0.5};
        this.loop1 = 4000;
        this.movimiento = new TWEEN.Tween(origen).to(destino, this.loop1);
        this.movimiento.easing(TWEEN.Easing.Quadratic.InOut);

        var that = this;

        this.movimiento.onUpdate(function () {
            that.parametro = origen.x;
            var posicion = that.spline.getPointAt(that.parametro);
            that.jet.position.copy(posicion);

            var tangente = that.spline.getTangentAt(that.parametro);
            posicion.add(tangente);
            that.jet.lookAt(posicion);

        });

        this.loop2 = 8000;
        var origen2 = {x:0.5};
        var destino2 = {x:1};
        this.movimiento2 = new TWEEN.Tween(origen2).to(destino2, this.loop2);
        this.movimiento2.easing(TWEEN.Easing.Quadratic.InOut);

        this.movimiento2.onUpdate(function (){
            that.parametro = origen2.x;
            var posicion = that.spline.getPointAt(that.parametro);
            that.jet.position.copy(posicion);

            var tangente = that.spline.getTangentAt(that.parametro);
            posicion.add(tangente);
            that.jet.lookAt(posicion);

        });

        this.movimiento.chain(this.movimiento2);
        this.movimiento2.chain(this.movimiento);
        this.add(this.jet);
        this.movimiento2.start();
    }

    createModel() {

        this.jet = new THREE.Object3D();
        var that = this.jet;
        var objectLoader = new THREE.OBJLoader();
        objectLoader.load('jet/jetanima.obj',
            function (object) {
                var modelo = object;
                that.add(modelo);
            }, null, null);


    }

    createSphere() {
        var material = new THREE.MeshPhongMaterial({ color: 0x990808 });
        var geometry = new THREE.SphereGeometry(0.5, 20, 20);

        this.sphere = new THREE.Mesh(geometry, material);

    }
}