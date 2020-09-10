import { IApiResponse } from './../../core/models/api-response.model';
import { environment } from './../../../environments/environment.prod';
import { INave } from './../../core/models/naves.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NavesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getNavesFromApi(page: number): Observable<IApiResponse> {

    return this.httpClient.get(environment.navesApiUrl + '?page=' + page)
    .pipe(map((response: any) => {
      const naves: INave[] = [];
      response?.results.forEach(element => {
        naves.push(
          {
            nombre: element.name,
            modelo: element.model,
            fabricante: element.manufacturer,
            consumible: element.consumables,
            longitud: element.length,
            imagen: environment.imagenApiUrl + element.url.substr(-2, 1) + '.jpg'
          }
        );
      });
      const apiResponse: IApiResponse = {
        count: response?.count,
        next: response?.next,
        previous: response?.previous,
        results: naves
      };

      return apiResponse;
    }));
  }



}
