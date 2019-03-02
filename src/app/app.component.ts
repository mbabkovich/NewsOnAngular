import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './services/app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private appServiceService: AppServiceService) {
  }

  title = 'NewsOnAngular';
  pageName: string;

  ngOnInit() {
    this.appServiceService.currentPageName.subscribe(pageName => this.pageName = pageName);
  }
}
