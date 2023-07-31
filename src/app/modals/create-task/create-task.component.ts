import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateColumnComponent } from '../create-column/create-column.component';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public name: string,
    @Inject(MAT_DIALOG_DATA) public description: string
    ){}

  onOkClick() {
    if (this.name && this.description) {
      this.dialogRef.close({name: this.name, description: this.description});
    }
  }

}
