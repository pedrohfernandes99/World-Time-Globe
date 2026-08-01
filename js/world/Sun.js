const Sun = {

    mesh: null,
    light: null,

    init(scene) {

        // Esfera que representa o Sol
        const geometry = new THREE.SphereGeometry(0.25, 32, 32);

        const material = new THREE.MeshBasicMaterial({
            color: 0xffdd55
        });

        this.mesh = new THREE.Mesh(geometry, material);

        // Posição inicial do Sol
        this.mesh.position.set(8, 0, 0);

        scene.add(this.mesh);

        // Luz do Sol
        this.light = new THREE.DirectionalLight(0xffffff, 2);

        this.light.position.copy(this.mesh.position);

        scene.add(this.light);

    },

    update() {

        // Nesta Sprint o Sol ficará parado.
        // Na próxima ele começará a se mover.

    }

};