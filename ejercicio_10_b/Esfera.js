class Esfera extends THREE.Object3D
{
    constructor()
    {
        super();
        this.geometry = new THREE.SphereGeometry(5,20);
        this.material = new THREE.MeshPhongMaterial({color:0xbb0dee});


        this.figura = new THREE.Mesh(this.geometry, this.material);

        var origen = { x : 0 , y : 3 };
        var destino = { x : 30 , y : 20 };

        this.movimiento = new TWEEN. Tween(origen).to(destino, 1000);
        this.movimiento.easing (TWEEN.Easing.Quadratic.InOut);

        var that = this;
        this.movimiento.onUpdate(function()
        {
            that.figura.position.x = origen.x;
            that.figura.position.y = origen.y;
        });

        this.movimiento.onComplete (function()
        {
            origen.x = 0;
            origen.y = 3;
        });

        //this.movimiento.repeat(3);
        this.movimiento.repeat(3);
        this.movimiento.yoyo(true);

        this.add(this.figura);
        this.movimiento.start();
    }
}