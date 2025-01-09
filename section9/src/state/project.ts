import {Project, ProjectStatus} from "../models/project";

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listener: Listener<T>) {
        this.listeners.push(listener);
    }
}

export class ProjectState extends State<Project> {

    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }

    addProject(title: string, description: string, numberOfPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numberOfPeople, ProjectStatus.active);
        this.projects.push(newProject);
        this.updateListeners();
    }

    setProjectStatus(projectId: string, status: ProjectStatus) {
        const project = this.projects.find((project) => project.id === projectId);
        if (project && status !== project.status) {
            project.status = status;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listener of this.listeners) {
            listener(this.projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();