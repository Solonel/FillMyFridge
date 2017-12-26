import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'lsc-front-menu',
  templateUrl: './front-menu.component.html',
  styleUrls: ['./front-menu.component.css']
})
export class FrontMenuComponent implements OnInit {
  title = 'Fill My Fridge';
  constructor( private auth: AuthService) { }

  ngOnInit() {
  }

}
