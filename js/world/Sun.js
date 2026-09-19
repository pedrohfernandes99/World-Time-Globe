const Sun = {

    mesh: null,
    light: null,
    corona: null,
    angle: 0,

    init(scene) {

        const geometry = new THREE.SphereGeometry(0.22, 40, 40);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffe58a
        });

        this.mesh = new THREE.Mesh(geometry, material);
        scene.add(this.mesh);

        const coronaGeometry = new THREE.SphereGeometry(0.34, 32, 32);
        const coronaMaterial = new THREE.MeshBasicMaterial({
            color: 0xffc44d,
            transparent: true,
            opacity: 0.16,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
        scene.add(this.corona);

        this.light = new THREE.DirectionalLight(0xffffff, 2.2);
        this.light.position.set(8, 2, 5);
        scene.add(this.light);

    },

    update() {

        if (!this.mesh || !this.light) return;

        this.angle += 0.000035;
        const radius = 8;

        this.mesh.position.set(
            Math.cos(this.angle) * radius,
            Math.sin(this.angle * 0.62) * 2.8,
            Math.sin(this.angle) * radius
        );

        this.corona.position.copy(this.mesh.position);
        this.light.position.copy(this.mesh.position);

    }

};
