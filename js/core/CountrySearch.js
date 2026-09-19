// World Time Globe - Sprint 29
// Busca de países por nome, nome oficial, ISO-2 e ISO-3.

const CountrySearch = {
    input: null,
    results: null,
    panel: null,
    query: "",
    maxResults: 10,
    focusTarget: null,
    focusSpeed: 0.12,

    init() {
        this.input = document.getElementById("country-search-input");
        this.results = document.getElementById("country-search-results");
        this.panel = document.getElementById("country-search");

        if (!this.input || !this.results) return;

        this.input.addEventListener("input", () => {
            this.query = this.input.value.trim();
            this.renderResults();
        });

        this.input.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                this.clear();
            }

            if (event.key === "Enter") {
                const first = this.results.querySelector(".search-result");
                if (first) first.click();
            }
        });

        document.addEventListener("click", event => {
            if (!this.panel.contains(event.target)) {
                this.results.innerHTML = "";
                this.results.classList.remove("visible");
            }
        });
    },

    normalize(value) {
        return String(value || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    },

    getAllCountries() {
        return (Countries.countries || []).map(country => {
            const p = country.properties || {};
            const iso2 = p["ISO3166-1-Alpha-2"] || "";
            const iso3 = p["ISO3166-1-Alpha-3"] || "";
            const info = CountryDatabase.get(iso2, p.name || "");
            return {
                country,
                info,
                name: info?.name || p.name || "País",
                officialName: info?.officialName || "",
                iso2: info?.iso2 || iso2,
                iso3: info?.iso3 || iso3
            };
        });
    },

    score(item, q) {
        const name = this.normalize(item.name);
        const official = this.normalize(item.officialName);
        const iso2 = this.normalize(item.iso2);
        const iso3 = this.normalize(item.iso3);

        if (iso2 === q || iso3 === q) return 1000;
        if (name === q) return 900;
        if (official === q) return 850;
        if (name.startsWith(q)) return 700;
        if (official.startsWith(q)) return 650;
        if (iso2.startsWith(q) || iso3.startsWith(q)) return 600;
        if (name.includes(q)) return 500;
        if (official.includes(q)) return 450;
        return -1;
    },

    search(query) {
        const q = this.normalize(query);
        if (!q) return [];

        return this.getAllCountries()
            .map(item => ({ item, score: this.score(item, q) }))
            .filter(result => result.score >= 0)
            .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name, "pt-BR"))
            .slice(0, this.maxResults)
            .map(result => result.item);
    },

    renderResults() {
        if (!this.results) return;

        if (!this.query) {
            this.results.innerHTML = "";
            this.results.classList.remove("visible");
            return;
        }

        const matches = this.search(this.query);

        if (!matches.length) {
            this.results.innerHTML = `<div class="search-empty">Nenhum país encontrado.</div>`;
            this.results.classList.add("visible");
            return;
        }

        this.results.innerHTML = matches.map((item, index) => `
            <button class="search-result" data-index="${index}" type="button">
                <span class="search-flag">${item.info?.flag || "🌐"}</span>
                <span class="search-name">
                    <strong>${this.escape(item.name)}</strong>
                    <small>${this.escape(item.iso2 || "—")} · ${this.escape(item.iso3 || "—")}</small>
                </span>
            </button>
        `).join("");

        this.results.classList.add("visible");

        this.results.querySelectorAll(".search-result").forEach((button, index) => {
            button.addEventListener("click", event => {
                event.stopPropagation();
                this.select(matches[index]);
            });
        });
    },

    select(item) {
        if (!item || !item.country) return;

        const country = item.country;
        Countries.selectCountry(country);
        Countries.hoveredCountry = null;
        CountryInfo.show(country);

        this.focusCountry(country);

        this.input.value = item.name;
        this.query = item.name;
        this.results.innerHTML = "";
        this.results.classList.remove("visible");
        this.input.blur();
    },

    focusCountry(country) {
        if (!country || !country.geoJSON) return;

        let center;
        try {
            center = turf.centroid(country.geoJSON).geometry.coordinates;
        } catch (error) {
            center = null;
        }

        if (!center) {
            const bounds = country.bounds;
            if (!bounds) return;
            center = [
                (bounds.minLng + bounds.maxLng) / 2,
                (bounds.minLat + bounds.maxLat) / 2
            ];
        }

        const target = GeoUtils.latLngToVector3(center[1], center[0], 1).normalize();
        const front = new THREE.Vector3(0, 0, 1);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(target, front);

        this.focusTarget = quaternion;

        if (Earth.autoRotate !== undefined) {
            Earth.autoRotate = false;
        }
    },

    update() {
        if (!this.focusTarget || !Earth.mesh) return;

        Earth.mesh.quaternion.slerp(this.focusTarget, this.focusSpeed);

        const angle = Earth.mesh.quaternion.angleTo(this.focusTarget);
        if (angle < 0.001) {
            Earth.mesh.quaternion.copy(this.focusTarget);
            this.focusTarget = null;
        }
    },

    clear() {
        if (this.input) this.input.value = "";
        this.query = "";
        if (this.results) {
            this.results.innerHTML = "";
            this.results.classList.remove("visible");
        }
    },

    escape(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
};
