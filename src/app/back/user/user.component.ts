import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';

@Component({
  selector: 'lsc-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  @Input() user: User;
  createUserForm: FormGroup;

  fetchingData = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUser();
    this.createUserForm = this.formBuilder.group({
      gender: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      password: "",
    });

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
    console.log("save", this.user);
    this.userService.updateUser(this.user)
      .subscribe(() => this.goToList());
  }

  delete(): void {
    console.log("delete", this.user);
    this.userService.deleteUser(this.user)
      .subscribe(() => this.goToList());
  }

  addUser(formData) {
    this.userService.addUser(formData).subscribe(() => this.goToList());;
  }

}
