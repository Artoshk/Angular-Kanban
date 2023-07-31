import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss']
})
export class CreateColumnComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateColumnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) 
    { }

  onOkClick() {
    this.dialogRef.close(this.data);
  }

}
