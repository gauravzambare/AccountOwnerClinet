import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Owner } from '../../_interfaces/owner';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {
  public owner: Owner;
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getOwnerDetails()
  }

  getOwnerDetails() {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/owner/${id}/account`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.owner = res as Owner;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }

}
