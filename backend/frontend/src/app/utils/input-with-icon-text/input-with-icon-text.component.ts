import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-input-with-icon-text',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <div class="field">
      <div class="control has-icons-left">
        <input class="input" [style.padding-left.em]="setInputPaddingLeft(label.length)"
               [type]="type" [placeholder]="placeholder" [name]="name" [min]="1/2" [step]="1/2"
               [(ngModel)]="inputValue">
        <span class="icon is-small has-text-info-dark is-left"
              [style.width.em]="setIconTextWidth(label.length)">
          <i class="icon-text is-size-7 pb-3">{{ label }}:</i>
        </span>
      </div>
    </div>
  `,
  styles: [`
    .input {
      border-radius: 9999px;
      padding-left: calc(1.125em - 1px);
      padding-right: calc(1.125em - 1px);
      font-size: 0.75rem;
    }

    .field {
      padding-bottom: 0.5rem
    }
  `]
})
export class InputWithIconTextComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '' ;
  @Input() type: string = '' ;
  @Input() inputValue: string | number = '';

  setInputPaddingLeft(val: number) {
    return val && val > 6 ? 7 : 6;
  }

  setIconTextWidth(val: number) {
    return val && val > 6 ? 6 : val;
  }

}
