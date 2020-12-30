const SnippetController = require('../controller/SnippetController');
const ProjectController = require('../controller/ProjectController');
const sizeOf = require('image-size');


class MenuEvents {
  addProject(data) {
    console.log(data);
    const dimensions = sizeOf(data.icon)
    
    console.log(dimensions);
    // return ProjectController.addProject(data);
  }
}

module.exports = MenuEvents;
