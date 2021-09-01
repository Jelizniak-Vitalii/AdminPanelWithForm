import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { environment } from 'src/environments/environment';
import { FormValue, HttpService } from '../service/httpService';
import { SendDataService } from '../service/sendDataService';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  formStatus: boolean;
  users: FormValue[] = [];

  destroySubscribe = new Subject();

  constructor(
    private httpService: HttpService,
    private sendDataService: SendDataService,
  ) {
  }

  ngOnInit(): void {
    this.getUsers()
    this.sendDataService.update
      .pipe(takeUntil(this.destroySubscribe))
      .subscribe((el: any) => {
        this.getUsers()
      })
  }

  getUsers() {
    this.httpService.getUsers(environment.GET_USER)
      .pipe(takeUntil(this.destroySubscribe))
      .subscribe((el: any) => {
        this.users = el
      })
  }

  getRow(value: number): any {
    if (!this.formStatus) {
      this.sendDataService.changeData(this.users[value])
      this.sendDataService.openForm(true)
    }
  }

  createUser(): void {
    this.sendDataService.openForm(true)
  }

  ngOnDestroy(): void {
    this.destroySubscribe.next();
    this.destroySubscribe.complete();
  }

}
