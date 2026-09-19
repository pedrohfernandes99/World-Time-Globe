// World Time Globe - Sprint 30
// Favoritos persistentes e painel de múltiplos relógios.

const Favorites = {
    storageKey: "worldtimeglobe_favorites_v1",
    list: [],
    panel: null,
    cards: null,
    count: null,
    maxFavorites: 12,

    init() {
        this.panel = document.getElementById("favorites-panel");
        this.cards = document.getElementById("favorites-cards");
        this.count = document.getElementById("favorites-count");
        this.load();
        this.render();

        const toggle = document.getElementById("favorites-toggle");
        if (toggle) toggle.addEventListener("click", () => this.togglePanel());

        const close = document.getElementById("favorites-close");
        if (close) close.addEventListener("click", () => this.hidePanel());

        const clear = document.getElementById("favorites-clear");
        if (clear) clear.addEventListener("click", () => this.clear());
    },

    load() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            const parsed = raw ? JSON.parse(raw) : [];
            this.list = Array.isArray(parsed) ? parsed.filter(item => item && item.key) : [];
        } catch (error) {
            console.warn("Não foi possível carregar favoritos:", error);
            this.list = [];
        }
    },

    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.list));
        } catch (error) {
            console.warn("Não foi possível salvar favoritos:", error);
        }
    },

    normalize(value) {
        return String(value || "").trim().toUpperCase();
    },

    getKey(country) {
        if (!country) return "";
        const p = country.properties || {};
        const iso2 = this.normalize(p["ISO3166-1-Alpha-2"]);
        if (iso2 && iso2 !== "-99") return iso2;
        const name = String(p.name || "País").trim().toLowerCase();
        return "NAME:" + name;
    },

    getInfo(country) {
        const p = country?.properties || {};
        const iso2 = p["ISO3166-1-Alpha-2"] || "";
        return CountryDatabase.get(iso2, p.name || "");
    },

    isFavorite(country) {
        const key = this.getKey(country);
        return !!key && this.list.some(item => item.key === key);
    },

    add(country) {
        if (!country || this.isFavorite(country)) return false;
        if (this.list.length >= this.maxFavorites) {
            this.flashMessage("Limite de 12 favoritos atingido.");
            return false;
        }

        const p = country.properties || {};
        const info = this.getInfo(country);
        this.list.push({
            key: this.getKey(country),
            name: info?.name || p.name || "País",
            iso2: info?.iso2 || p["ISO3166-1-Alpha-2"] || "",
            iso3: info?.iso3 || p["ISO3166-1-Alpha-3"] || "",
            flag: info?.flag || "🌐"
        });
        this.save();
        this.render();
        this.refreshCountryInfo();
        return true;
    },

    remove(countryOrKey) {
        const key = typeof countryOrKey === "string" ? countryOrKey : this.getKey(countryOrKey);
        this.list = this.list.filter(item => item.key !== key);
        this.save();
        this.render();
        this.refreshCountryInfo();
    },

    toggle(country) {
        if (!country) return;
        if (this.isFavorite(country)) this.remove(country);
        else this.add(country);
    },

    clear() {
        if (!this.list.length) return;
        this.list = [];
        this.save();
        this.render();
        this.refreshCountryInfo();
    },

    findCountry(item) {
        if (!item || !Countries.countries) return null;
        return Countries.countries.find(country => this.getKey(country) === item.key) || null;
    },

    select(item) {
        const country = this.findCountry(item);
        if (!country) return;
        Countries.selectCountry(country);
        Countries.hoveredCountry = null;
        CountryInfo.show(country);
        if (typeof CountrySearch !== "undefined") CountrySearch.focusCountry(country);
    },

    togglePanel() {
        if (!this.panel) return;
        this.panel.classList.toggle("visible");
    },

    hidePanel() {
        if (this.panel) this.panel.classList.remove("visible");
    },

    render() {
        if (!this.cards) return;
        if (this.count) this.count.textContent = String(this.list.length);

        if (!this.list.length) {
            this.cards.innerHTML = `
                <div class="favorites-empty">
                    <div class="favorites-empty-icon">☆</div>
                    <strong>Nenhum favorito</strong>
                    <span>Selecione um país e use “Adicionar aos favoritos”.</span>
                </div>`;
            return;
        }

        this.cards.innerHTML = this.list.map((item, index) => `
            <div class="favorite-card" data-index="${index}">
                <button class="favorite-main" type="button" title="Abrir ${this.escape(item.name)}">
                    <span class="favorite-flag">${item.flag || "🌐"}</span>
                    <span class="favorite-main-text">
                        <strong>${this.escape(item.name)}</strong>
                        <small>${this.escape(item.iso2 || "—")} · ${this.escape(item.iso3 || "—")}</small>
                    </span>
                </button>
                <div class="favorite-clock" data-clock="${index}">--:--:--</div>
                <div class="favorite-date" data-date="${index}">--/--/----</div>
                <div class="favorite-meta" data-meta="${index}">UTC —</div>
                <button class="favorite-remove" type="button" title="Remover favorito" aria-label="Remover favorito">×</button>
            </div>
        `).join("");

        this.cards.querySelectorAll(".favorite-card").forEach((card, index) => {
            const main = card.querySelector(".favorite-main");
            const remove = card.querySelector(".favorite-remove");
            if (main) main.addEventListener("click", () => this.select(this.list[index]));
            if (remove) remove.addEventListener("click", event => {
                event.stopPropagation();
                this.remove(this.list[index].key);
            });
        });

        this.updateClocks();
    },

    updateClocks() {
        if (!this.cards) return;
        this.list.forEach((item, index) => {
            const country = this.findCountry(item);
            const times = country ? TimeService.getCountryTimes(country) : [];
            const zone = times[0];
            const clock = this.cards.querySelector(`[data-clock="${index}"]`);
            const date = this.cards.querySelector(`[data-date="${index}"]`);
            const meta = this.cards.querySelector(`[data-meta="${index}"]`);
            if (!clock || !date || !meta) return;

            if (!zone) {
                clock.textContent = "--:--:--";
                date.textContent = "Horário indisponível";
                meta.textContent = "UTC —";
                return;
            }
            clock.textContent = zone.time;
            date.textContent = zone.date;
            meta.textContent = `${zone.offset}${zone.daylightSaving ? " · Horário de verão" : ""}`;
        });
    },

    refreshCountryInfo() {
        if (typeof CountryInfo !== "undefined" && CountryInfo.currentCountry) {
            CountryInfo.show(CountryInfo.currentCountry);
        }
    },

    flashMessage(message) {
        let box = document.getElementById("favorites-message");
        if (!box) return;
        box.textContent = message;
        box.classList.add("visible");
        clearTimeout(this.messageTimer);
        this.messageTimer = setTimeout(() => box.classList.remove("visible"), 2200);
    },

    escape(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
};
