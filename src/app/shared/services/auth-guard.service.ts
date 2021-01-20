import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Services
// import { CommonService } from '../services/common.service'
import { LocalStorageService } from '../services/local-storage.service';
import { ConfigurationMicroService } from '../services/configuration-micro.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private _configurationMicroService: ConfigurationMicroService,
    public _localStorageService: LocalStorageService
  ) {
    /**
     * @param: router
     * @param: _localStorageService
     */
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }


}
