import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

import { environment } from 'src/environments/environment';
import { FormValue, HttpService } from 'src/app/service/httpService';
import { SendDataService } from 'src/app/service/sendDataService';

@Component({
  selector: 'app-form-create-user',
  templateUrl: './form-create-user.component.html',
  styleUrls: ['./form-create-user.component.scss']
})
export class FormCreateUserComponent implements OnInit, OnDestroy {

  formStatus: boolean;
  userName: string = '';
  id: string;

  destroySubscribe = new Subject();

  form: FormGroup;

  constructor(
    private httpService: HttpService,
    private sendDataService: SendDataService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.email,
        Validators.required]),
      selectStatus: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,15}$/),
        Validators.required]),
      repeatPassword: new FormControl('', [Validators.required])
    })

    this.sendDataService.data$
      .pipe(takeUntil(this.destroySubscribe))
      .subscribe((el: any) => {
      this.userName = '';
      this.form.patchValue({
        userName: el.userName,
        firstName: el.firstName,
        lastName: el.lastName,
        email: el.email,
        selectStatus: el.selectStatus,
        password: el.password,
        repeatPassword: el.password,
      });
      this.userName += el.firstName + ' ' + el.lastName
        this.id = el._id
    })

    this.sendDataService.openFormState$
      .pipe(takeUntil(this.destroySubscribe))
      .subscribe((el: any) => {
      this.formStatus = el
    })
  }

  submit(): void {
    if (this.form.valid) {
      this.serverRequest(environment.CREATE_USER, this.form.value);
    }
  }

  delete(): void {
    this.serverRequest(environment.DELETE_USER, {...this.form.value, id: this.id });
  }

  closeForm(): void {
    this.formStatus = !this.formStatus;
    this.form.reset();
    this.userName = '';
  }

  updateUsers(): void {
    this.serverRequest(environment.UPDATE_USER, {...this.form.value, id: this.id });
  }

  serverRequest(url: string, data: FormValue): void {
    if (this.form.valid) {
      this.httpService.changeUsers(url, data)
        .pipe(takeUntil(this.destroySubscribe))
        .subscribe((el: any) => {
          this.formStatus = !this.formStatus;
          this.form.reset();
          this.userName = '';
          this.sendDataService.update.next();
          this.sendDataService.messageSuccess(el.response);
          setTimeout(() => {
            this.sendDataService.messageSuccess('');
          }, 5000);
        }, error => {
          if (error.status == 400) {
            this.sendDataService.update.next();
            this.sendDataService.messageError(error.error.response);
            setTimeout(() => {
              this.sendDataService.messageError('');
            }, 5000);
          } else {
            this.router.navigate(['./error404']);
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.destroySubscribe.next();
    this.destroySubscribe.complete();
  }
}
