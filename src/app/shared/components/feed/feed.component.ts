import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {feedActions} from './store/actions';
import {combineLatest} from 'rxjs';
import {selectError, selectFeedData, selectIsLoading} from './store/reducers';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import {ErrorMessageComponent} from '../errorMessage/errorMessage.component';
import {LoadingComponent} from '../loading/loading.component';
import {environment} from 'src/environments/environment.development';
import {PaginationComponent} from '../pagination/pagination.component';
import queryString from 'query-string';
import {TagListComponent} from '../tagList/tagList.component';
import { AddToFavoritesComponent } from '../addToFavorites/addToFavorites.component';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddToFavoritesComponent
  ],
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() apiUrl: string = '';

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectFeedData),
  });
  limit = environment.limit;
  baseUrl = this.router.url.split('?')[0];
  currentPage: number = 0;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      console.log('params', params);
      this.currentPage = Number(params['page'] || '1');
      this.fetchFeed();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({url: apiUrlWithParams}));
  }
}
