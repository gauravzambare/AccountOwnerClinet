import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';
import { DatepickerDirective } from './directive/datepicker.directive';
import { AuthGuard } from './services/guards/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ErrorModalComponent, SuccessModalComponent, DatepickerDirective],
  imports: [
    CommonModule,
    HttpClientModule    
  ],
  exports: [
    ErrorModalComponent,
    SuccessModalComponent,
    DatepickerDirective
  ]
})
export class SharedModule { }
