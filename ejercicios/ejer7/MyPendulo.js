 
class MyPendulo extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();

        // Creamos la GUI
        this.createGUI(gui, titleGui);
        
        // Como material se crea uno a partir de un color
        var materialCajaVerde = new THREE.MeshPhongMaterial({color: 0x43B611});
        var materialCajaRoja = new THREE.MeshPhongMaterial({color: 0xff0000});
        var materialEjes = new THREE.MeshPhongMaterial({color: 0xCC8AF1});
        var materialCajaAzul = new THREE.MeshPhongMaterial({color: 0x2782CA});

        // Geometría cajas
        var cajas = new THREE.BoxGeometry(2.0, 1.0, 0.5);

        // Trasladamos antes de crear el mesh
        cajas.translate(0.0, -0.5, 0.0);

        // Primera caja
        this.cajaA = new THREE.Mesh(cajas, materialCajaVerde);
        this.cajaA.scale.y = 4;

        var nodo1 = new THREE.Object3D();
        nodo1.add(this.cajaA);

        // Segunda caja
        this.cajaB = new THREE.Mesh(cajas, materialCajaRoja);

        var nodo2 = new THREE.Object3D();
        nodo2.add(this.cajaB);
        nodo2.position.y = -this.guiControls.escalaPrimerPendulo+1.0;

        // Tercera caja
        this.cajaC = new THREE.Mesh(cajas, materialCajaVerde);
        this.cajaC.scale.y = 4;

        var nodo3 = new THREE.Object3D();
        nodo3.add(this.cajaC);

        // Eje del primer péndulo
        var cilindroEje1 = new THREE.CylinderGeometry(0.5, 0.5, 0.75);
        cilindroEje1.rotateX(Math.PI/2);
        cilindroEje1.translate(0.0, -2.0, 0.0);
        this.cilindroEje1Mesh = new THREE.Mesh(cilindroEje1, materialEjes);

        var nodo4 = new THREE.Object3D();
        nodo4.add(nodo1);
        nodo4.add(nodo2);
        nodo4.add(nodo3);
        nodo4.add(this.cilindroEje1Mesh);

        nodo4.position.y = 2.0;

        // Segundo péndulo
        var geoCaja = new THREE.BoxGeometry(1.0, 1.0, 0.5);
        geoCaja.translate(0.0, -0.5, 0.5);
        
        this.cajaD = new THREE.Mesh(geoCaja, materialCajaAzul);
        this.cajaD.scale.y = 10.0;
        this.cajaD.position.y = -2.0;

        var nodo5 = new THREE.Object3D();
        nodo5.add(this.cajaD);

        // Eje del segundo péndulo
        var cilindroEje2 = new THREE.CylinderGeometry(0.25, 0.25, 0.75);
        cilindroEje2.rotateX(Math.PI/2);
        cilindroEje2.translate(0.0, -3.0, 0.5);
        this.cilindroEje2Mesh = new THREE.Mesh(cilindroEje2, materialEjes);

        this.nodo6 = new THREE.Object3D();
        this.nodo6.add(nodo5);
        this.nodo6.add(this.cilindroEje2Mesh);

        var nodoFinal = new THREE.Object3D();
        nodoFinal.add(nodo4);
        nodoFinal.add(this.nodo6);

        this.add(nodoFinal);
    }

    createGUI(gui,titleGui) {
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
            this.escalaPrimerPendulo = 5.0;
            this.rotPrimerPendulo = 0.0;
            this.escalaSegundoPendulo = 10.0;
            this.rotSegundoPendulo = 0.0;
            this.posRelativa = 10.0;
        }
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder ('Primer Péndulo');
        folder.add (this.guiControls, 'escalaPrimerPendulo', 5.0, 10.0, 0.1).name ('Longitud').listen();
        folder.add (this.guiControls, 'rotPrimerPendulo', -0.5, 0.5, 0.1).name ('Rotación').listen();

        var folder2 = gui.addFolder ('Segundo Péndulo');
        folder2.add (this.guiControls, 'escalaSegundoPendulo', 10.0, 20.0, 0.1).name ('Longitud').listen();
        folder2.add (this.guiControls, 'rotSegundoPendulo', -0.5, 0.5, 0.1).name ('Rotación').listen();
        folder2.add (this.guiControls, 'posRelativa', 10, 90, 1.0).name ('Posición(%)').listen();
    }

    update() {
        this.cajaB.scale.y = this.guiControls.escalaPrimerPendulo;
        this.cajaC.position.y = -4.0-this.guiControls.escalaPrimerPendulo;
        this.rotation.z = this.guiControls.rotPrimerPendulo;
        this.cajaD.scale.y = this.guiControls.escalaSegundoPendulo;
        this.cajaD.rotation.z = this.guiControls.rotSegundoPendulo;
        this.nodo6.position.y = -(this.guiControls.escalaPrimerPendulo*this.guiControls.posRelativa/100);
    }
}