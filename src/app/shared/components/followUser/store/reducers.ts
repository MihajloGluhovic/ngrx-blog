import {createFeature, createReducer, on} from '@ngrx/store';
import {FollowUserStateInterface} from '../types/followUserState.interface';
import {followUserActions} from './actions';

const initialState: FollowUserStateInterface = {
  isSubmitting: false,
  user: null,
};

const followUserFeature = createFeature({
  name: 'follow user',
  reducer: createReducer(
    initialState,
    on(followUserActions.followUser, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(followUserActions.followUserSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      user: action.userProfile,
    })),
    on(followUserActions.followUserFailure, (state) => ({
      ...state,
      isSubmitting: false,
    }))
  ),
});

export const {
  name: followUserFeatureKey,
  reducer: followUserReducer,
  selectIsSubmitting,
  selectUser,
} = followUserFeature;
