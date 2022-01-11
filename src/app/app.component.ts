import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from './shared/services/local-storage.service';
import { CommonService } from './shared/services/common.service';
import { WebService } from './shared/services/web.service';
import { TRANSLATE } from './shared/constant/translate';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})

export class AppComponent {

  isProgressing: boolean = true;
  accountingDate: string = "1st Dec 2020";
  accountingStatus: string = "Pending";
  // title = 'customreportApp';
  lang = 'en';
  TRANSLATE: any = TRANSLATE['ar'];
  propertyName: string = "TAJ Vivantha";
  propertyAddress: string = "Bangalore";
  Pmscust = 20007;

  sidemenuList: any = [
    {
      "name": "User",
      "id": 2,
      "icon": "fas fa-users",
      "url": 'user'
    },
    {
      "name":"Database",
      "id":3,
      "icon":"fas fa-database",
      "url":'database'
    },
    {
      "name":"Property",
      "id":3,
      "icon":"fas fa-hotel",
      "url":'property'
    }
  ];
  constructor(
    public router: Router,
    private localStorageService: LocalStorageService
  ) {

  }



  navigatePage(routeURL: string) {
    this.router.navigate(['/', routeURL]);
  }

  backToHome() {
    window.location.href = "https://" + window.location.host + "/#/home";
  }
  logout(): void {
    // Clears all local storages
    if (document.location.origin.includes('localhost'))
      return;
    this.localStorageService.clearAllLocalStorages();
    window.location.href = document.location.origin + '/#/logout';
  }
}
