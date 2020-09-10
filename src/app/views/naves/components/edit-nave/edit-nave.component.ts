import { INave } from './../../../../core/models/naves.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-nave',
  templateUrl: './edit-nave.component.html',
  styleUrls: ['./edit-nave.component.scss']
})
export class EditNaveComponent implements OnInit {

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
      nombre: [this.data.nombre, Validators.required],
      modelo: [this.data.modelo, Validators.required],
      imagen: this.data.imagen
    });
  }

  processFile(file: any): void {

    const reader = new FileReader();

    reader.readAsDataURL(file.files[0]);

    reader.onloadend = () => {

      this.navesForm.get('imagen').setValue(reader.result);
    };

  }

  guardarNave(): void {
    if (this.navesForm.valid) {
      this.data.nombre = this.navesForm.get('nombre').value;
      this.data.modelo = this.navesForm.get('modelo').value;
      this.data.imagen = this.navesForm.get('imagen').value;

      this.dialogRef.close(this.data);
    }
  }

  canceler(): void {
    this.dialogRef.close();
  }

}
