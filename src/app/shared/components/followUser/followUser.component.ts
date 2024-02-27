// import {CommonModule} from '@angular/common';
// import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
// import {AddToFavoritesService} from '../addToFavorites/services/addToFavorites.service';
// import {Store} from '@ngrx/store';
// import {followUserActions} from './store/actions';
// import {combineLatest} from 'rxjs';
// import {selectIsSubmitting, selectUser} from './store/reducers';

// @Component({
//   selector: 'mc-follow-user',
//   templateUrl: './followUser.component.html',
//   standalone: true,
//   imports: [CommonModule],
//   providers: [AddToFavoritesService],
// })
// export class FollowUserComponent implements OnChanges {
//   @Input() isFollowed: boolean = false;
//   @Input() userSlug: string = '';

//   data$ = combineLatest({
//     isSubmitting: this.store.select(selectIsSubmitting),
//     user: this.store.select(selectUser),
//   });

//   constructor(private store: Store) {}

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['isFollowed']) {
//       // Handle initialization logic based on some condition
//       // For example, set isFollowed based on the userSlug or other conditions
//       this.isFollowed = this.calculateIsFollowedBasedOnCondition();
//     }
//   }

//   handleFollow(): void {
//     this.store.dispatch(
//       followUserActions.followUser({
//         isFollowed: this.isFollowed,
//         slug: this.userSlug,
//       })
//     );

//     this.isFollowed = !this.isFollowed;

//     console.log(this.isFollowed);
//   }

//   private calculateIsFollowedBasedOnCondition(): boolean {
//     // Implement your logic here to determine the initial value of isFollowed
//     // For example, you can use the userSlug or other conditions
//     return this.isFollowed;
//   }
// }

import {CommonModule} from '@angular/common';
import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AddToFavoritesService} from '../addToFavorites/services/addToFavorites.service';
import {Store} from '@ngrx/store';
import {followUserActions} from './store/actions';
import {combineLatest, map} from 'rxjs';
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
  }
}
