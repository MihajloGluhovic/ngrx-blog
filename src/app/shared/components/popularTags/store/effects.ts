import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PopularTagService} from '../services/popularTag.service';
import {popularTagsActions} from './actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {PopularTagType} from '../../../types/popularTag.type';

export const getPopularTagsEffects = createEffect(
  (
    actions$ = inject(Actions),
    popularTagService = inject(PopularTagService)
  ) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(() => {
        return popularTagService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return popularTagsActions.getPopularTagsSuccess({popularTags});
          }),
          catchError(() => {
            return of(popularTagsActions.getPopularTagsFailure());
          })
        );
      })
    );
  },
  {functional: true}
);
