const { db } = require('../db/migrate');

class AppController {
  getAppLanguages() {
    const stmt = db.prepare(`
        SELECT 
        languages.id,
        languages.long AS language,
        languages.short AS language_short,
        languages.icon AS languageIcon
        FROM languages
        ORDER BY languages.id;`);
    const stmtFrame = db.prepare(`
        SELECT 
        frameworks.id,
        frameworks.long AS framework,
        frameworks.language_id,
        frameworks.icon AS frameworkIcon
        FROM frameworks;`);

    try {
      const languagesToMap = stmt.all();
      const frameworks = stmtFrame.all();
      const languages = languagesToMap.map((language) => {
        language.framework = [];
        frameworks.forEach((framework) => {
          if (language.id === framework.language_id) {
            language.framework.push(framework);
          }
        });
        return language;
      });

      return { languages: languages };
    } catch (error) {
      console.log(error);
    }
  }
}

const appController = new AppController();
module.exports = appController;
