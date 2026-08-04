const CountryInfo = {

    panel: null,
    title: null,
    details: null,

    init() {

        this.panel = document.getElementById("country-info");

        this.title = document.getElementById("country-name");

        this.details = document.getElementById("country-details");

    },

    show(country) {

        if (!country) {

            this.title.textContent = "País";

            this.details.textContent =
                "Passe o mouse sobre um país.";

            return;

        }

        this.title.textContent =
    country.properties.name || "País";

    const iso =
    country.properties["ISO3166-1-Alpha-2"];

const info =
    CountryDatabase[iso];

if (!info) {

    this.details.innerHTML = `
        <strong>ISO:</strong> ${iso}
        <br>
        Dados ainda não cadastrados.
    `;

    return;

}

this.details.innerHTML = `
    <strong>Capital:</strong> ${info.capital}<br>

    <strong>Continente:</strong> ${info.continent}<br>

    <strong>Moeda:</strong> ${info.currency}<br>

    <strong>Idioma:</strong> ${info.language}<br>

    <strong>Fuso:</strong> ${info.timezone}
`;

    }

};