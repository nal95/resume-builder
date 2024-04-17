import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EditorChangeContent, EditorChangeSelection, QuillEditorComponent, QuillService} from "ngx-quill";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

export type InputType = 'list' | 'paragraph';

@Component({
  selector: 'app-quill',
  standalone: true,
  imports: [
    QuillEditorComponent,
    FormsModule,
    NgIf
  ],
  template: `
    <quill-editor
      class="is-block"
      [ngModel]="text"
      (onEditorChanged)="keepTheCorrespondingFormat($event)"
      (ngModelChange)="updateInput($event)"
      (onEditorCreated)="activateInputType($event)"
      [placeholder]="placeholder">
      <div quill-editor-toolbar>
          <span class="ql-formats is-flex is-justify-content-center">
            <p class="buttons">
              <button type="button" class="ql-bold" aria-pressed="false" aria-label="bold">
                <svg viewBox="0 0 18 18">
                  <path class="ql-stroke"
                        d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"></path>
                  <path class="ql-stroke"
                        d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"></path>
                </svg>
              </button>
              <button type="button" class="ql-italic" aria-pressed="false" aria-label="italic">
                <svg viewBox="0 0 18 18">
                  <line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"></line>
                  <line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"></line>
                  <line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"></line>
                </svg>
              </button>
              <button type="button" class="ql-underline" aria-pressed="false" aria-label="underline">
                <svg viewBox="0 0 18 18">
                  <path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"></path>
                  <rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"></rect>
                </svg>
              </button>
              <button type="button" class="ql-link" aria-pressed="false" aria-label="link">
                <svg viewBox="0 0 18 18">
                  <line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"></line>
                  <path class="ql-even ql-stroke"
                        d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path>
                  <path class="ql-even ql-stroke"
                        d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path>
                </svg>
              </button>
              <button *ngIf="inputType == 'list'"
                      class="ql-list"
                      aria-pressed="false"
                      value="bullet"
                      aria-label="list: bullet">
                <span class="icon is-small">
                  <i class="ri-list-check"></i>
                </span>
              </button>
              <button class="button"
                      title=" {{inputType == 'paragraph' ? 'close the editor content' : 'clean up your text area'}} "
                      (click)="cleanupEditor()">
                <span class="icon is-small" *ngIf="(inputType == 'paragraph')">
                  <i class="ri-close-circle-line"></i>
                </span>
                <span class="icon is-small" *ngIf="(inputType == 'list')">
                  <i class="ri-delete-back-2-line"></i>
                </span>
              </button>
            </p>
          </span>
      </div>
    </quill-editor>
  `
})
export class QuillComponent {
  @Input() text = '';
  @Input() placeholder = '';
  @Input() inputType: InputType = 'paragraph';


  @Output() textChanged = new EventEmitter<string>();
  @Output() resumeTextTypeChanged = new EventEmitter<InputType>();


  constructor(private quill: QuillService) {
    quill.getQuill()
  }

  updateInput(text: string) {
    this.text = text;
    this.textChanged.emit(text)
  }

  cleanupEditor() {
    this.text = '';
    this.textChanged.emit(this.text)
  }

  activateInputType(editor: any) {
    if (this.inputType == 'list') editor.format('list', 'bullet');
  }

  keepTheCorrespondingFormat($event: EditorChangeContent | EditorChangeSelection) {
    if (this.inputType == 'list' && $event.event == 'text-change' && $event.html == '<p></p>') {
      $event.editor.format('list', 'bullet');
    }
  }

}
