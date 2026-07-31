// ===============================
// WTG Engine
// engine.js
// ===============================

const Engine = {

    scene: null,
    camera: null,
    renderer: null,
    controls: null,

    init() {

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.camera.position.set(0, 0, 5);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.setPixelRatio(window.devicePixelRatio);

        document.body.appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        this.controls.enableDamping = true;

        // Luz principal
        const sun = new THREE.DirectionalLight(0xffffff, 2);

        sun.position.set(5, 3, 5);

        this.scene.add(sun);

        // Luz ambiente
        this.scene.add(
            new THREE.AmbientLight(0xffffff, 0.4)
        );

        window.addEventListener("resize", () => {

            this.camera.aspect =
                window.innerWidth / window.innerHeight;

            this.camera.updateProjectionMatrix();

            this.renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

        });

    },

    render() {

        this.controls.update();

        this.renderer.render(
            this.scene,
            this.camera
        );

    }

};