const fs = require('fs'); // reads json file
const { db } = require('../db/migrate');

class SnippetController {
  getSnippets() {
    const stmt = db.prepare('SELECT * FROM SNIPPETS');
    const snippets = stmt.all();
    return { snippets: snippets };
  }

  editSnippet(snippet) {
    console.log(snippet);
    const stmt = db.prepare(`UPDATE snippets SET title='${snippet.title}', description='${snippet.description}' WHERE id = ${snippet.id}`);
    try {
      const updatedSnippet = stmt.run();
    } catch (error) {
      console.log(error);
    }
    const returnStmt = db.prepare(`SELECT * FROM SNIPPETS WHERE id = ${snippet.id}`);
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
