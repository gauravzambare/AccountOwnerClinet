import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { EnvironmentUrlService } from './shared/services/environment-url.service';
import { HttpClientModule } from '@angular/common/http';
import { RepositoryService } from './shared/services/repository.service';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/services/guards/auth-guard.service';
import { AuthenticationService } from './shared/services/authentication.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    InternalServerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      { path: 'login', component: LoginComponent},
      { path: 'owner', loadChildren: "./owner/owner.module#OwnerModule", canActivate: [AuthGuard] },
      { path: '500', component: InternalServerComponent },
      { path: '404', component: NotFoundComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard]},
      { path: '**', redirectTo: '/404', pathMatch: 'full' }
    ])
  ],
  providers: [
    EnvironmentUrlService,
    ErrorHandlerService,
    RepositoryService,
    AuthenticationService,
    AuthGuard,
    DatePipe 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
