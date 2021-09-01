import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


export interface FormValue {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    selectStatus: string,
    password: string | number,
}

@Injectable({
  providedIn: 'root'
})

export class HttpService {

    constructor(
        private http: HttpClient
        ) { }

    changeUsers(api: string, value: FormValue) {
        return this.http.post(api, value)
    }

    getUsers(api: string) {
        return this.http.get( api )
    }
}
