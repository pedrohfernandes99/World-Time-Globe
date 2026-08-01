const Input = {

    mouse: new THREE.Vector2(),

    raycaster: new THREE.Raycaster(),

    init() {

        window.addEventListener("mousemove", (event) => {

            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;

            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        });

    }

};