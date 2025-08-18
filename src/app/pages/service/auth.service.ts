import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";

@Injectable()
export class AuthService {
  private loginResponse = new BehaviorSubject<string | null>(null);

  constructor(private httpclient: HttpClient) { }

  login(email: string, password: string) {
    let token = this.httpclient.post<string>(`{/login}`, { email, password })
      .pipe(tap((response) => this.loginResponse.next(response)));
    return token;
  }
}
