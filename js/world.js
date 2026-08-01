const World = {

    init(scene) {

        Earth.init(scene);

        Atmosphere.init(scene);

        Clouds.init(scene);

        Stars.init(scene);

        Sun.init(scene);

        Countries.init(scene);

    },

    update() {

        Earth.update();
    
        Atmosphere.update();
    
        Countries.update();
    
    }

};