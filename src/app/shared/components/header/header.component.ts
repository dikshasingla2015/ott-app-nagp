import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/Auth/auth.service';
import { MovieService } from 'src/app/core/services/Movie/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  language = '';

  loggedIn: any;

  isAdmin: any;

  cart = 0;

  constructor(
    private auth: AuthService,
    private router: Router,
    public readonly translate: TranslateService,
    private readonly movieService: MovieService) {

    translate.addLangs(['en', 'gr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang!.match(/en|gr/) ? browserLang! : 'en');

    this.auth.isLoggedIn().subscribe(next => {
      this.loggedIn = next;
    });

    this.auth.isLoggedInAsAdmin().subscribe(next=>{
      this.isAdmin = next;
    });
    
  }

  ngOnInit(): void { }

  signIn(): void {
    this.router.navigate(['/auth/login']);
  }

  signOut(): void {
    this.auth.signOut();
    this.router.navigate(['/home']);
  }

  changeLanguageOnSelect(language: string): void {
    this.translate.use(language);
  }

  searchMovieByName(searchText: string): void {
    this.movieService.getMovieDataByName(searchText);
  }

  searchMovieByGenre(category: string): void {
    this.movieService.getMovieDataByGenre(category);
  }

}
