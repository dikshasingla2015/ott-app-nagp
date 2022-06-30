import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimePackage } from 'src/app/core/interfaces/prime-package.model';
import { PrimePackageService } from 'src/app/core/services/Prime/prime-package.service';

@Component({
  selector: 'app-add-prime-package',
  templateUrl: './add-prime-package.component.html',
  styleUrls: ['./add-prime-package.component.scss']
})
export class AddPrimePackageComponent implements OnInit {

  addPrimePackageForm!: FormGroup;
  nameControl!: FormControl;
  descriptionControl!: FormControl;
  durationControl!: FormControl;
  priceControl!: FormControl;

  constructor(private primePackageService: PrimePackageService,
    private router: Router,
    private snackBar: MatSnackBar,
    private readonly translateService: TranslateService) {
  }

  ngOnInit() {
    this.nameControl = new FormControl('', [Validators.required, Validators.minLength(3),
    Validators.pattern('[a-zA-Z ,]+')]);
    this.durationControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]);
    this.priceControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]);
    this.descriptionControl = new FormControl('', [Validators.pattern('[a-zA-Z ,]+')]);

    this.addPrimePackageForm = new FormGroup({
      name: this.nameControl,
      price: this.priceControl,
      durationInMonths: this.durationControl,
      description: this.descriptionControl
    });

  }

  onFormSubmit() {
    const newPackage: PrimePackage = this.addPrimePackageForm.value;
    this.primePackageService.addPrimePackageDetails(newPackage).subscribe(
      data => {
        this.openSnackBar(this.translateService.instant('ADD_PRIME_PACKAGE.PACKAGE_ADDED_SUCCESSFULLY'),
          '', "success-style");
        this.router.navigateByUrl('/home');
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
    this.router.navigateByUrl('/home');
  }

}
