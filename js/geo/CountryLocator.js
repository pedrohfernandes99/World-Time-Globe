const CountryLocator = {


    findCandidateCountries(lat, lng) {

        return Countries.countries.filter(country => {

            const b = country.bounds;

            return (
                lat >= b.minLat &&
                lat <= b.maxLat &&
                lng >= b.minLng &&
                lng <= b.maxLng
            );

        });

    },


    findCountry(lat, lng) {


        const candidates =
            this.findCandidateCountries(
                lat,
                lng
            );


        const point =
            turf.point([
                lng,
                lat
            ]);


        for (const country of candidates) {


            const inside =
                turf.booleanPointInPolygon(
                    point,
                    country.geoJSON
                );


            if (inside) {

                return country;

            }

        }


        return null;

    }


};