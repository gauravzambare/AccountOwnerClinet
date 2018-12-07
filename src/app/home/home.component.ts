import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../shared/services/repository.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public homeText: string;
  public result: any;

  constructor(private repo: RepositoryService) { }

  ngOnInit() {
    this.homeText = "WELCOME TO ACCOUNT-OWNER APPLICATION";
  }

  public consumeGetFromRepository() {
    this.repo.getData('api/owner/24fd81f8-d58a-4bcc-9f35-dc6cd5641906')
      .subscribe(res => {
        this.result = res;
      },
        (error) => {
          //this.handleErrors(error);
        })
  }
}
