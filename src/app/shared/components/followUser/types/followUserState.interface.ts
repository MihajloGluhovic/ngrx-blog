import {ProfileInterface} from 'src/app/shared/types/profile.interface';

export interface FollowUserStateInterface {
  isSubmitting: boolean;
  user: ProfileInterface | null;
}
