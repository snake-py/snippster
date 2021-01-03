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
      root: data.title,
      icon: data.icon,
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
      stmt.run(newProject);
    } catch (error) {
      console.log(error);
    }
    const returnStmt = db.prepare(`SELECT * FROM projects ORDER BY id DESC LIMIT 1;`);
    const project = returnStmt.get();
    return project;
  }

  deleteProject(project) {
    const stmt = db.prepare(`
    DELETE FROM projects WHERE id=${project.id};
    `);
    try {
      const res = stmt.run();
      console.log(res);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  isProjectInDB(data) {
    const stmt = db.prepare(`
    SELECT * FROM projects WHERE title='${data.title}';
    `);
    const project = stmt.get();
    if (project) {
      return true;
    } else {
      return false;
    }
  }

  getLastInsertedProject() {
    const returnStmt = db.prepare(`SELECT * FROM projects ORDER BY id DESC LIMIT 1;`);
    try {
      const project = returnStmt.get();
      return project;
    } catch (error) {
      return false;
    }
  }
}

const projectController = new ProjectController();
module.exports = projectController;
