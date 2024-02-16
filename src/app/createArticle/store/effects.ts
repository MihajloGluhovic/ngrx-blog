import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CreateArticleService} from '../services/createArticle.service';
import {inject} from '@angular/core';
import {createArticleActions} from './actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {ArticleInterface} from 'src/app/shared/types/article.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

export const createArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    createArticleService = inject(CreateArticleService)
  ) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticle),
      switchMap(({request}) => {
        return createArticleService.createArticle(request).pipe(
          map((article: ArticleInterface) => {
            return createArticleActions.createArticleSuccess({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createArticleActions.createArticleFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const redierectAfterCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticleSuccess),
      tap(({article}) => {
        router.navigate(['/articles', article.slug]);
      })
    );
  },
  {functional: true, dispatch: false}
);
