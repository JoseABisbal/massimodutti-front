import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNaveComponent } from './add-nave.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavesService } from '../../naves.service';
import { Subject } from 'rxjs';
import { IApiResponse } from 'src/app/core/models/api-response.model';
import { __asyncValues } from 'tslib';

describe('AddNaveComponent', () => {
  let component: AddNaveComponent;
  let fixture: ComponentFixture<AddNaveComponent>;

  let nave = {
    nombre: 'Nave1',
    modelo: 'Nav123',
    fabricante: 'micro',
    consumible: '2',
    imagen: 'imageurl',
    longitud: '12',
    url: 'url'
  };

  const dialogMock = {
    close: () => { }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNaveComponent],
      providers: [
        {
          provide: MatDialogRef, useValue: dialogMock
        },
        {
          provide: MAT_DIALOG_DATA, useValue: nave
        }
      ],
      imports: [
        ReactiveFormsModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.data = nave;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should crearNave', () => {
    component.data = nave;
    component.crearNave();
    expect(component).toBeTruthy();
  });


  it('should canceler', () => {
    component.data = nave;
    component.canceler();
    expect(component).toBeTruthy();
  });

});
