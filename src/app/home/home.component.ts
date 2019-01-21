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
}
