import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';


@Injectable()
export class RepositoryService {
  tokenvalue: string;
  
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }


  public getData(route: string, tokenv: string) {
    this.tokenvalue = tokenv;
    return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeadersWithToken());
  }

  public loginCheck(route: string, body) {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body,this.generateHeaders());
  }

  public create(route: string, body, tokenv: string) {
    this.tokenvalue = tokenv;
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress), body, this.generateHeadersWithToken());
  }

  public update(route: string, body, tokenv: string) {
    this.tokenvalue = tokenv;
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), body, this.generateHeadersWithToken());
  }

  public delete(route: string, tokenv: string) {
    this.tokenvalue = tokenv;
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
  private generateHeadersWithToken() {
    return {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.tokenvalue,
        'Content-Type': 'application/json'
      })
    }
  }
}
