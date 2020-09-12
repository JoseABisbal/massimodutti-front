import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/material/material.module';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { of } from 'rxjs';
import { TopBarComponent } from 'src/app/shared/components/top-bar/top-bar.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [LoginComponent],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call login ', () => {
    component.ngOnInit();

    component.loginForm.setValue({
      username: 'jbisbal',
      password: '123',
      remember: true
    });

    fixture.detectChanges();

    component.login();
  });

  it('should call login and wrong credentials', () => {

    const authService = TestBed.inject(AuthenticationService);
    spyOn(authService, 'login').and.returnValue(of(false));
    authService.login('', '').subscribe(response => {
      expect(response).toBe(false);
    });
    component.ngOnInit();

    fixture.detectChanges();

    component.login();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call register', () => {
    expect(component.register).toBeTruthy();
  });
});
