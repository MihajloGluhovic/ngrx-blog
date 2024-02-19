import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {AddToFavoritesService} from '../addToFavorites/services/addToFavorites.service';
import {Store} from '@ngrx/store';
import {followUserActions} from './store/actions';
import {combineLatest} from 'rxjs';
import {selectIsSubmitting, selectUser} from './store/reducers';

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

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    user: this.store.select(selectUser),
  });

  constructor(private store: Store) {}

  handleFollow(): void {
    this.store.dispatch(
      followUserActions.followUser({
        isFollowed: this.isFollowed,
        slug: this.userSlug,
      })
    );

    this.isFollowed = !this.isFollowed;

    console.log(this.isFollowed);
  }
}
