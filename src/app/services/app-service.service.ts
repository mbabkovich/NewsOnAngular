import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private pageNameSource = new BehaviorSubject('News');
  currentPageName = this.pageNameSource.asObservable();

  constructor() { }

  changePageName(message: string) {
    this.pageNameSource.next(message)
  }
}
