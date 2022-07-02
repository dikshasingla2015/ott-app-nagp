import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss']
})
export class SearchMovieComponent implements OnInit {

  @Output() searchText: EventEmitter<string> = new EventEmitter();

  searchForm!: FormGroup;

  searchNameControl!: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.searchNameControl = new FormControl('', []);
    this.searchForm = new FormGroup({
      searchMovieByName: this.searchNameControl,
    });
  }

  onSearchFormSubmit(): void {
    this.searchText.emit(this.searchForm.value.searchMovieByName);
  }

  onSearchInput(inputSearch: string): void {
    this.searchText.emit(inputSearch);
  }

  getControlValidationClasses(control: FormControl): any {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    };
  }

}
