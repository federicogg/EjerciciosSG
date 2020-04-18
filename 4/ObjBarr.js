class ObjBarr extends THREE.Object3D {

    createShape() {
        var x = 0, y = 0;

        var shape = new THREE.Shape();

        //shape.bezierCurveTo(0,0,3,0,1,1);

        shape.moveTo(x + 5, y + 5);
        shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
        shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
        shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
        shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
        shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
        shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

        return shape;
    }

    constructor(gui, titleGUI) {
        super();

        this.createGUI(gui, titleGUI);

        //Material
        var material = new THREE.MeshNormalMaterial({ flatShading: true });


        var shape = this.createShape();
        var options = {amount:1, steps : 1 , curveSegments : 10 , bevelThickness : 4 , bevelSize : 1 , bevelSegments : 2};
        var geometry = new THREE.ExtrudeGeometry(shape,options);
        //var geometry = new THREE.ShapeGeometry(shape);
        var mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }



    createGUI(gui, titleGUI) {

    }

    update() {

    }
}
