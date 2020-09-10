import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthenticationService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call register ', () => {
    component.ngOnInit();

    component.registerForm.setValue({
      firstName: 'Jose A',
      lastName: 'Bisbal',
      userName: 'jbisbal',
      password: '123',
      confirmarPassword: '123'
    });

    fixture.detectChanges();

    component.register();
  });

  it('should call register and wrong credentials', () => {

    const authService = TestBed.inject(AuthenticationService);
    spyOn(authService, 'register').and.returnValue(of(false));

    component.ngOnInit();

    fixture.detectChanges();

    component.login();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
