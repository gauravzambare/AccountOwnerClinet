import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerForCreation } from '../../_interfaces/owner-for-creation';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.css']
})
export class OwnerCreateComponent implements OnInit {
  public errorMessage: string = '';

  public ownerForm: FormGroup;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  public validateControl(controlName: string) {
    if (this.ownerForm.controls[controlName].invalid && this.ownerForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.ownerForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public executeDatePicker(event) {
    this.ownerForm.patchValue({ 'dateOfBirth': event });
  }

  public createOwner(ownerFormValue) {
    if (this.ownerForm.valid) {
      this.executeOwnerCreation(ownerFormValue);
    }
  }

  private executeOwnerCreation(ownerFormValue) {
    let owner: OwnerForCreation = {
      name: ownerFormValue.name,
      dateOfBirth: ownerFormValue.dateOfBirth,
      address: ownerFormValue.address
    }
    let apiUrl = 'api/owner';
    this.repository.create(apiUrl, owner, this.authenticationService.currentUserValue.token)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      )
  }

  public redirectToOwnerList() {
    this.router.navigate(['/owner/list']);
  }

}
