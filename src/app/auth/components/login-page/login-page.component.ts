import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { LoginDetails } from '../../../core/interfaces/logindetails.model';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  roles!: string;
  userNameControl!: FormControl;
  passwordControl!: FormControl;

  constructor(private readonly authService: AuthService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly navigationService: NavigationService,
    private readonly translateService: TranslateService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userNameControl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordControl = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(6),
    Validators.pattern('[a-zA-Z0-9 ,]+')]);
    this.loginForm = new FormGroup({
      username: this.userNameControl,
      password: this.passwordControl
    });
  }

  onLoginFormSubmit(): void {
    const user: LoginDetails = this.loginForm.value as LoginDetails;
    this.userService.getUserData(user.username, user.password).subscribe(
      response => {
        if (response !== undefined) {
          this.authService.login(response).subscribe(data => {
            this.router.navigateByUrl('/movies');
          });
        } else {
          this.openSnackBar(this.translateService.instant('LOGIN.INVALID_CREDS'),
            '', "danger-style");
          this.loginForm.reset();
        }
      }
    );
  }

  openSnackBar(message: string, action: string, style: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [style],
      verticalPosition: "top",
      horizontalPosition: "right"
    });
  }

  getControlValidationClasses(control: FormControl): any {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }

}
