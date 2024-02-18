import {UserProfileInterface} from './userProfile.interface';

export interface UserProfileStateInterface {
  data: UserProfileInterface | null;
  isLoading: boolean;
  error: string | null;
}
