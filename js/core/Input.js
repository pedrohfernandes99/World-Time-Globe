const Input = {

    mouse: new THREE.Vector2(),

    raycaster: new THREE.Raycaster(),

    mouseDown: false,

    click: false,

    pointerStartX: 0,

    pointerStartY: 0,

    clickDistance: 6,

    element: null,

    init() {

        console.log("INPUT INICIADO");

        this.element = Engine.renderer.domElement;

        this.element.addEventListener("pointermove", (event) => {

            this.updateMousePosition(event);

        });

        this.element.addEventListener("pointerdown", (event) => {

            if (event.button !== 0) return;

            this.mouseDown = true;
            this.click = false;

            this.pointerStartX = event.clientX;
            this.pointerStartY = event.clientY;

            if (this.element.setPointerCapture) {
                this.element.setPointerCapture(event.pointerId);
            }

            this.updateMousePosition(event);

            console.log("MOUSE DOWN");

        });

        this.element.addEventListener("pointerup", (event) => {

            if (event.button !== 0) return;

            this.updateMousePosition(event);

            const dx = event.clientX - this.pointerStartX;
            const dy = event.clientY - this.pointerStartY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            this.mouseDown = false;

            if (distance <= this.clickDistance) {

                this.click = true;

                console.log("CLICK DETECTADO");

            }

            if (this.element.releasePointerCapture &&
                this.element.hasPointerCapture(event.pointerId)) {

                this.element.releasePointerCapture(event.pointerId);

            }

        });

        this.element.addEventListener("pointercancel", (event) => {

            this.mouseDown = false;
            this.click = false;

            if (this.element.releasePointerCapture &&
                this.element.hasPointerCapture(event.pointerId)) {

                this.element.releasePointerCapture(event.pointerId);

            }

        });

    },

    updateMousePosition(event) {

        const rect = this.element.getBoundingClientRect();

        this.mouse.x =
            ((event.clientX - rect.left) / rect.width) * 2 - 1;

        this.mouse.y =
            -((event.clientY - rect.top) / rect.height) * 2 + 1;

    },

    update() {

        this.raycaster.setFromCamera(
            this.mouse,
            Engine.camera
        );

    },

    consumeClick() {

        if (!this.click) return false;

        this.click = false;

        return true;

    }

};
