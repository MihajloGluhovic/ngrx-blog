import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, map} from 'rxjs';
import {ArticleInterface} from 'src/app/shared/types/article.interface';
import {ArticleRequestInterface} from 'src/app/shared/types/articleRequest.interface';
import {ArticleResponseInterface} from 'src/app/shared/types/articleResponse.interface';
import {environment} from 'src/environments/environment.development';

@Injectable()
export class CreateArticleService {
  constructor(private http: HttpClient) {}

  createArticle(
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const fullUrl = environment.apiUrl + '/articles';

    return this.http
      .post<ArticleResponseInterface>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }
}
