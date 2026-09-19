const Clouds = {

    mesh: null,
    texture: null,

    createTexture() {

        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 256;

        const ctx = canvas.getContext("2d");
        const image = ctx.createImageData(canvas.width, canvas.height);

        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {

                const nx = x / canvas.width;
                const ny = y / canvas.height;

                const a = Math.sin(nx * 42 + Math.sin(ny * 9) * 3);
                const b = Math.sin(ny * 31 + nx * 7);
                const c = Math.sin((nx + ny) * 58);
                const value = (a + b + c + 3) / 6;
                const cloud = Math.max(0, (value - 0.53) * 2.4);
                const alpha = Math.min(210, cloud * 210);

                const i = (y * canvas.width + x) * 4;
                image.data[i] = 255;
                image.data[i + 1] = 255;
                image.data[i + 2] = 255;
                image.data[i + 3] = alpha;
            }
        }

        ctx.putImageData(image, 0, 0);

        return new THREE.CanvasTexture(canvas);

    },

    init(scene) {

        const geometry = new THREE.SphereGeometry(1.018, 96, 96);

        this.texture = this.createTexture();
        this.texture.wrapS = THREE.RepeatWrapping;

        const material = new THREE.MeshPhongMaterial({
            map: this.texture,
            transparent: true,
            opacity: 0.23,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        this.mesh = new THREE.Mesh(geometry, material);
        scene.add(this.mesh);

    },

    update() {

        if (!this.mesh || !Earth.mesh) return;

        this.mesh.rotation.y = Earth.mesh.rotation.y + 0.012;

    }

};
