Engine.init();

World.init(Engine.scene);


function animate() {

    requestAnimationFrame(animate);


    World.update();


    Engine.render();

}


animate();