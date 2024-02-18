import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {UserProfileInterface} from '../types/userProfile.interface';

export const userProfileActions = createActionGroup({
  source: 'User Profile',
  events: {
    'Get user profile': props<{slug: string}>(),
    'Get user profile success': props<{userProfile: UserProfileInterface}>(),
    'Get user profile failure': emptyProps(),
  },
});
