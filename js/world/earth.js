const Earth = {

    mesh: null,

    init(scene) {

        const loader = new THREE.TextureLoader();

        const texture = loader.load("assets/textures/earth_day.jpg");

        const geometry = new THREE.SphereGeometry(
            1,
            64,
            64
        );

        const material = new THREE.MeshPhongMaterial({
            map: texture,
            shininess: 8
        });

        this.mesh = new THREE.Mesh(
            geometry,
            material
        );

        scene.add(this.mesh);

    },

    update() {

        if (this.mesh) {

            this.mesh.rotation.y += 0.0008;

        }

    }

};