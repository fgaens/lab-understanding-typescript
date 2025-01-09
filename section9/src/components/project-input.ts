import {Component} from "./base-component";
import {projectState} from "../state/project";
import {Autobind} from "../decorators/autobind";
import {Validatable, validate} from "../util/validation";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peapleInputElement: HTMLInputElement;


    constructor() {
        super('project-input', 'app', true, 'user-input');

        this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title')
        this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description')
        this.peapleInputElement = <HTMLInputElement>this.element.querySelector('#people')
        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, peaple] = userInput;
            projectState.addProject(title, description, peaple);
            this.clearInputs();
        }
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peapleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };

        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again!');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peapleInputElement.value = '';
    }

}