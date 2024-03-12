import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {AddToFavoritesService} from './services/addToFavorites.service';
import {Store} from '@ngrx/store';
import {addToFavoritesActions} from './store/actions';
import {CurrentUserInterface} from '../../types/currentUser.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './addToFavorites.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [AddToFavoritesService],
})
export class AddToFavoritesComponent {
  @Input() isFavorited: boolean = false;
  @Input() favoritesCount: number = 0;
  @Input() articleSlug: string = '';
  @Input() currentUser: any;

  constructor(private store: Store, private router: Router) {}

  handleLike(): void {
    if (this.currentUser) {
      this.store.dispatch(
        addToFavoritesActions.addToFavorites({
          isFavorited: this.isFavorited,
          slug: this.articleSlug,
        })
      );
      if (this.isFavorited) {
        this.favoritesCount = this.favoritesCount - 1;
      } else {
        this.favoritesCount = this.favoritesCount + 1;
      }

      this.isFavorited = !this.isFavorited;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
