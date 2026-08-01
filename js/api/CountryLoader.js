const CountryLoader = {

    data: null,

    async load() {

        const response = await fetch(
            "data/geojson/countries.geojson"
        );

        this.data = await response.json();

        console.log(
            "Países carregados:",
            this.data.features.length
        );

    }

};