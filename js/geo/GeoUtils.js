const GeoUtils = {

    latLngToVector3(lat, lng, radius) {

        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);

        return new THREE.Vector3(

            -(radius * Math.sin(phi) * Math.cos(theta)),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)

        );

    },

    vector3ToLatLng(vector) {

        const radius = vector.length();

        const lat = 90 -

            THREE.MathUtils.radToDeg(

                Math.acos(vector.y / radius)

            );

        let lng =

            THREE.MathUtils.radToDeg(

                Math.atan2(

                    vector.z,
                    -vector.x

                )

            ) - 180;

        if (lng < -180) lng += 360;
        if (lng > 180) lng -= 360;

        return {

            lat,
            lng

        };

    }

};