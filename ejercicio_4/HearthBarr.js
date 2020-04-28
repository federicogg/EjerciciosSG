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

    constructor() {
        super();
     
        //Material
        var material = new THREE.MeshNormalMaterial({ flatShading: true });


        var path = new THREE.CatmullRomCurve3([
            new THREE.Vector3( -15, 0, 15 ),
	        new THREE.Vector3( -5, 5, 5 ),
	        new THREE.Vector3( 0, 0, 0 ),
	        new THREE.Vector3( 5, -5, 5 ),
	        new THREE.Vector3( 15, 0, 15 )
        ]);
        

        // //Shape
        var shape = this.HearthShape();
        var options = {
            depth: 2, 
            bevelEnabled: true, 
            bevelSegments: 2,
            steps: 100, 
            bevelSize: 2, 
            bevelThickness: 2,
            extrudePath:path,
            curveSegments: 30
        };


        var geometry = new THREE.ExtrudeGeometry(shape, options);
        // //var geometry = new THREE.ShapeGeometry(shape);
        geometry.rotateZ(3.1);

        var mesh = new THREE.Mesh(geometry, material);
        mesh.scale.x = 0.5;
        mesh.scale.y = 0.5;
        mesh.scale.z = 0.5;

        this.add(mesh);

    }


    update() {
        this.rotateY(0.01);
    }
}