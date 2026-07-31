const Stars = {

    points: null,

    init(scene) {

        const geometry = new THREE.BufferGeometry();

        const vertices = [];

        for (let i = 0; i < 5000; i++) {

            const x = (Math.random() - 0.5) * 400;
            const y = (Math.random() - 0.5) * 400;
            const z = (Math.random() - 0.5) * 400;

            vertices.push(x, y, z);

        }

        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices, 3)
        );

        const material = new THREE.PointsMaterial({

            color: 0xffffff,
            size: 0.6,
            sizeAttenuation: true

        });

        this.points = new THREE.Points(
            geometry,
            material
        );

        scene.add(this.points);

    }

};