

class ObjRev extends THREE.Object3D {

    constructor(gui, titleGUI) {
        super();

        this.createGUI(gui, titleGUI);

        //Material
        this.material = new THREE.MeshNormalMaterial({ flatShading: true });

        this.resolucion = this.guiControls.resolucion;

        
        this.points = [];
        this.points.push(new THREE.Vector3(1.0, -1.4, 0));
        this.points.push(new THREE.Vector3(1.0, -1.1, 0));
        this.points.push(new THREE.Vector3(0.5, -0.7, 0));
        this.points.push(new THREE.Vector3(0.4, -0.4, 0));
        this.points.push(new THREE.Vector3(0.4, 0.5, 0));
        this.points.push(new THREE.Vector3(0.5, 0.6, 0));
        this.points.push(new THREE.Vector3(0.3, 0.6, 0));
        this.points.push(new THREE.Vector3(0.5, 0.8, 0));
        this.points.push(new THREE.Vector3(0.55, 1.0, 0));
        this.points.push(new THREE.Vector3(0.5, 1.2, 0));
        this.points.push(new THREE.Vector3(0.3, 1.4, 0));
        


        this.latheObject = new THREE.Mesh(
            new THREE.LatheGeometry(this.points,this.resolucion,0,2*Math.PI), this.material);

        // var lineGeometry = new THREE.Geometry();
        // lineGeometry.vertices = poithis.pointsnts;
        // var line = new THREE.Line(lineGeometry, material);

        //this.add(line);
        this.add(this.latheObject);

    }

    createGUI(gui, titleGUI) {

        this.guiControls = new function ()
        {
           this.resolucion = 20.0;
           this.angulo = 2*Math.PI;         
        }

        var folder = gui.addFolder (titleGUI);

        folder.add(this.guiControls, 'resolucion', 20, 100, 1).name('Resolución').listen();
    }

    update() {
        this.resolucion = this.guiControls.resolucion;
        this.remove(this.latheObject);
        this.latheObject = new THREE.Mesh(
            new THREE.LatheGeometry(this.points,this.resolucion,0,2*Math.PI), this.material);
        this.add(this.latheObject);
    }
}
