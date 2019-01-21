import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../_interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
