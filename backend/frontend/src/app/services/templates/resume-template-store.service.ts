import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ResumeTemplate} from "../../resume-data/template-data";

@Injectable({
  providedIn: 'root'
})
export class ResumeTemplateStoreService {

  private readonly _resumeTemplate = new BehaviorSubject<ResumeTemplate>(
    {} as ResumeTemplate);

  readonly resumeTemplate$ = this._resumeTemplate.asObservable();

  get resumeTemplate(): ResumeTemplate {
    return this._resumeTemplate.getValue();
  }

  private set resumeTemplate(template: ResumeTemplate) {
    this._resumeTemplate.next(template);
  }

  setUserData(template: ResumeTemplate) {
    this.resumeTemplate = template;
  }
}
