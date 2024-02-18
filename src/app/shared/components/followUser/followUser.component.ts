import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {AddToFavoritesService} from '../addToFavorites/services/addToFavorites.service';
import {Store} from '@ngrx/store';
import {followUserActions} from './store/actions';

@Component({
  selector: 'mc-follow-user',
  templateUrl: './followUser.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [AddToFavoritesService],
})
export class FollowUserComponent {
  @Input() isFollowed: boolean = false;
  @Input() userSlug: string = '';

  constructor(private store: Store) {}

  handleFollow(): void {
    this.store.dispatch(
      followUserActions.followUser({
        isFollowed: this.isFollowed,
        slug: this.userSlug,
      })
    );

    this.isFollowed = !this.isFollowed;

    console.log('followed?');
  }
}
