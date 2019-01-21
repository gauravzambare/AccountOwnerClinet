import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    invalidLogin: boolean;

  constructor(private http: HttpClient, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  login(form: NgForm) {
    let credentials = JSON.stringify(form.value);
    this.authenticationService.login(form);
    this.router.navigate(["/owner/list"]);
    //this.http.post("http://localhost:44357/api/auth/login", credentials, {
    //  headers: new HttpHeaders({
    //    "Content-Type": "application/json"
    //  })
    //}).subscribe(response => {
    //  let token = (<any>response).token;
    //  localStorage.setItem("jwt", token);
    //  this.invalidLogin = false;
    //  this.router.navigate(["/"]);
    //}, err => {
    //  this.invalidLogin = true;
    //});
  }
}
