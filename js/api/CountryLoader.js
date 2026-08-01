const CountryLoader = {

    data: null,

    async load() {

        const response = await fetch("data/geojson/countries.geojson");

        this.data = await response.json();

        console.log("GeoJSON carregado!");

        console.log(this.data);

        console.log("Quantidade de países:", this.data.features.length);

    }

};