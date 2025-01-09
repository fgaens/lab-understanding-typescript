import {Draggable} from "../models/drag-drop";
import {Component} from "./base-component";
import {Project} from "../models/project";
import {Autobind} from "../decorators/autobind";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {

    private project: Project;

    get persons() {
        if (this.project.people === 1) {
            return `${this.project.people} Person`;
        } else {
            return `${this.project.people} Persons`;
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons;
        this.element.querySelector('p')!.textContent = this.project.description;
    }

    @Autobind
    dragEndHandler(_event: DragEvent): void {
        console.log('Dragend');

    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
        console.log('Dragstart')
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }
}