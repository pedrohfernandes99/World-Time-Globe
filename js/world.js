const World = {

    init(scene) {

        Earth.init(scene);

        Atmosphere.init(scene);

        Stars.init(scene);

    },

    update() {

        Earth.update();

        Atmosphere.update();

    }

};