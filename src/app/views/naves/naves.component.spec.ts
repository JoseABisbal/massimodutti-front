import { IApiResponse } from './../../core/models/api-response.model';
import { Observable, Subject, of } from 'rxjs';
import { NavesService } from './naves.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavesComponent } from './naves.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavesComponent', () => {
  let component: NavesComponent;
  let fixture: ComponentFixture<NavesComponent>;

  let nave = {
    nombre: 'Nave1',
    modelo: 'Nav123',
    fabricante: 'micro',
    consumible: '2',
    imagen: 'imageurl',
    longitud: '12',
    url: 'url'
  };
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavesComponent],
      providers: [NavesService],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when cargarNaves then return list', () => {
    const service = TestBed.inject(NavesService);
    const navesObservable = new Subject<IApiResponse>();
    navesObservable.next({
      count: 1,
      results: []
    });
    spyOn(service, 'getNavesFromApi').and.callThrough().and.returnValues(navesObservable);
    service.getNavesFromApi(1).subscribe(response => {
      expect(response.count).toEqual(1);
      expect(response.results.length).toEqual(0);

    });
    expect(service.getNavesFromApi).toHaveBeenCalled();

  });

});
