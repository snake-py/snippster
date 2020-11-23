const fs = require('fs'); // reads json file
const { db } = require('../db/migrate');

class ProjectController {
  getProjects() {
    const stmt = db.prepare('SELECT * FROM Projects');
    const projects = stmt.all();
    return { projects: projects };
  }
}

const projectController = new ProjectController();
module.exports = projectController;