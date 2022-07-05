import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/core/services/Movie/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from 'src/app/core/interfaces/movie.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {

  addMovieForm!: FormGroup;
  nameControl!: FormControl;
  titleControl!: FormControl;
  languageControl!: FormControl;
  genreControl!: FormControl;
  imdbRatingControl!: FormControl;
  isAvailableOnPrimeControl!: FormControl;
  descriptionControl!: FormControl;

  constructor(private movieService: MovieService,
    private router: Router,
    private snackBar: MatSnackBar,
    private readonly translateService: TranslateService) {
  }

  ngOnInit() {
    this.nameControl = new FormControl('', [Validators.required, Validators.minLength(4),
    Validators.pattern('[a-zA-Z ,]+')]);
    this.titleControl = new FormControl('', [Validators.required, Validators.minLength(4),
    Validators.pattern('[a-zA-Z ,]+')]);
    this.languageControl = new FormControl('', [Validators.required]);
    this.genreControl = new FormControl('', [Validators.required]);
    this.imdbRatingControl = new FormControl('', [Validators.required]);
    this.isAvailableOnPrimeControl = new FormControl('', [Validators.required]);
    this.descriptionControl = new FormControl('', [Validators.required]);

    this.addMovieForm = new FormGroup({
      name: this.nameControl,
      title: this.titleControl,
      language: this.languageControl,
      genre: this.genreControl,
      imdbRating: this.imdbRatingControl,
      isAvailableOnPrime: this.isAvailableOnPrimeControl,
      description: this.descriptionControl
    });

  }

  onFormSubmit() {
    const newMovie: Movie = this.addMovieForm.value;
    newMovie.imageURL = "/assets/images/movies/default.jpg";
    newMovie.isAvailableOnPrime = (newMovie.isAvailableOnPrime.toString() === 'true');
    newMovie.reviews = [];
    this.movieService.addMovieDetails(newMovie).subscribe(
      data => {
        if (data === 'Movie Already Exists.') {
          this.openSnackBar(this.translateService.instant('ADD_MOVIE.MOVIE_ALREADY_EXIST'),
            '', "danger-style");
          this.addMovieForm.reset();
        } else {
          this.openSnackBar(this.translateService.instant('ADD_MOVIE.MOVIE_CREATED_SUCCESSFULLY'),
            '', "success-style");
          this.router.navigateByUrl('/movies');
        }
      });
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

  onCancelClicked() {
    this.router.navigateByUrl('/movies');
  }
}