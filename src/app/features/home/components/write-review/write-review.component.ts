import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from 'src/app/core/services/Movie/movie.service';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {

  @Input()
  movieId!: string;

  displayModal!: boolean;
  reviewForm!: FormGroup;

  reviewControl!: FormControl;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.reviewControl = new FormControl('', [Validators.required]);
    this.reviewForm = new FormGroup({
      review: this.reviewControl
    });
  }

  showModalDialog() {
    this.displayModal = true;
  }

  onReviewFormSubmit(): void {
    const reviewResponse: any = this.reviewForm.value as string;
    this.movieService.addMovieReview(this.movieId, reviewResponse.review);
    this.displayModal = false;
  }

  getControlValidationClasses(control: FormControl): any {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }

  onCancelClick() {
    this.displayModal = false;
  }

}
