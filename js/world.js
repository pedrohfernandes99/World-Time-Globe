const World = {

    init(scene) {

        Earth.init(scene);

        Atmosphere.init(scene);

        Stars.init(scene);

        Sun.init(scene);

    },

    update() {

        Earth.update();

        Atmosphere.update();

        Sun.update();

    }

};