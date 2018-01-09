import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { User } from '../../classes/user';

@Component({
  selector: 'lsc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.user = this.authService.getConnectedUser();
  }

}
