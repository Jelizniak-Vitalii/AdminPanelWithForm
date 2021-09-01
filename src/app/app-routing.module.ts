import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { Error403Component } from "./error403/error403.component";
import { Error404Component } from "./error404/error404.component";

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'error403', component: Error403Component },
  { path: 'error404', component: Error404Component }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
