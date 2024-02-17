import {CurrentUserInterface} from './currentUser.interface';

export interface CurrentUserRequestInterface {
  user: CurrentUserInterface & {password: string};
}
