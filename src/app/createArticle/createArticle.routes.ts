import {Route} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {CreateArticleComponent} from './components/createArticle.component';
import {CreateArticleService} from './services/createArticle.service';
import * as createArticleEffects from './store/effects';
import {provideState} from '@ngrx/store';
import {createArticleFeatureKey, createArticleReducer} from './store/reducers';

export const routes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [
      CreateArticleService,
      provideState(createArticleFeatureKey, createArticleReducer),
      provideEffects(createArticleEffects),
    ],
  },
];
