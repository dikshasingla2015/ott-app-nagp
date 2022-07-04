import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimePackage } from 'src/app/core/interfaces/prime-package.model';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-take-prime-membership',
  templateUrl: './take-prime-membership.component.html',
  styleUrls: ['./take-prime-membership.component.scss']
})
export class TakePrimeMembershipComponent implements OnInit {

  primePackages: PrimePackage[] = [];

  constructor(private readonly route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private readonly translateService: TranslateService) { }

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.primePackages = response.primePackagesList;
    });
  }

  takePrimeMembership(){
    this.authService.saveUserPrime();
    this.userService.updateUserPrimeStatus(this.authService.getUserId());
    this.openSnackBar(this.translateService.instant('OPT_PRIME.SUCCESSFULL'),
    '', "success-style");
    this.router.navigateByUrl('/movies');
  }

  openSnackBar(message: string, action: string, style: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [style],
      verticalPosition: "top",
      horizontalPosition: "right"
    });
  }

}
