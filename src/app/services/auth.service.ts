import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  
  isAuthenticated = false;
  BASE_URL = 'http://localhost:4201/auth';

  constructor(private http: HttpClient) { }

  login(data) {
    if (data.email.toLowerCase() === "su@email.fr" && data.password === "test"){
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  logOut(){
    if (this.isAuthenticated === true) {
      this.isAuthenticated = false;
    }
  }

  userIsLoggedIn() {
    return this.isAuthenticated;
  }
}
