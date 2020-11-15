const fs = require('fs'); // reads json file



class SnippetController {
  get_snippets() {
    return JSON.parse(fs.readFileSync('db/snippets.json'));
  }
}


const snippetController = new SnippetController
module.exports = snippetController