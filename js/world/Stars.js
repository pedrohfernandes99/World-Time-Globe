const Stars = {

    points: null,

    init(scene) {

        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        for (let i = 0; i < 8000; i++) {

            const radius = 80 + Math.random() * 180;
            const u = Math.random() * 2 - 1;
            const theta = Math.random() * Math.PI * 2;
            const s = Math.sqrt(1 - u * u);

            vertices.push(
                radius * s * Math.cos(theta),
                radius * u,
                radius * s * Math.sin(theta)
            );

        }

        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices, 3)
        );

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.65,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.9,
            depthWrite: false
        });

        this.points = new THREE.Points(geometry, material);
        scene.add(this.points);

    },

    update() {

        if (!this.points) return;
        this.points.rotation.y += 0.000015;

    }

};
