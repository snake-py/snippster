const fs = require('fs'); // reads json file

class SnippetController {
  getSnippets() {
    return JSON.parse(fs.readFileSync('db/snippets.json'));
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
