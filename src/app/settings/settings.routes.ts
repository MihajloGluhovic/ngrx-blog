import {Route} from '@angular/router';
import {SettingsComponent} from './components/settings.component';
import {settingsFeatureKey, settingsReducer} from './store/reducers';
import {provideState} from '@ngrx/store';

export const routes: Route[] = [
  {
    path: '',
    component: SettingsComponent,
    providers: [provideState(settingsFeatureKey, settingsReducer)],
  },
];
