import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../resume-data/user.data";
import {GET_USER} from "../../backend/api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class ResumeDataService {

  constructor(private http: HttpClient) { }

  getUserDetails(userId: string): Observable<User> {
    return this.http.get<User>(GET_USER + userId);
  }
}
