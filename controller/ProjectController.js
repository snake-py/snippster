const fs = require('fs'); // reads json file
const { db } = require('../db/migrate');

class ProjectController {
  getProjects() {
    const stmt = db.prepare('SELECT * FROM Projects');
    const projects = stmt.all();
    return { projects: projects };
  }

  addProject(data) {
    const newProject = {
      title: data.title,
      root: '',
      icon: data.iconPath,
    };

    const stmt = db.prepare(`
    INSERT INTO projects(
      title,
      root,
      icon
    ) VALUES (
      @title, @root, @icon
    );
    `);
    try {
      stm.run(newProject);
    } catch (error) {
      console.log(error);
    }
    const returnStmt = db.prepare(`SELECT * FROM projects ORDER BY id DESC LIMIT 1`);
    const project = returnStmt.get();
    return project;
  }
}

const projectController = new ProjectController();
module.exports = projectController;
