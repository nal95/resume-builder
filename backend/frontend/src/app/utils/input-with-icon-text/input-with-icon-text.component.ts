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
               [type]="type"
               [placeholder]="placeholder"
               [name]="name"
               [min]="minNumber"
               [step]="step"
               [(ngModel)]="inputValue">
        <span class="icon is-small has-text-info-dark is-left"
              [style.width.em]="setIconTextWidth(label.length)">
          <i class="icon-text is-size-7 pb-3">{{ label ? (label + ':') : label }}</i>
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
  @Input() minNumber: number = 1/2;
  @Input() step: number = 1/2;

  setInputPaddingLeft(val: number) {
    if(val && val > 0){
      if( val > 6) return 7;
      if( val > 0 && val <= 5) return 5;
    }else if (val == 0) return 0.5

    return 6;
  }

  setIconTextWidth(val: number) {
    return val && val > 6 ? 6 : 5;
  }

}
