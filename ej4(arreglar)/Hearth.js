class Hearth extends THREE.Object3D {

    hearthShape() {
        
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
        var material = new THREE.MeshNormalMaterial({flatShading:true});

        // //Shape
        var shape = this.hearthShape();

        var options = {
            depth: 0, bevelEnabled: true, bevelSegments: 2,
            steps: 2, bevelSize: 1, bevelThickness: 1, curveSegments: 10
        };

        //Geometria
        this.geometry = new THREE.ExtrudeGeometry(shape, options);
        this.geometry.translate(-5,0,0);
        this.geometry.rotateZ(3.1);
        this.geometry.translate(1,20,0);

        //Malla
        this.mesh = new THREE.Mesh(this.geometry, material);
        this.mesh.scale.x = 0.5;
        this.mesh.scale.y = 0.5;
        this.mesh.scale.z = 0.5;
        //var geometry = new THREE.ShapeGeometry(shape);

        this.add(this.mesh);

    }


    update() {
        this.mesh.rotation.y += 0.01;
    }
}
