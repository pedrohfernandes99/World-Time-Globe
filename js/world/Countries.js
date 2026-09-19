const Countries = {

    group: null,

    hitboxes: new THREE.Group(),

    countries: [],

    hoveredCountry: null,

    selectedCountry: null,

    borderColor: 0x00ff99,

    hoverColor: 0x00ffff,

    selectedColor: 0xffff00,

    radius: 1.008,

    drawLine(coordinates) {

        const points = [];

        coordinates.forEach(coord => {

            const lng = coord[0];
            const lat = coord[1];

            points.push(
                GeoUtils.latLngToVector3(lat, lng, this.radius)
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

                geoJSON: country,
            
                lines: [],
            
                selected: false,
            
                hitbox: null,
            
                bounds: null
            
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

            this.calculateBounds(countryObject);

            this.countries.push(countryObject);

        });

        console.log(
            "Países processados:",
            this.countries.length
        );

    },

    setCountryColor(country, color) {

        if (!country) return;

        country.lines.forEach(line => {

            line.material.color.setHex(color);

        });

    },

    restoreCountryColor(country) {

        if (!country) return;

        if (country === this.selectedCountry) {

            this.setCountryColor(country, this.selectedColor);

            return;

        }

        this.setCountryColor(country, this.borderColor);

    },

    clearSelection() {

        if (this.selectedCountry) {

            this.selectedCountry.selected = false;
            this.setCountryColor(
                this.selectedCountry,
                this.borderColor
            );

        }

        this.selectedCountry = null;

    },

    selectCountry(country) {

        if (this.selectedCountry === country) {
            return;
        }

        if (this.selectedCountry) {

            this.selectedCountry.selected = false;
            this.setCountryColor(
                this.selectedCountry,
                this.borderColor
            );

        }

        this.selectedCountry = country;

        if (!country) {

            console.log("Seleção limpa.");
            return;

        }

        country.selected = true;

        this.setCountryColor(
            country,
            this.selectedColor
        );

        console.log(
            "Selecionado:",
            country.properties.name
        );

    },

    createShape(coordinates) {

        const shape = new THREE.Shape();
    
    
        coordinates.forEach((coord, index) => {
    
            const lng = coord[0];
    
            const lat = coord[1];
    
    
            const point = GeoUtils.latLngToVector3(
                lat,
                lng,
                this.radius
            );
    
    
            if (index === 0) {
    
                shape.moveTo(
                    point.x,
                    point.y
                );
    
            } else {
    
                shape.lineTo(
                    point.x,
                    point.y
                );
    
            }
    
        });
    
    
        return shape;
    
    },

    createHitbox(countryObject) {

        const shapes = [];
    
        const geometry = countryObject.geometry;
    
    
        if (geometry.type === "Polygon") {
    
            geometry.coordinates.forEach(ring => {
    
                const shape = this.createShape(ring);
    
                shapes.push(shape);
    
            });
    
        }
    
    
        if (geometry.type === "MultiPolygon") {
    
            geometry.coordinates.forEach(polygon => {
    
                polygon.forEach(ring => {
    
                    const shape = this.createShape(ring);
    
                    shapes.push(shape);
    
                });
    
            });
    
        }
    
    
        if (shapes.length === 0) return;
    
    
        const geometry3D = new THREE.ShapeGeometry(
            shapes
        );
    
    
        const material = new THREE.MeshBasicMaterial({

            color: 0xff0000,
    
            transparent: true,
    
            opacity: 0.2,
    
            side: THREE.DoubleSide
    
        });
    
    
        const mesh = new THREE.Mesh(
            geometry3D,
            material
        );
    
    
        this.hitboxes.add(mesh);
    
    
        countryObject.hitbox = mesh;
    
    },

    handleHover(country) {

        if (this.hoveredCountry === country) {
            return;
        }

        if (this.hoveredCountry) {

            this.restoreCountryColor(this.hoveredCountry);

        }

        this.hoveredCountry = country;

        if (country && country !== this.selectedCountry) {

            this.setCountryColor(
                country,
                this.hoverColor
            );

        }

        CountryInfo.show(country || this.selectedCountry);

    },

    calculateBounds(countryObject) {

        let minLat = 90;
        let maxLat = -90;
    
        let minLng = 180;
        let maxLng = -180;
    
        const processRing = (ring) => {
    
            ring.forEach(coord => {
    
                const lng = coord[0];
                const lat = coord[1];
    
                if (lat < minLat) minLat = lat;
                if (lat > maxLat) maxLat = lat;
    
                if (lng < minLng) minLng = lng;
                if (lng > maxLng) maxLng = lng;
    
            });
    
        };
    
        const geometry = countryObject.geometry;
    
        if (geometry.type === "Polygon") {
    
            geometry.coordinates.forEach(processRing);
    
        } else if (geometry.type === "MultiPolygon") {
    
            geometry.coordinates.forEach(polygon => {
    
                polygon.forEach(processRing);
    
            });
    
        }
    
        countryObject.bounds = {
    
            minLat,
            maxLat,
            minLng,
            maxLng
    
        };
    
    },
        
    update() {

        const intersects =
            Input.raycaster.intersectObject(Earth.mesh);

        let country = null;

        if (intersects.length > 0) {

            const point = intersects[0].point.clone();

            Earth.mesh.worldToLocal(point);

            const position =
                GeoUtils.vector3ToLatLng(point);

            country = CountryLocator.findCountry(
                position.lat,
                position.lng
            );

        }

        this.handleHover(country);

        if (Input.consumeClick()) {

            console.log(
                "COUNTRIES RECEBEU CLIQUE:",
                country ? country.properties.name : "OCEANO"
            );

            if (country) {

                this.selectCountry(country);

                // O país selecionado continua amarelo mesmo sem hover.
                CountryInfo.show(country);

            } else {

                // Clique no oceano limpa a seleção atual.
                // Também restaura a cor do país que estava apenas em hover.
                if (this.hoveredCountry) {

                    this.restoreCountryColor(this.hoveredCountry);

                }

                this.selectCountry(null);
                this.hoveredCountry = null;
                CountryInfo.show(null);

            }

        }

    }

};