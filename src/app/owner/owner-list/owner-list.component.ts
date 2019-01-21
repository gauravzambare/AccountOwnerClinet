import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './../../shared/services/repository.service';
import { Owner } from './../../_interfaces/owner';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  public owners: Owner[];
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router
    , private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getAllOwners();
  }

  public getAllOwners() {
    let apiAddress: string = "api/owner";
    this.repository.getData(apiAddress,this.authenticationService.currentUserValue.token)
      .subscribe(res => {
        this.owners = res as Owner[];
        console.log(res);
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  public getOwnerDetails(id) {
    let detailsUrl: string = `/owner/details/${id}`
    this.router.navigate([detailsUrl]);
  }
  public redirectToUpdatePage(id) {
    let updateUrl: string = `/owner/update/${id}`;
    this.router.navigate([updateUrl]);
  }
  public redirectToDeletePage(id) {
    let deleteUrl: string = `/owner/delete/${id}`;
    this.router.navigate([deleteUrl]);
  }

  public logout() {

  }
}
