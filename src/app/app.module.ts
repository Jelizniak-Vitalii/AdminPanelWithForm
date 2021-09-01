import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BtnCreateUserComponent } from './btn/btn-create-user/btn-create-user.component';
import { BtnSaveComponent } from './btn/btn-save/btn-save.component';
import { BtnDeleteComponent } from './btn/btn-delete/btn-delete.component';
import { FormCreateUserComponent } from './form/form-create-user/form-create-user.component';
import { StatusMessageComponent } from './status-message/status-message.component';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BtnCreateUserComponent,
    BtnSaveComponent,
    BtnDeleteComponent,
    FormCreateUserComponent,
    StatusMessageComponent,
    Error403Component,
    Error404Component
  ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
