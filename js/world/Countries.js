const Countries = {

    group: null,

    hitboxes: new THREE.Group(),

    countries: [],

    hoveredCountry: null,

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

    createShape(coordinates) {

        const shape = new THREE.Shape();
    
    
        coordinates.forEach((coord, index) => {
    
            const lng = coord[0];
    
            const lat = coord[1];
    
    
            const point = this.latLngToVector3(
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
    
            this.setCountryColor(
                this.hoveredCountry,
                this.borderColor
            );
    
        }
    
    
        this.hoveredCountry = country;

        CountryInfo.show(country);
    
    
        if (country) {
    
            this.setCountryColor(
                country,
                this.selectedColor
            );
    
        }
    
    },

    vector3ToLatLng(vector) {

        const radius = vector.length();
    
        const lat = 90 - THREE.MathUtils.radToDeg(
            Math.acos(vector.y / radius)
        );
    
        let lng = THREE.MathUtils.radToDeg(
            Math.atan2(
                vector.z,
                -vector.x
            )
        ) - 180;
    
        // Corrige para ficar entre -180 e 180
        if (lng < -180) lng += 360;
        if (lng > 180) lng -= 360;
    
        return {
            lat,
            lng
        };
    
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

    findCandidateCountries(lat, lng) {

        return this.countries.filter(country => {
    
            const b = country.bounds;
    
            return (
                lat >= b.minLat &&
                lat <= b.maxLat &&
                lng >= b.minLng &&
                lng <= b.maxLng
            );
    
        });
    
    },

    update() {

        const intersects =
            Input.raycaster.intersectObject(Earth.mesh);
    
        if (intersects.length === 0) return;
    
        const point = intersects[0].point;
    
        const position =
            this.vector3ToLatLng(point);
    
        const candidates =
            this.findCandidateCountries(
                position.lat,
                position.lng
            );
    
        console.clear();
    
        console.log(
            "Latitude:",
            position.lat.toFixed(2)
        );
    
        console.log(
            "Longitude:",
            position.lng.toFixed(2)
        );
    
        console.log(
            "Candidatos:",
            candidates.length
        );
    
        console.log(candidates);
    
    }

};