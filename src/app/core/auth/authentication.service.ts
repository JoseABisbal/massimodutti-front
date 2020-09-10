import { Observable, of } from 'rxjs';
import { IUser } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  get usuarioLogueado(): IUser | undefined {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');

    return (usuarioLogueado) ? JSON.parse(usuarioLogueado) as IUser : undefined;
  }

  set usuarioLogueado(value: IUser) {
    localStorage.setItem('usuarioLogueado', JSON.stringify(value));
  }

  constructor(
    private router: Router
  ) { }

  login(usuario: string, clave: string): Observable<boolean> {
    const usuariosRegistradosString = localStorage.getItem('usuarios-registrados');
    if (usuariosRegistradosString) {
      const usuariosDeserializado = JSON.parse(usuariosRegistradosString) as IUser[];
      const usuarioEncontrado = usuariosDeserializado.find(element => element.usuario === usuario && element.clave === clave);
      if (usuarioEncontrado) {
        this.usuarioLogueado = usuarioEncontrado;
        return of(true);
      }
      return of(false);
    }
    return of(false);
  }
  register(usuario: IUser): Observable<boolean> {
    if (usuario === null) {
      return of(false);
    }
    const usuariosRegistradosString = localStorage.getItem('usuarios-registrados');
    if (usuariosRegistradosString) {
      const usuariosDeserializado = JSON.parse(usuariosRegistradosString) as IUser[];
      usuariosDeserializado.push(usuario);
      localStorage.setItem('usuarios-registrados', JSON.stringify(usuariosDeserializado));
    } else {
      const usuarios = [];
      usuarios.push(usuario);
      localStorage.setItem('usuarios-registrados', JSON.stringify(usuarios));
    }
    return of(true);
  }

  logout(): void {
    this.usuarioLogueado = null;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    if (!this.usuarioLogueado) {
      this.router.navigate(['/login']);
      return of(false);
    }
    return of(true);
  }
}
