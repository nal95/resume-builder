import {Component} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {UserDataStoreService} from "../../services/user-data-store/user-data-store.service";

@Component({
  selector: 'app-semi-pro',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './semi-pro.component.html',
  styleUrl: './semi-pro.component.css'
})
export class SemiProComponent {

  data$ = this.data.userData$;

  constructor(private data: UserDataStoreService) {
  }


  checkRead(val: string) {
    return (val.toLowerCase().includes('read') || val.toLowerCase().includes('book'));
  }

  checkPiano(val: string) {
    return (val.toLowerCase().includes('piano') || val.toLowerCase().includes('music'));
  }

  checkSports(val: string) {
    return (val.toLowerCase().includes('sport') || val.toLowerCase().includes('football'));
  }

  checkTraveling(val: string) {
    return (val.toLowerCase().includes('travel'));
  }

  checkLab(val: string) {
    return (val.toLowerCase().includes('lab') || val.toLowerCase().includes('home'));
  }

  check(val: string) {
    return this.checkRead(val) || this.checkPiano(val) || this.checkSports(val) || this.checkTraveling(val) || this.checkLab(val);
  }
}
