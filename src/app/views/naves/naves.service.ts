import { IApiResponse } from './../../core/models/api-response.model';
import { environment } from './../../../environments/environment.prod';
import { INave } from './../../core/models/naves.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class NavesService {
  private cache = new Map<number, [Date, IApiResponse]>();
  constructor(
    private httpClient: HttpClient
  ) { }

  getNavesFromApi(page: number): Observable<IApiResponse> {
    const tiempo = 5;
    const result = this.httpClient.get(environment.navesApiUrl + '?page=' + page)
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
        const exp = new Date();
        exp.setSeconds(exp.getSeconds() + tiempo);
        this.cache.set(page, [exp, apiResponse]);
        return apiResponse;
      }));


    const navesCache = this.cache.get(page);

    if (!navesCache) {
      return result;
    }

    const expira = navesCache[0];
    const cacheResult = of(navesCache[1]);

    const ahora = new Date();
    if (expira && expira.getTime() < ahora.getTime()) {
      this.cache.delete(page);
      return result;
    }

    return cacheResult;
  }



}
