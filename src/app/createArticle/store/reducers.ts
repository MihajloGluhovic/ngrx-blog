import {routerNavigationAction} from '@ngrx/router-store';
import {createFeature, createReducer, on} from '@ngrx/store';
import {CreateArticleStateInterface} from '../types/createArticleState.interface';
import {createArticleActions} from './actions';

const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

const CreateArticleFeature = createFeature({
  name: 'create article',
  reducer: createReducer(
    initialState,
    on(createArticleActions.createArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(createArticleActions.createArticleSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(createArticleActions.createArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: createArticleFeatureKey,
  reducer: createArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = CreateArticleFeature;
