import { Router } from '@angular/router';
import { AuthenticationService } from './../../../core/auth/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  loginForm: FormGroup;
  invalidLogin: boolean;
  error: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }

  login(): void {
    this.authenticationService.login(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (response) => {
          if (response) {
            this.router.navigate(['/naves']);
          } else {
            this.invalidLogin = true;
          }
        },
        (error) => {
          this.error = error;
        }
      );
  }

  register(): void {
    this.router.navigate(['/login/register']);
  }

}
