class Diamond extends THREE.Object3D {


    diamondShape() {
        var shape = new THREE.Shape();

        shape.moveTo(0, 0);
        shape.lineTo(5, 7.5);
        shape.lineTo(0, 15);
        shape.lineTo(-5, 7.5);
        shape.lineTo(0.0);


        return shape;
    }

    constructor() {
        super();

        //Material
        var material = new THREE.MeshStandardMaterial({color:0xe71111});

        // //Shape
        var shape = this.diamondShape();

        var options = {
            depth: 0, bevelEnabled: true, bevelSegments: 2,
            steps: 2, bevelSize: 1, bevelThickness: 1, curveSegments: 10
        };

        //Geometria
        this.geometry = new THREE.ExtrudeGeometry(shape, options);

        //Malla
        this.mesh = new THREE.Mesh(this.geometry, material);
        this.mesh.scale.x = 0.75;
        this.mesh.scale.y = 0.75;
        this.mesh.scale.z = 0.75;

        this.add(this.mesh);

    }


    update() {
        this.mesh.rotation.y += 0.01;
    }
}
