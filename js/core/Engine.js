const Engine = {

    scene: null,
    camera: null,
    renderer: null,
    controls: null,

    init() {

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x010308);

        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.camera.position.set(0, 0, 5);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: "high-performance"
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.05;

        document.body.appendChild(this.renderer.domElement);

        this.renderer.domElement.style.position = "fixed";
        this.renderer.domElement.style.top = "0";
        this.renderer.domElement.style.left = "0";
        this.renderer.domElement.style.zIndex = "0";
        this.renderer.domElement.style.display = "block";
        this.renderer.domElement.style.touchAction = "none";

        this.controls = new THREE.OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.055;
        this.controls.enablePan = false;
        this.controls.minDistance = 2.1;
        this.controls.maxDistance = 8;
        this.controls.rotateSpeed = 0.55;
        this.controls.zoomSpeed = 0.65;

        window.addEventListener("resize", () => {

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);

        });

    },

    render() {

        this.controls.update();
        this.renderer.render(this.scene, this.camera);

    }

};
