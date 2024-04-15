import {Component, Input} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() isModalOpen$!: BehaviorSubject<boolean>;


  openModal() {
    this.isModalOpen$.next(true);
  }
}
