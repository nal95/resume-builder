import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../../resume-data/user-options.data.model";

@Injectable({
  providedIn: 'root'
})
export class UserDataStoreService {

  private readonly _userData = new BehaviorSubject<User>({} as User);

  readonly userData$ = this._userData.asObservable();

  get userData(): User {
    return this._userData.getValue();
  }

  private set userData(val: User) {
    this._userData.next(val);
  }

  setUserData(val: User) {
    this.userData = val;
  }

}
