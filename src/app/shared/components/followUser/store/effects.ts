import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {followUserActions} from './actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {FollowUserService} from '../services/followUser.service';
import {UserProfileInterface} from 'src/app/userProfile/types/userProfile.interface';

export const getUserProfile = createEffect(
  (
    actions$ = inject(Actions),
    followUserService = inject(FollowUserService)
  ) => {
    return actions$.pipe(
      ofType(followUserActions.followUser),
      switchMap(({isFollowed, slug}) => {
        const user$ = isFollowed
          ? followUserService.followUser(slug)
          : followUserService.unfollowUser(slug);
        return user$.pipe(
          map((userProfile: UserProfileInterface) => {
            return followUserActions.followUserSuccess({userProfile});
          }),
          catchError(() => {
            return of(followUserActions.followUserFailure());
          })
        );
      })
    );
  },
  {functional: true}
);
