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
    languages.icon AS languageIcon,
    frameworks.id AS framework_id,
    frameworks.long AS framework,
    frameworks.icon AS frameworkIcon
    FROM snippets 
    LEFT JOIN languages ON snippets.language_id=languages.id 
    LEFT JOIN frameworks ON snippets.framework_id=frameworks.id;`);
    try {
      const snippets = stmt.all();
      console.log(snippets);
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
    language_id='${snippet.language_id}',
    framework_id='${snippet.framework_id}'
    WHERE id = ${snippet.id}`);
    try {
      const updatedSnippet = stmt.run();
    } catch (error) {
      console.log(error);
    }
    const returnStmt = db.prepare(`SELECT * FROM SNIPPETS WHERE id = ${snippet.id}`);
    return returnStmt.get();
  }

  async addSnippet() {
    console.log('add');
   const newSnippet = {
      title: '',
      description: '',
      code: '',
      language_id: 1,
      framework_id: 1,
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
    const snippet = returnStmt.get()
    return snippet;
  }
  
  async deleteSnippet(id) {
    console.log('deleting');   
  }
  
}

const snippetController = new SnippetController();
module.exports = snippetController;
