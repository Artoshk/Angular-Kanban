import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.models';
import { Column } from 'src/app/models/column.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateColumnComponent } from 'src/app/modals/create-column/create-column.component';
import { CreateTaskComponent } from 'src/app/modals/create-task/create-task.component';
import { Task } from 'src/app/models/task.models';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {

  constructor(public dialog: MatDialog) { }

  isLoadingData: boolean = true;
  board: Board = new Board('Board', []);

  //get data from json-server and set it to board http://localhost:3000/board
  ngOnInit(): void {
    fetch('http://localhost:3000/board')
      .then(response => response.json())
      .then(data => {
        this.board = data;
        this.isLoadingData = false;
      });
  }
  
  updateJsonServer() {
    fetch('http://localhost:3000/board', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.board),
    })
      .then(response => response.json())
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.updateJsonServer()
  }

  addColumn() {
    const newColumn = new Column('New Column', []);
    this.board.columns.push(newColumn);
    this.updateJsonServer()
  }

  deleteColumn(column: Column) {
    if(column.canBeRenamedOrDeleted){
      this.board.columns = this.board.columns.filter(c => c !== column);
      this.updateJsonServer()
    }
  }

  changeColumnName(column: Column) {
    if (column.canBeRenamedOrDeleted) {
      const dialogRef = this.dialog.open(CreateColumnComponent, {
        width: '250px',
      });
  
      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          column.name = data;
          this.updateJsonServer()
        }
      });
    }
  }

  addTask(column: Column) {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        column.tasks.push(new Task(data.name, data.description));
        this.updateJsonServer()
      }
    });
  }

  deleteTask(column: Column, task: Task) {
    column.tasks = column.tasks.filter(t => t !== task);
    this.updateJsonServer()
  }
}
