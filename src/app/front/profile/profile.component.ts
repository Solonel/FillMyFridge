import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { User } from '../../classes/user';

@Component({
  selector: 'lsc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  constructor(private authService:AuthService,
    private router: Router,) { }

  ngOnInit() {
    this.user = this.authService.getConnectedUser();
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn(){
    if (!this.authService.userIsLoggedIn()){
      this.router.navigate([`login`]);
    }
  }

}
