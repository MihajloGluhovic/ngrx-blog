import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {ArticleInterface} from 'src/app/shared/types/article.interface';
import {ArticleRequestInterface} from 'src/app/shared/types/articleRequest.interface';
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface';

export const editArticleActions = createActionGroup({
  source: 'create article',
  events: {
    'Get article': props<{slug: string}>(),
    'Get article success': props<{article: ArticleInterface}>(),
    'Get article failure': emptyProps(),

    'Update article': props<{request: ArticleRequestInterface; slug: string}>(),
    'Update article success': props<{article: ArticleInterface}>(),
    'Update article failure': props<{errors: BackendErrorsInterface}>(),
  },
});
