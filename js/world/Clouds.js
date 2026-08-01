const Clouds = {

    mesh: null,

    init(scene) {

        const geometry = new THREE.SphereGeometry(1.015, 64, 64);

        const material = new THREE.MeshPhongMaterial({

            color: 0xffffff,

            transparent: true,

            opacity: 0.08

        });

        this.mesh = new THREE.Mesh(
            geometry,
            material
        );

        scene.add(this.mesh);

    },

    update() {

        if (!this.mesh || !Earth.mesh) return;

        this.mesh.rotation.y += 0.0012;

    }

};