const Countries = {

    group: null,

    init(scene) {

        this.group = new THREE.Group();

        scene.add(this.group);

        this.createCountries();

    },

    createCountries() {

        if (!CountryLoader.data) {

            console.error("GeoJSON não carregado.");

            return;

        }

        console.log("Criando países...");

        CountryLoader.data.features.forEach(country => {

            console.log(country.properties);

        });

    },

    update() {

    }

};