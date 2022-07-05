import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { LoginDetails } from '../../../core/interfaces/logindetails.model';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from 'src/app/core/services/Navigation/navigation.service';
import { FavoritesService } from 'src/app/core/services/Favorites/favorites.service';
import { StateData } from 'src/app/core/interfaces/statedata.model';
import { Favorites } from 'src/app/core/interfaces/favorites.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;

  roles!: string;
  userNameControl!: FormControl;
  passwordControl!: FormControl;

  constructor(private readonly authService: AuthService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly translateService: TranslateService,
    private readonly snackBar: MatSnackBar,
    private readonly navigationService: NavigationService,
    private readonly favoriteService: FavoritesService) { }

  ngOnDestroy(): void {
    console.info('destroyed')
  }

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
            const navResp = this.navigationService.getData();
            if (navResp.url !== '' && navResp.movieId !== '') {
              if (navResp.isMarkedAsFavorite) {
                this.favoriteService.addMovieAsFavorite(this.getFavoriteOrWatchedData(navResp)).subscribe(resp => {
                  this.router.navigateByUrl(navResp.url);
                  this.navigationService.resetData();
                });
              } else {
                this.favoriteService.addMovieAsWatched(this.getFavoriteOrWatchedData(navResp)).subscribe(resp => {
                  this.router.navigateByUrl(navResp.url);
                  this.navigationService.resetData();
                });
              }
            } else {
              this.router.navigateByUrl('/movies');
            }
          });
        } else {
          this.openSnackBar(this.translateService.instant('LOGIN.INVALID_CREDS'),
            '', "danger-style");
          this.loginForm.reset();
        }
      });
  }

  getFavoriteOrWatchedData(navResp: StateData): Favorites {
    return navResp.isMarkedAsFavorite ? {
      userId: this.authService.getUserId(),
      movieId: navResp.movieId,
      isMarkedAsFavorite: true,
      isMarkedAsWatched: false
    } : {
      userId: this.authService.getUserId(),
      movieId: navResp.movieId,
      isMarkedAsFavorite: false,
      isMarkedAsWatched: true
    };
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
