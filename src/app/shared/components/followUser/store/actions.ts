import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {UserProfileInterface} from 'src/app/userProfile/types/userProfile.interface';

export const followUserActions = createActionGroup({
  source: 'Follow user',
  events: {
    'Follow user': props<{isFollowed: boolean; slug: string}>(),
    'Follow user success': props<{userProfile: UserProfileInterface}>(),
    'Follow user failure': emptyProps(),
  },
});
