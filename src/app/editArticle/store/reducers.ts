import {routerNavigationAction} from '@ngrx/router-store';
import {createFeature, createReducer, on} from '@ngrx/store';
import {EditArticleStateInterface} from '../types/editArticleState.interface';
import {editArticleActions} from './actions';

const initialState: EditArticleStateInterface = {
  article: null,
  isLoading: false,
  isSubmitting: false,
  validationErrors: null,
};

const EditArticleFeature = createFeature({
  name: 'edit article',
  reducer: createReducer(
    initialState,
    on(editArticleActions.getArticle, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(editArticleActions.getArticleSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      article: action.article,
    })),
    on(editArticleActions.getArticleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(editArticleActions.updateArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(editArticleActions.updateArticleSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(editArticleActions.updateArticleFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: editArticleFeatureKey,
  reducer: editArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle,
} = EditArticleFeature;
