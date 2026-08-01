const Countries = {

    group: null,

    radius: 1.002,

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

        const line = new THREE.Line(geometry, material);

        this.group.add(line);

    },

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
    
        CountryLoader.data.features.forEach(country => {
    
            const geometry = country.geometry;
    
            switch (geometry.type) {
    
                case "Polygon":
    
                    geometry.coordinates.forEach(ring => {
    
                        this.drawLine(ring);
    
                    });
    
                    break;
    
                case "MultiPolygon":
    
                    geometry.coordinates.forEach(polygon => {
    
                        polygon.forEach(ring => {
    
                            this.drawLine(ring);
    
                        });
    
                    });
    
                    break;
    
                default:
    
                    console.warn(
                        "Tipo não suportado:",
                        geometry.type
                    );
    
            }
    
        });
    
    },

    update() {

    }

};