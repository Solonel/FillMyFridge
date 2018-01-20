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
  userForm: FormGroup;

  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.getUser();
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      id: null,
      gender: null,
      firstName: null,
      lastName: null,
      birthDate: null,
      email: null,
      password: null,
    });

  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserNo404(id)
      ._finally(() => {
        this.isLoading = false;
      })
      .subscribe(user => {
        if (user) {
          this.userForm.patchValue({
            id: user.id,
            gender: user.gender,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            email: user.email,
            password: user.password
          });
        }
      });
  }

  goToList(): void {
    this.router.navigate([`users`]);
  }

  goToUser(id) {
    this.router.navigate([`user/${id}`]);
  }

  save(): void {
    this.userService.updateUser(this.userForm.value)
      .subscribe(() => this.getUser());
  }

  delete(): void {
    this.userService.deleteUser(this.userForm.value)
      .subscribe(() => this.goToList());
  }

  addUser(formData) {
    this.userService.addUser(formData).subscribe((user) => this.goToUser(user.id));;
  }

}
