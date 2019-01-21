import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../_interfaces/user';
import { debug } from 'util';
import { RepositoryService } from './repository.service';
import { ErrorHandlerService } from './error-handler.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
   private errorMessage: string;
  private resUser: any;
  private isLoggedInSubject: BehaviorSubject<boolean>;
  private isLoggedIn: Observable<boolean>;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private http: HttpClient,private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    this.isLoggedIn = this.isLoggedInSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(form: NgForm) {
    let apiAddress: string = "api/auth/token";
    let credentials = JSON.stringify(form.value);
    this.repository.loginCheck(apiAddress, credentials)
      .subscribe(user => {
        this.resUser = user as User;
        if (this.resUser && this.resUser.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(this.resUser));
          this.currentUserSubject.next(this.resUser);
          this.isLoggedInSubject.next(true);
          this.router.navigate(["/owner/list"]);

        }
        else {
          this.router.navigate(["/login"]);
          this.isLoggedInSubject.next(false);
        }
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
      });     
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }
}
