const Atmosphere = {

    mesh: null,

    init(scene) {

        const geometry = new THREE.SphereGeometry(1.03, 64, 64);

        const material = new THREE.MeshBasicMaterial({

            color: 0x4da6ff,

            transparent: true,

            opacity: 0.18,

            side: THREE.BackSide

        });

        this.mesh = new THREE.Mesh(geometry, material);

        scene.add(this.mesh);

    },

    update() {

        if (!this.mesh || !Earth.mesh) return;

        this.mesh.rotation.y = Earth.mesh.rotation.y;

        }

    };