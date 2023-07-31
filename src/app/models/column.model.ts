import { Task } from "./task.models";

export class Column {
    constructor(public name: string, public tasks: Task[] = [], public canBeRenamedOrDeleted: boolean = true) {}
}