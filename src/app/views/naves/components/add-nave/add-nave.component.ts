import { INave } from './../../../../core/models/naves.model';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditNaveComponent } from '../edit-nave/edit-nave.component';

@Component({
  selector: 'app-add-nave',
  templateUrl: './add-nave.component.html',
  styleUrls: ['./add-nave.component.scss']
})
export class AddNaveComponent implements OnInit {

  navesForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditNaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: INave,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.navesForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      modelo: ['', Validators.required],
      imagen: ''
    });
  }

  processFile(file: any): void {

    const reader = new FileReader();

    reader.readAsDataURL(file.files[0]);

    reader.onloadend = () => {

      this.navesForm.get('imagen').setValue(reader.result);
    };

  }

  crearNave(): void {
    Object.keys(this.navesForm.controls).forEach(field => {
      const control = this.navesForm.get(field);
      control.markAsTouched();
    });

    if (this.navesForm.valid) {
      const data: INave = {
        nombre: this.navesForm.get('nombre').value,
        modelo: this.navesForm.get('modelo').value,
        imagen: this.navesForm.get('imagen').value
      };
      this.dialogRef.close(data);
    }

  }

  canceler(): void {
    this.dialogRef.close(undefined);
  }

}
