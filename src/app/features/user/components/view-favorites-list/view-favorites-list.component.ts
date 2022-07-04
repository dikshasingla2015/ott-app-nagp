import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Favorites } from 'src/app/core/interfaces/favorites.model';

@Component({
  selector: 'app-view-favorites-list',
  templateUrl: './view-favorites-list.component.html',
  styleUrls: ['./view-favorites-list.component.scss']
})
export class ViewFavoritesListComponent implements OnInit {

  favorites!: Favorites[];

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.favorites = response.favoritesList;
      console.log(this.favorites);
    });
  }

}
