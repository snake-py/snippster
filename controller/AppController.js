const { db } = require('../db/migrate');


class AppController {
  getAppLanguages() {
    const stmt = db.prepare(`
        SELECT 
        languages.id,
        languages.long AS language,
        languages.icon AS languageIcon,
        frameworks.long AS framework,
        frameworks.icon AS frameworkIcon
        FROM languages
        INNER JOIN frameworks ON languages.id=frameworks.language_id;`);
    try {
      const languages = stmt.all();
      return { languages: languages };
    } catch (error) {
      console.log(error);
    }
  }
}

const appController = new AppController();
module.exports = appController;
