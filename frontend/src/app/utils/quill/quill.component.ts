import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuillEditorComponent} from "ngx-quill";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-quill',
  standalone: true,
  imports: [
    QuillEditorComponent,
    FormsModule
  ],
  template: `
    <quill-editor
      class="is-block"
      format="html"
      [ngModel]="text"
      (ngModelChange)="updateText($event)"
      placeholder="enter your work description">
    </quill-editor>
  `
})
export class QuillComponent {
  @Input()
  text!: string;

  @Output()
  textChanged = new EventEmitter<string>();

  updateText(text: string) {
    this.text = text;
    this.textChanged.emit(text)
  }
}
