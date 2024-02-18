import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app/app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {isDevMode} from '@angular/core';
import {authFeatureKey, authReducer} from './app/auth/store/reducers';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import * as authEffects from './app/auth/store/effects';
import * as feedEffects from './app/shared/components/feed/store/effects';
import * as popularTagsEffects from './app/shared/components/popularTags/store/effects';
import * as addToFavoritesEffects from './app/shared/components/addToFavorites/store/effects';
import {provideRouterStore, routerReducer} from '@ngrx/router-store';
import {authInterceptor} from './app/shared/services/authInterceptor';
import {
  feedFeatureKey,
  feedReducer,
} from './app/shared/components/feed/store/reducers';
import {
  popularTagsFeatureKey,
  popularTagsReducer,
} from './app/shared/components/popularTags/store/reducers';
import {AddToFavoritesService} from './app/shared/components/addToFavorites/services/addToFavorites.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(appRoutes),
    provideStore({
      router: routerReducer,
    }),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideEffects(
      authEffects,
      feedEffects,
      popularTagsEffects,
      addToFavoritesEffects
    ),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    AddToFavoritesService,
  ],
});
