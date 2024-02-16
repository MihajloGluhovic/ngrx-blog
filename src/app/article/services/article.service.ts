import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  deleteArticle(slug: string): Observable<{}> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http.delete(fullUrl);
  }
}
