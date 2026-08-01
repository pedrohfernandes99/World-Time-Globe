const Countries = {

    group: null,

    hitboxes: new THREE.Group(),

    countries: [],

    borderColor: 0x00ff99,

    selectedColor: 0xffff00,

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
            color: this.borderColor
        });

        return new THREE.Line(geometry, material);

    },

    init(scene) {

        this.group = new THREE.Group();

        // Adiciona as fronteiras à Terra para que girem junto
        Earth.mesh.add(this.group);

        Earth.mesh.add(this.hitboxes);

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
            
                lines: [],
            
                selected: false
            
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

            this.createHitbox(countryObject);

            this.countries.push(countryObject);

        });

        console.log(
            "Países processados:",
            this.countries.length
        );

    },

    setCountryColor(country, color) {

        country.lines.forEach(line => {
    
            line.material.color.setHex(color);
    
        });
    
    },

    clearSelection() {

        this.countries.forEach(country => {
    
            country.selected = false;
    
            this.setCountryColor(country, this.borderColor);
    
        });
    
    },

    selectCountry(country) {

        this.clearSelection();
    
        country.selected = true;
    
        this.setCountryColor(country, this.selectedColor);
    
        console.log("Selecionado:", country.properties.name);
    
    },

    createHitbox(countryObject) {

        // Ainda não criaremos a geometria.
        // Nesta Sprint apenas armazenamos a referência.
    
        countryObject.hitbox = null;
    
    },

    update() {

        if (!Earth.mesh) return;
    
        const intersects = Input.raycaster.intersectObject(Earth.mesh);
    
        if (intersects.length > 0) {
    
            console.log("Mouse sobre a Terra");
    
        }
    }
    };