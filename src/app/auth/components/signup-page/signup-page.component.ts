import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user.model';
import { TranslateService } from '@ngx-translate/core';
import Validation from '../../utils/validation';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  signUpForm!: FormGroup;
  firstNameControl!: FormControl;
  lastNameControl!: FormControl;
  emailControl!: FormControl;
  phoneNumberControl!: FormControl;
  passwordControl!: FormControl;
  confirmPasswordControl!: FormControl;

  constructor(private userService: UserService,
    private router: Router,
    private readonly translateService: TranslateService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {

  }

  ngOnInit() {

    this.firstNameControl = new FormControl('', [Validators.required, Validators.minLength(3),
    Validators.pattern('[a-zA-Z ,]+')]);

    this.lastNameControl = new FormControl('', [Validators.required, Validators.minLength(3),
    Validators.pattern('[a-zA-Z ,]+')]);

    this.emailControl = new FormControl('', [Validators.required, Validators.email]);

    this.phoneNumberControl = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),
    Validators.pattern('[0-9]+')]);

    this.passwordControl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10),
    Validators.pattern('[a-zA-Z0-9 ,]+')]);

    this.confirmPasswordControl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10),
    Validators.pattern('[a-zA-Z0-9 ,]+'),]);

    this.signUpForm = this.formBuilder.group({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      userName: this.emailControl,
      phoneNumber: this.phoneNumberControl,
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl
    }, {
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }

  onFormSubmit() {
    delete this.signUpForm.value.confirmPassword;
    const newUser = this.signUpForm.value as User;
    newUser.role = 'user';
    newUser.isPrimeMember = false;
    this.userService.addUserData(newUser).subscribe(
      data => {
        if (data === 'User Already Exists.') {
          this.openSnackBar(data, '', "danger-style");
          this.signUpForm.reset();
        } else {
          this.openSnackBar(data, '', "success-style");
          this.router.navigateByUrl('/auth/login');
        }
      }
    );
  }

  openSnackBar(message: string, action: string, style:string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [style],
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "right" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }

  onCancelClicked() {
    this.router.navigateByUrl('/auth/login');
  }

}