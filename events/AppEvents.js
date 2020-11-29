const AppController = require('../controller/AppController');


class AppEvents {
    getAppLanguages(){
        return AppController.getAppLanguages()
    }
}

module.exports = AppEvents;
