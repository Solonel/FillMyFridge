import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'lsc-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  };

  login(data) {
    let auth = this.auth.login(data);
    console.log(auth);
  };

  logOut() {
    this.auth.logOut();
  };
}
