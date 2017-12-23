import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'lsc-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  isAuthenticated = false;
  alreadyTried = false;

  constructor() { }

  ngOnInit() {
  };

  login(data) {
    if (data.email.toLowerCase() === "su@email.fr" && data.password === "test"){
      this.isAuthenticated = true;
      this.alreadyTried = false;
    } else {
      this.alreadyTried = true;
    }
  };

  logOut() {
    this.isAuthenticated = false;
  }
}
