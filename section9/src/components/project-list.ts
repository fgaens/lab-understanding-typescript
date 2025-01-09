import {Component} from "./base-component";
import {DragTarget} from "../models/drag-drop";
import {Project, ProjectStatus} from "../models/project";
import {ProjectItem} from "./project-item";
import {projectState} from "../state/project";
import {Autobind} from "../decorators/autobind";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`)
        this.assignedProjects = [];

        this.configure()
        this.renderContent();
    }

    private renderProjects() {
        const listElement = <HTMLUListElement>document.getElementById(`${this.type}-project-list`)!;
        listElement.innerHTML = '';
        for (const project of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, project);
        }
    }

    renderContent() {
        this.element.querySelector('ul')!.id = `${this.type}-project-list`;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.active
                }
                if (this.type === 'finished') {
                    return project.status === ProjectStatus.finished
                }
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        })
    }

    @Autobind
    dragLeaveHandler(_event: DragEvent): void {
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.remove('droppable');
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listElement = this.element.querySelector('ul')!;
            listElement.classList.add('droppable');

        }
    }

    @Autobind
    dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.setProjectStatus(projectId, this.type === 'active' ? ProjectStatus.active : ProjectStatus.finished);
    }
}