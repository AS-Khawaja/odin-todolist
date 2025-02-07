class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveProjects();
    }

    removeTask(taskIndex) {
        this.tasks.splice(taskIndex, 1);
        this.saveProjects();
    }

    saveProjects() {
        localStorage.setItem('projects', JSON.stringify(projectManager.projects));
    }
}

class ProjectManager {
    constructor() {
        this.projects = JSON.parse(localStorage.getItem('projects')) || [];
        this.currentProjectIndex = null;
        this.loadProjects();
    }

    addProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        this.saveProjects();
        this.displayProjects();
    }

    saveProjects() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }

    loadProjects() {
        this.projects = JSON.parse(localStorage.getItem('projects')) || [];
        this.displayProjects();
    }

    displayProjects() {
        const projectsContainer = document.getElementById('projectsContainer');
        projectsContainer.innerHTML = '';

        this.projects.forEach((project, projectIndex) => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');
            projectDiv.textContent = project.name;
            projectDiv.addEventListener('click', () => this.displayTasks(projectIndex));
            projectsContainer.appendChild(projectDiv);
        });
    }

    displayTasks(projectIndex) {
        this.currentProjectIndex = projectIndex;
        const taskContainer = document.getElementById('tasksContainer');
        const taskTitle = document.getElementById('taskTitle');
        const taskList = document.getElementById('taskList');
        const taskInput = document.getElementById('taskInput');

        taskContainer.style.display = 'block';
        taskTitle.textContent = this.projects[projectIndex].name;
        taskList.innerHTML = this.projects[projectIndex].tasks.map((task, i) => 
            `<li>${task} <button onclick="projectManager.removeTask(${i})">Delete</button></li>`
        ).join('');
        taskInput.value = '';
    }

    addTask() {
        if (this.currentProjectIndex === null) return;
        const taskInput = document.getElementById('taskInput');
        const task = taskInput.value.trim();
        if (task) {
            this.projects[this.currentProjectIndex].tasks.push(task);
            taskInput.value = '';
            this.saveProjects();
            this.displayTasks(this.currentProjectIndex);
        }
    }

    removeTask(taskIndex) {
        if (this.currentProjectIndex === null) return;
        this.projects[this.currentProjectIndex].tasks.splice(taskIndex, 1);
        this.saveProjects();
        this.displayTasks(this.currentProjectIndex);
    }
}

const projectManager = new ProjectManager();

document.getElementById('addProject').addEventListener('click', () => {
    const projectInput = document.getElementById('projectInput');
    const projectName = projectInput.value.trim();
    if (projectName) {
        projectManager.addProject(projectName);
        projectInput.value = '';
    }
});

document.getElementById('addTask').addEventListener('click', () => {
    projectManager.addTask();
});