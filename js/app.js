async function start() {

    Engine.init();

    Input.init();

    await CountryLoader.load();

    World.init(Engine.scene);

    animate();

}

function animate() {

    requestAnimationFrame(animate);

    World.update();

    Engine.render();

}

start();