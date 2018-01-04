import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'lsc-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    users: User[];
    displayedColumns = ['select', 'id', 'name', 'firstname'];
    dataSource: MatTableDataSource<User>;
    selection: SelectionModel<User>;
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    constructor(private router: Router, private userService: UserService) {
      this.dataSource = new MatTableDataSource(this.users);
      this.selection = new SelectionModel<User>(true, []);
    }
  
    ngOnInit() {
      this.getUsers();
    }
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    getUsers() {
      this.userService.getUsers()
        .subscribe(users => {
          this.users = users;
          this.dataSource.data = users;
        }
        );
    }
  
    addUser() {
      this.router.navigate([`user/add`]);
    }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
  
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
  
    redirectOnDetail(id) {
      this.router.navigate([`user/${id}`]);
    }
  
  }
  