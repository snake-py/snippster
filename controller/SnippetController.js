const fs = require('fs'); // reads json file
const { db } = require('../db/migrate');

class SnippetController {
  async getSnippets() {
    const stmt = db.prepare(`
    SELECT 
    snippets.id,
    snippets.title,
    snippets.description,
    snippets.code,
    languages.id AS language_id,
    languages.long AS language,
    languages.short AS language_short,
    languages.icon AS languageIcon,
    frameworks.id AS framework_id,
    frameworks.long AS framework,
    frameworks.icon AS frameworkIcon
    FROM snippets 
    LEFT JOIN languages ON snippets.language_id=languages.id 
    LEFT JOIN frameworks ON snippets.framework_id=frameworks.id;`);
    try {
      const snippets = stmt.all();
      return { snippets: snippets };
    } catch (error) {
      console.log(error);
    }
  }

  async editSnippet(snippet) {
    const stmt = db.prepare(`UPDATE snippets
    SET
    title='${snippet.title}',
    code='${snippet.code}',
    description='${snippet.description}',
    language_id=${snippet.language_id ? `'${snippet.language_id}'` : null},
    framework_id=${snippet.framework_id ? `'${snippet.framework_id}'` : null}
    WHERE id = ${snippet.id}`);
    try {
      stmt.run();
    } catch (error) {
      console.log(error);
    }
    const returnStmt = db.prepare(`
    SELECT
    snippets.id,
    snippets.title,
    snippets.description,
    snippets.code,
    languages.id AS language_id,
    languages.long AS language,
    languages.short AS language_short,
    languages.icon AS languageIcon,
    frameworks.id AS framework_id,
    frameworks.long AS framework,
    frameworks.icon AS frameworkIcon
    FROM snippets 
    LEFT JOIN languages ON snippets.language_id=languages.id 
    LEFT JOIN frameworks ON snippets.framework_id=frameworks.id    
    WHERE snippets.id = ${snippet.id};`);
    return returnStmt.get();
  }

  async addSnippet() {
    console.log('add');
    const newSnippet = {
      title: '',
      description: '',
      code: '',
      language_id: null,
      framework_id: null,
      project_id: 1,
    };

    const stmt = db.prepare(`INSERT INTO snippets (
    title,
    code,
    description,
    project_id,
    language_id,
    framework_id
    ) VALUES (@title, @description, @code, @project_id, @language_id, @framework_id);`);
    try {
      stmt.run(newSnippet);
    } catch (error) {
      console.log(error);
    }
    const returnStmt = db.prepare(`SELECT * FROM snippets ORDER BY id DESC LIMIT 1`);
    const snippet = returnStmt.get();
    console.log(snippet);
    return snippet;
  }

  async deleteSnippet(snippet) {
    console.log(snippet);
    console.log(snippet.id);
    const stmt = db.prepare(`DELETE FROM snippets WHERE id=${snippet.id};`);
    try {
      const res = stmt.run();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}

const snippetController = new SnippetController();
module.exports = snippetController;
