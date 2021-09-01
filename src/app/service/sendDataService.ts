import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { FormValue } from './httpService';

@Injectable({
  providedIn: 'root'
})

export class SendDataService {
  update = new Subject();

  private data = new Subject();
  data$ = this.data.asObservable();

  private openFormState = new Subject();
  openFormState$ = this.openFormState.asObservable();

  private messageErrorState = new Subject();
  messageErrorState$ = this.messageErrorState.asObservable();

  private messageSuccessState = new Subject();
  messageSuccessState$ = this.messageSuccessState.asObservable();

  changeData(data: FormValue) {
   return this.data.next(data)
  }

  openForm(data: boolean) {
    return this.openFormState.next(data);
  }

  messageError(data: string) {
    return this.messageErrorState.next(data);
  }

  messageSuccess(data: string) {
    return this.messageSuccessState.next(data);
  }
}
