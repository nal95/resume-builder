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
               [size]="fieldSize"
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
  @Input() fieldSize: number = 10;

  // TODO: bien revoir ces 2 setters
  setInputPaddingLeft(val: number) {
    if(val && val > 0){
      if( val > 6) return 7;
      if( val > 4 && val <= 6) return 5;
      if( val > 0 && val <= 4) return 3.5;
    }else if (val == 0) return 0.5

    return 6;
  }

  setIconTextWidth(val: number) {
    if(val && val >= 0){
      if( val > 6) return 6;
      if( val >= 0 && val <= 4) return 2.5;
    }

    return 5;
  }

  // TODO: bien revoir cette methode et bien choisir l' $event pout la validation
  // (keyup)="controlTheInput($event)" ?
  // controlTheInput($event: KeyboardEvent) {
  //   const inputValueIsNumber = this.type === 'number';
  //   const inputValueIsFloat = this.step === 1/2;
  //   const inputValueIsInteger = this.step !== 1/2;
  //
  //   if (inputValueIsNumber ) {
  //     if (inputValueIsFloat) {
  //       if (typeof this.inputValue == 'number' && this.inputValue > 0)
  //     }
  //     if ($event.key === '0' || ($event.key.length > 1 && $event.key.includes('.') && inputValueIsFloat)) {
  //       this.inputValue = this.minNumber;
  //     } else if ($event.key.length > 1 && !inputValueIsFloat) {
  //       this.inputValue = this.minNumber;
  //     }
  //   }
  // }
}
