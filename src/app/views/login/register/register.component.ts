import { IUser } from './../../../core/models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../../core/auth/authentication.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  passwordMissmatch: boolean;
  roles: string[] = ['ADMIN', 'GUEST'];
  isUserNotCreated: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmarPassword: ['', this.matchValues('password')]
    });
  }

  public matchValues(matchTo: string): (arg0: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent && !!control.parent.value && control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  passwordChange(event: any): void {
    if (event.currentTarget.value !== this.registerForm.get('password').value) {
      this.passwordMissmatch = true;
    } else {
      this.passwordMissmatch = false;
    }
  }

  register(): void {

    Object.keys(this.registerForm.controls).forEach(field => {
      const control = this.registerForm.get(field);
      control.markAsTouched();
    });

    if (this.registerForm.valid) {
      const userRegistred: IUser = {
        nombre: this.registerForm.get('firstName').value,
        apellidos: this.registerForm.get('lastName').value,
        usuario: this.registerForm.get('userName').value,
        clave: this.registerForm.get('password').value,
      };
      this.authenticationService.register(userRegistred)
        .subscribe(response => {
          if (response) {
            this.router.navigate(['/login']);
          } else {
            this.isUserNotCreated = true;
          }
        });
    }
  }

  login(): void {
    this.router.navigate(['/login']);
  }

}
