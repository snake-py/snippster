const fs = require('fs'); // reads json file
const { db } = require('../db/migrate');

class SnippetController {
  getSnippets() {
    const stmt = db.prepare(`
    SELECT 
    snippets.id,
    snippets.title,
    snippets.description,
    snippets.code,
    languages.long AS language,
    languages.icon AS languageIcon,
    frameworks.long AS framework,
    frameworks.icon AS frameworkIcon
    FROM snippets 
    INNER JOIN languages ON snippets.language_id=languages.id 
    INNER JOIN frameworks ON snippets.framework_id=frameworks.id;`);
    try {
      const snippets = stmt.all();
      return { snippets: snippets };
    } catch (error) {
      console.log(error);
    }
  }

  editSnippet(snippet) {
    const stmt = db.prepare(`UPDATE snippets SET title='${snippet.title}', code='${snippet.code}', description='${snippet.description}' WHERE id = ${snippet.id}`);
    try {
      const updatedSnippet = stmt.run();
    } catch (error) {
      console.log(error);
    }
    const returnStmt = db.prepare(`SELECT * FROM SNIPPETS WHERE id = ${snippet.id}`);
    return returnStmt.get();
  }

  async addSnippet(snippet) {
    console.log('add');
   const newSnippet = {
      title: snippet.title,
      description: snippet.description,
      code: snippet.code,
      language_id: 1,
      framework_id: 1,
      project_id: 1,
    };

    const stmt = db.prepare(`INSERT INTO snippets (
    title,
    code,
    language_id,
    framework_id,
    project_id,
    description
    ) VALUES (@title, @description, @code, @project_id, @language_id, @framework_id);`);
    try {
      stmt.run(newSnippet);
    } catch (error) {
      console.log(error);
    }
    const returnStmt = db.prepare(`SELECT * FROM snippets ORDER BY id DESC LIMIT 1`);
    return returnStmt.get();
  }
}

const snippetController = new SnippetController();
module.exports = snippetController;
