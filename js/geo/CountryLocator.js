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

    }

};