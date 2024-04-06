import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../resume-data/user.data";
import {GET_USER} from "../../backend/api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  getUserData(userId: string): Observable<User> {
    return this.http.get<User>(GET_USER + userId);
  }
}
