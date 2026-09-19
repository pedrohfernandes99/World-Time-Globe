async function start() {

    Engine.init();

    CountryInfo.init();
    CountrySearch.init();
    Favorites.init();

    const clearSearch = document.getElementById("country-search-clear");
    if (clearSearch) {
        clearSearch.addEventListener("click", () => CountrySearch.clear());
    }

    Input.init();

    await CountryLoader.load();

    World.init(Engine.scene);

    // Atualiza o relógio do país exibido sem recriar o painel.
    setInterval(() => {
        CountryInfo.updateTime();
        Favorites.updateClocks();
    }, 1000);

    animate();

}

function animate() {

    requestAnimationFrame(animate);

    Input.update();

    World.update();
    CountrySearch.update();

    Engine.render();

}

start();
