const Earth = {

    mesh: null,
    material: null,
    texture: null,
    sunDirection: new THREE.Vector3(),
    autoRotate: true,

    init(scene) {

        const loader = new THREE.TextureLoader();

        this.texture = loader.load("assets/textures/earth_day.jpg");

        const geometry = new THREE.SphereGeometry(1, 96, 96);

        this.material = new THREE.ShaderMaterial({

            uniforms: {
                dayTexture: { value: this.texture },
                sunDirection: { value: new THREE.Vector3(1, 0, 0) },
                nightColor: { value: new THREE.Color(0x020812) },
                atmosphereColor: { value: new THREE.Color(0x4da6ff) }
            },

            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vWorldPosition;

                void main() {
                    vUv = uv;
                    vNormal = normalize(mat3(modelMatrix) * normal);
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * viewMatrix * worldPosition;
                }
            `,

            fragmentShader: `
                uniform sampler2D dayTexture;
                uniform vec3 sunDirection;
                uniform vec3 nightColor;
                uniform vec3 atmosphereColor;

                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vWorldPosition;

                void main() {
                    vec3 base = texture2D(dayTexture, vUv).rgb;
                    vec3 normal = normalize(vNormal);
                    vec3 sun = normalize(sunDirection);

                    float light = dot(normal, sun);
                    float day = smoothstep(-0.16, 0.22, light);
                    float twilight = smoothstep(-0.30, 0.12, light) * (1.0 - day);

                    vec3 night = base * nightColor * 2.5;
                    vec3 twilightColor = mix(night, base * vec3(0.22, 0.34, 0.55), twilight);
                    vec3 color = mix(twilightColor, base, day);

                    float viewDot = max(dot(normal, normalize(cameraPosition - vWorldPosition)), 0.0);
                    float rim = pow(1.0 - viewDot, 3.5) * 0.20;
                    color += atmosphereColor * rim;

                    gl_FragColor = vec4(color, 1.0);
                }
            `
        });

        this.mesh = new THREE.Mesh(geometry, this.material);
        scene.add(this.mesh);

    },

    update() {

        if (!this.mesh || !this.material || !Sun.light) return;

        if (this.autoRotate) {
            this.mesh.rotation.y += 0.00045;
        }

        // Converte a direção do Sol para o espaço local da Terra.
        const worldSun = Sun.light.position.clone().normalize();
        this.sunDirection.copy(worldSun);
        this.mesh.worldToLocal(this.sunDirection.multiplyScalar(2));
        this.sunDirection.normalize();

        this.material.uniforms.sunDirection.value.copy(this.sunDirection);

    }

};
