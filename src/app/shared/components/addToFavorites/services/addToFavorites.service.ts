import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, map} from 'rxjs';
import {ArticleInterface} from 'src/app/shared/types/article.interface';
import {ArticleResponseInterface} from 'src/app/shared/types/articleResponse.interface';
import {environment} from 'src/environments/environment.development';

@Injectable()
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http
      .post<ArticleResponseInterface>(url, {})
      .pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    return this.http
      .delete<ArticleResponseInterface>(url)
      .pipe(map(this.getArticle));
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  getArticle(response: ArticleResponseInterface): ArticleInterface {
    return response.article;
  }
}
