import { TestBed } from '@angular/core/testing';

import { NavesService } from './naves.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.prod';
import { IApiResponse } from 'src/app/core/models/api-response.model';

describe('NavesService', () => {
  let navesServiceSut: NavesService; // subject under test - objeto, servicio, component que se esta probando en este grupo de pruebas
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [NavesService]
    });
    navesServiceSut = TestBed.inject(NavesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    // assert
    expect(navesServiceSut).toBeTruthy();
  });

  it('when getNavesFromApi then return list', () => {
    // arrange
    let navesCount: number = 0;
    let naves = [];
    let navesFromApi: IApiResponse = {
      count: 1,
      results: [
        {
          nombre: 'nave 1',
          modelo: 'modelo nave 1',
          imagen: '',
          url: 'http://img.com'
        }
      ]
    };

    // act
    navesServiceSut.getNavesFromApi(1)
      .subscribe(response => {
        naves = response.results;
        navesCount = response.count;

        // assert
        expect(naves.length).toBeGreaterThan(0);
        expect(navesCount).toEqual(1);
      });

    const req = httpMock.expectOne(environment.navesApiUrl + '?page=' + 1);
    req.flush(navesFromApi);

    // assert
    expect(req.request.method).toBe('GET');
  });

  it('when getNavesFromApi and response is null then return empty list', () => {
    // arrange

    // act
    navesServiceSut.getNavesFromApi(1)
      .subscribe(response => {
        // assert
        expect(response.results.length).toBe(0);
      });

    const req = httpMock.expectOne(environment.navesApiUrl + '?page=' + 1);
    req.flush(null);

    // assert
    expect(req.request.method).toBe('GET');
  });

});
