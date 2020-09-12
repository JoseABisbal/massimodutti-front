import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { IUser } from '../models/user.model';

describe('AuthenticationService', () => {
  let authenticationServiceSut: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    authenticationServiceSut = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(authenticationServiceSut).toBeTruthy();
  });

  it('when login then return true', () => {
    // arrange
    const newUser: IUser = {
      nombre: 'jose',
      apellidos: 'bisbal',
      usuario: 'jbisbal',
      clave: '123'
    };

    // act
    authenticationServiceSut.register(newUser)
    .subscribe(registrationResponse => {

      authenticationServiceSut.login(newUser.usuario, newUser.clave)
      .subscribe(loginResponse => {
        // assert
        expect(loginResponse).toBe(true);
      });

    });

    // assert
  });

  it('when register and login then return false', () => {
    // arrange
    const newUser: IUser = {
      nombre: 'jose',
      apellidos: 'bisbal',
      usuario: 'jbisbal',
      clave: '123'
    };

    // act
    authenticationServiceSut.register(newUser)
    .subscribe(registrationResponse => {

      authenticationServiceSut.login(newUser.usuario, '111')
      .subscribe(loginResponse => {
        // assert
        expect(loginResponse).toBe(false);
      });

    });

    // assert
  });

  it('when login then return false', () => {

    localStorage.clear();

    // act
    authenticationServiceSut.login('user', '111')
      .subscribe(loginResponse => {
        // assert
        expect(loginResponse).toBe(false);
      });

    // assert
  });

  it('when register then return true', () => {

    // arrange
    const newUser: IUser = {
      nombre: 'jose',
      apellidos: 'bisbal',
      usuario: 'jbisbal',
      clave: '123'
    };

    authenticationServiceSut.register(newUser).subscribe(
     registerResponse => {
      // assert
       expect(registerResponse).toBe(true);
     });

    // act

    // assert
  });


  it('when register and user is null then return false', () => {

    // arrange


    authenticationServiceSut.register(null).subscribe(
     registerResponse => {
      // assert
       expect(registerResponse).toBe(false);
     });

    // act

    // assert
  });


  it('when logout', () => {

    authenticationServiceSut.logout();
    // arrange
    const newUser: IUser = {
      nombre: 'jose',
      apellidos: 'bisbal',
      usuario: 'jbisbal',
      clave: '123'
    };

    authenticationServiceSut.register(newUser)
    .subscribe(registerResponse => {
      // assert
        expect(authenticationServiceSut.usuarioLogueado).toBeNull();
        authenticationServiceSut.login(newUser.usuario, newUser.clave)
        .subscribe(loginResponse => {
          expect(authenticationServiceSut.usuarioLogueado).toEqual(newUser);
          authenticationServiceSut.logout();
          expect(authenticationServiceSut.usuarioLogueado).toBeNull();
        });
     });

    // act

    // assert
  });


  it('when isAuthenticated then return true', () => {

  // arrange
  const newUser: IUser = {
    nombre: 'jose',
    apellidos: 'bisbal',
    usuario: 'jbisbal',
    clave: '123'
  };

  //act
  authenticationServiceSut.register(newUser)
  .subscribe(registerResponse => {
      authenticationServiceSut.login(newUser.usuario, newUser.clave)
      .subscribe(loginResponse => {
        authenticationServiceSut.isAuthenticated()
        .subscribe( authenticatedResponse => {
          // assert
          expect(authenticatedResponse).toBe(true);
        }

        );

      });
   });

    // assert
  });


  it('when is not isAuthenticated then redirect to login', () => {

      // arrange
  const newUser: IUser = {
    nombre: 'jose',
    apellidos: 'bisbal',
    usuario: 'jbisbal',
    clave: '123'
  };

  //act
  authenticationServiceSut.register(newUser)
  .subscribe(registerResponse => {
      authenticationServiceSut.login(newUser.usuario, newUser.clave)
      .subscribe(loginResponse => {
        authenticationServiceSut.logout();
        authenticationServiceSut.isAuthenticated()
        .subscribe(authenticatedResponse => {
          expect(authenticatedResponse).toBe(false);

        });

      });
   });

    // assert
  });



});
