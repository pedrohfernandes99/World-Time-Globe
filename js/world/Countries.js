const Countries = {

    group: null,

    countries: [],

    radius: 1.008,

    latLngToVector3(lat, lng, radius) {

        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);

        return new THREE.Vector3(
            -(radius * Math.sin(phi) * Math.cos(theta)),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );

    },

    drawLine(coordinates) {

        const points = [];

        coordinates.forEach(coord => {

            const lng = coord[0];
            const lat = coord[1];

            points.push(
                this.latLngToVector3(lat, lng, this.radius)
            );

        });

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({
            color: 0x00ff99
        });

        return new THREE.Line(geometry, material);

    },

    init(scene) {

        this.group = new THREE.Group();

        // Adiciona as fronteiras à Terra para que girem junto
        Earth.mesh.add(this.group);

        this.createCountries();

    },

    createCountries() {

        if (!CountryLoader.data) {

            console.error("GeoJSON não carregado.");

            return;

        }

        this.countries = [];

        CountryLoader.data.features.forEach(country => {

            const geometry = country.geometry;

            const countryObject = {

                properties: country.properties,

                geometry: geometry,

                lines: []

            };

            switch (geometry.type) {

                case "Polygon":

                    geometry.coordinates.forEach(ring => {

                        const line = this.drawLine(ring);

                        this.group.add(line);

                        countryObject.lines.push(line);

                    });

                    break;

                case "MultiPolygon":

                    geometry.coordinates.forEach(polygon => {

                        polygon.forEach(ring => {

                            const line = this.drawLine(ring);

                            this.group.add(line);

                            countryObject.lines.push(line);

                        });

                    });

                    break;

                default:

                    console.warn(
                        "Tipo não suportado:",
                        geometry.type
                    );

                    break;

            }

            this.countries.push(countryObject);

        });

        console.log(
            "Países processados:",
            this.countries.length
        );

    },

    update() {

    }

};