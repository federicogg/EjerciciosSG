class HearthBarr extends THREE.Object3D {

    HearthShape() {
        var x = 0, y = 0;

        var shape = new THREE.Shape();


        shape.moveTo(x + 5, y + 5);
        shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
        shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
        shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
        shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
        shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
        shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);


        return shape;
    }

    diamondShape() {
        var shape = new THREE.Shape();

        shape.moveTo(0, 0);
        shape.lineTo(2.5, 3.75);
        shape.lineTo(0, 7.5);
        shape.lineTo(-2.5, 3.75);
        shape.lineTo(0.0);


        return shape;
    }

    constructor() {
        super();

        //Material
        var material = new THREE.MeshNormalMaterial({ flatShading: true });


        var path = new THREE.CatmullRomCurve3([
            new THREE.Vector3( 0, -10,0),
            new THREE.Vector3(-3, -7, 0),
            new THREE.Vector3( 3, -4, 0),
            new THREE.Vector3(-3, -1, 0),
            new THREE.Vector3( 3,  2, 0)
        ]);


        // //Shape
        var shape = this.HearthShape();
        var options = {
            depth: 0, bevelEnabled: true, bevelSegments: 2,
            steps: 2, bevelSize: 1, bevelThickness: 1,extrudePath:path, curveSegments: 10
        };

        //extrudePath:path

        var geometry = new THREE.ExtrudeGeometry(shape, options);
        // //var geometry = new THREE.ShapeGeometry(shape);

        var mesh = new THREE.Mesh(geometry, material);
        mesh.scale.x = 0.05;
        mesh.scale.y = 0.05;
        mesh.scale.z = 0.05;

        this.add(mesh);

    }


    update() {
        // this.translateY(0.01);
        //this.rotateY(0.01);
    }
}
