import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, map} from 'rxjs';
import {GetUserResponseInterface} from 'src/app/userProfile/types/getUserProfileResponse.interface';
import {UserProfileInterface} from 'src/app/userProfile/types/userProfile.interface';
import {environment} from 'src/environments/environment.development';

@Injectable()
export class FollowUserService {
  constructor(private http: HttpClient) {}

  followUser(slug: string): Observable<UserProfileInterface> {
    const url = `${environment.apiUrl}/profiles/${slug}/follow`;
    return this.http
      .post<GetUserResponseInterface>(url, {})
      .pipe(map((response) => response.profile));
  }

  unfollowUser(slug: string): Observable<UserProfileInterface> {
    const url = `${environment.apiUrl}/profiles/${slug}/follow`;
    return this.http
      .delete<GetUserResponseInterface>(url)
      .pipe(map((response) => response.profile));
  }
}
