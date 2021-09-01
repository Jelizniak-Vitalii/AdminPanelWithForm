import { Component, OnDestroy, OnInit } from '@angular/core';
import { SendDataService } from '../service/sendDataService';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-status-message',
  templateUrl: './status-message.component.html',
  styleUrls: ['./status-message.component.scss']
})
export class StatusMessageComponent implements OnInit, OnDestroy {
  messageError: string = ' ';
  messageSuccess: string = ' ';

  destroySubscribe = new Subject();


  constructor(
    private sendDataService: SendDataService,
  ) { }

  ngOnInit(): void {
    this.sendDataService.messageErrorState$
      .pipe(takeUntil(this.destroySubscribe))
      .subscribe((el: any) => {
      this.messageError = el
    })

    this.sendDataService.messageSuccessState$
      .pipe(takeUntil(this.destroySubscribe))
      .subscribe((el: any) => {
      this.messageSuccess = el;
    })
  }

  ngOnDestroy(): void {
    this.destroySubscribe.next();
    this.destroySubscribe.complete();
  }

}
