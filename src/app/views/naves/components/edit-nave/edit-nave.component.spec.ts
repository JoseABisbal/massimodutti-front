import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNaveComponent } from './edit-nave.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavesService } from '../../naves.service';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('EditNaveComponent', () => {
  let component: EditNaveComponent;
  let fixture: ComponentFixture<EditNaveComponent>;

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
      declarations: [EditNaveComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: dialogMock
        },
        {
          provide: MAT_DIALOG_DATA, useValue: nave
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNaveComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    component.data = nave;
    component.ngOnInit();
    expect(component).toBeTruthy();
  });


  it('should canceler', () => {
    component.data = nave;
    component.canceler();
    expect(component).toBeTruthy();
  });

  it('should guardarNave', () => {
    component.data = nave;
    component.guardarNave();
    expect(component).toBeTruthy();
  });
});
