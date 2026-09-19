const Atmosphere = {

    mesh: null,

    init(scene) {

        const geometry = new THREE.SphereGeometry(1.045, 96, 96);

        const material = new THREE.ShaderMaterial({
            uniforms: {
                glowColor: { value: new THREE.Color(0x4da6ff) }
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec3 vWorldPosition;

                void main() {
                    vNormal = normalize(mat3(modelMatrix) * normal);
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * viewMatrix * worldPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 glowColor;
                varying vec3 vNormal;
                varying vec3 vWorldPosition;

                void main() {
                    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
                    float intensity = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);
                    gl_FragColor = vec4(glowColor, intensity * 0.42);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            depthWrite: false
        });

        this.mesh = new THREE.Mesh(geometry, material);
        scene.add(this.mesh);

    },

    update() {

        if (!this.mesh || !Earth.mesh) return;

        this.mesh.rotation.copy(Earth.mesh.rotation);

    }

};
