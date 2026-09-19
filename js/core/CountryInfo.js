const CountryInfo = {

    panel: null,
    title: null,
    details: null,
    currentCountry: null,

    init() {
        this.panel = document.getElementById("country-info");
        this.title = document.getElementById("country-name");
        this.details = document.getElementById("country-details");
    },

    escape(value) {
        return String(value ?? "—")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    },

    show(country) {
        this.currentCountry = country || null;

        if (!country) {
            this.title.textContent = "País";
            this.details.innerHTML = "Passe o mouse sobre um país.";
            return;
        }

        const iso = country.properties["ISO3166-1-Alpha-2"] || "";
        const geoName = country.properties.name || "";
        const info = CountryDatabase.get(iso, geoName);

        this.title.textContent = info?.name || geoName || "País";

        const favorite = typeof Favorites !== "undefined" && Favorites.isFavorite(country);
        const favoriteLabel = favorite ? "★ REMOVER DOS FAVORITOS" : "☆ ADICIONAR AOS FAVORITOS";

        let html = `<button id="country-favorite-button" class="country-favorite-button ${favorite ? "is-favorite" : ""}" type="button">${favoriteLabel}</button>`;

        if (!info) {
            html = `<strong>ISO:</strong> ${this.escape(iso || "—")}<br>
                    Dados ainda não cadastrados.`;
        } else {
            html = `
                <div class="country-status">
                    ${country === Countries.selectedCountry ? "● PAÍS SELECIONADO" : "◦ VISUALIZAÇÃO"}
                </div>
                <strong>ISO-2:</strong> ${this.escape(info.iso2)}<br>
                <strong>ISO-3:</strong> ${this.escape(info.iso3)}<br>
                <strong>Continente:</strong> ${this.escape(info.continent)}<br>
                <strong>Capital:</strong> ${this.escape(info.capital)}<br>
                <strong>População:</strong> ${this.escape(info.population)}<br>
                <strong>Área:</strong> ${this.escape(info.area)}<br>
                <strong>Moeda:</strong> ${this.escape(info.currency)}<br>
                <strong>Idioma:</strong> ${this.escape(info.language)}<br>
                <strong>Telefone:</strong> ${this.escape(info.phone)}<br>
                <strong>Fuso cadastrado:</strong> ${this.escape(info.timezone)}
            `;
        }

        html += `<div id="country-time"></div>`;
        this.details.innerHTML = html;

        const favoriteButton = document.getElementById("country-favorite-button");
        if (favoriteButton && typeof Favorites !== "undefined") {
            favoriteButton.addEventListener("click", event => {
                event.stopPropagation();
                Favorites.toggle(country);
            });
        }

        this.updateTime();
    },

    updateTime() {
        const timeBox = document.getElementById("country-time");
        if (!timeBox || !this.currentCountry) return;

        const times = TimeService.getCountryTimes(this.currentCountry);

        if (!times.length) {
            timeBox.innerHTML = `<div class="time-title">🕐 HORÁRIO LOCAL</div>
                                 <div class="time-empty">Horário não disponível.</div>`;
            return;
        }

        // Mostra até 6 fusos para não transformar o painel em uma lista enorme.
        const visible = times.slice(0, 6);
        const remaining = times.length - visible.length;

        let html = `
            <div class="time-title">🕐 HORÁRIO LOCAL</div>
            <div class="utc-reference">UTC agora: ${TimeService.getUtcNow().time}</div>
        `;

        visible.forEach((item, index) => {
            html += `
                <div class="time-row">
                    <div class="time-place">${this.escape(item.label)}</div>
                    <div class="time-clock">${item.time}</div>
                    <div class="time-meta">${item.offset}${item.daylightSaving ? " · Horário de verão" : ""}</div>
                </div>
            `;
        });

        if (remaining > 0) {
            html += `<div class="time-more">+ ${remaining} outro(s) fuso(s)</div>`;
        }

        timeBox.innerHTML = html;
    }
};
