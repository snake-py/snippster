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
    console.log('Incomming');
    console.log(snippet);
    console.log('\n');
    const stmt = db.prepare(`UPDATE snippets SET title='${snippet.title}', code='${snippet.code}', description='${snippet.description}' WHERE id = ${snippet.id}`);
    try {
      const updatedSnippet = stmt.run();
      console.log('DB Answer');
      console.log(updatedSnippet);
      console.log('\n');
    } catch (error) {
      console.log(error);
    }
    const returnStmt = db.prepare(`SELECT * FROM SNIPPETS WHERE id = ${snippet.id}`);
    console.log('return stmt');
    console.log(returnStmt);
    console.log('\n');
    return returnStmt.get();
  }

  async addSnippet(snippet) {
    let snippets = JSON.parse(fs.readFileSync('db/snippets.json'));
    let newSnippet = {
      id: 7,
      title: snippet.title,
      description: snippet.description,
      technology: [{ react: '', js: '' }],
      tags: ['js', 'react', 'redux'],
      date: '2020-11-03',
    };
    console.log(`The new Snippet ${newSnippet}`);
    console.log(newSnippet);
    snippets.snippets.push(newSnippet);

    let data = await JSON.stringify(snippets, null, 2);

    fs.writeFile('db/snippets.json', data, (err) => {
      if (err) throw err;
    });
  }
}

const snippetController = new SnippetController();
module.exports = snippetController;
