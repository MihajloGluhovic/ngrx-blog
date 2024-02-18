import {Route} from '@angular/router';
import {UserProfileComponent} from './components/userProfile.component';
import {UserProfileService} from './services/userProfile.service';
import {provideState} from '@ngrx/store';
import {userProfileFeatureKey, userProfileReducer} from './store/reducers';
import {provideEffects} from '@ngrx/effects';
import * as userProfileEffects from './store/effects';

export const routes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
    providers: [
      UserProfileService,
      provideState(userProfileFeatureKey, userProfileReducer),
      provideEffects(userProfileEffects),
    ],
  },
];
