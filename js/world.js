// ==========================
// World.js
// ==========================

const World = {

    planet: null,

    init(scene){

        const loader = new THREE.TextureLoader();

        const earthTexture = loader.load(
            "assets/textures/earth_day.jpg"
        );

        const geometry = new THREE.SphereGeometry(
            1,
            64,
            64
        );

        const material = new THREE.MeshPhongMaterial({

            map: earthTexture,

            shininess:8

        });

        this.planet = new THREE.Mesh(

            geometry,

            material

        );

        scene.add(this.planet);

    },

    update(){

        this.planet.rotation.y += 0.0008;

    }

};