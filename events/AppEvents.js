const AppController = require('../controller/AppController');


class AppEvents {
    getAppLanguages(){
        return AppController.getAppLanguages()
    }

    getAppVersion() {
        return require('electron').app.getVersion()
    }
}

module.exports = AppEvents;
