import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';

@Component({
  selector: 'lsc-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

    @Input() user: User;
  
    fetchingData = true;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router, 
      private userService: UserService) { }
  
    ngOnInit() {
      this.getUser();
    }
  
    getUser(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.userService.getUserNo404(id)
        .subscribe(user => { this.user = user; this.fetchingData = false; });
    }
  
    goToList(): void {
      this.router.navigate([`users`]);
    }
  
    save(): void {
      console.log("save",this.user);
      this.userService.updateUser(this.user)
        .subscribe(() => this.goToList());
    }
  
    delete(): void {
      console.log("delete",this.user);
      this.userService.deleteUser(this.user)
        .subscribe(() => this.goToList());
    }
  
    addUser(formData) {
      this.userService.addUser(formData).subscribe(() => this.goToList());;
    }
  
  }
  