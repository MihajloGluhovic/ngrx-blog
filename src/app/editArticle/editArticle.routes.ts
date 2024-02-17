import {Route} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {EditArticleComponent} from './components/editArticle.component';
import {EditArticleService} from './services/editArticle.service';
import * as editArticleEffects from './store/effects';
import {provideState} from '@ngrx/store';
import {editArticleFeatureKey, editArticleReducer} from './store/reducers';

export const routes: Route[] = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      EditArticleService,
      provideState(editArticleFeatureKey, editArticleReducer),
      provideEffects(editArticleEffects),
    ],
  },
];
