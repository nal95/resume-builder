import {Component} from '@angular/core';
import {map} from "rxjs";
import {Network} from "../../resume-data/user-options.data.model";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserDataStoreService} from "../../services/user-data-store/user-data-store.service";
import {InputWithIconTextComponent} from "../../utils/input-with-icon-text/input-with-icon-text.component";

@Component({
  selector: 'app-networks',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    NgClass,
    InputWithIconTextComponent
  ],
  templateUrl: './networks.component.html',
  styleUrl: './networks.component.css'
})
export class NetworksComponent {

  userNetworks$ = this.dataStorageService.userData$.pipe(
    map(user => user.userDetails.networks)
  );

  constructor(public dataStorageService: UserDataStoreService) {
  }

  addNetwork() {
    const newNetwork: Network = {name: '', referenceName: 'Network', link: '', showContent: true};
    let userData = this.dataStorageService.userData;

    userData.userDetails.networks.push(newNetwork);
    this.dataStorageService.setUserData(userData);
  }

  toggleContent(network: Network) {
    network.showContent = !network.showContent;
  }

  deleteNetwork(network: Network) {
    let userData = this.dataStorageService.userData
    const index = userData.userDetails.networks.indexOf(network);

    if (index !== -1) {
      userData.userDetails.networks.splice(index, 1);
      this.dataStorageService.setUserData(userData);
    }
  }
}
