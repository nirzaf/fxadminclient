import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationMicroService {

  private URL: any = {
    // for dev
    fx1adminapi: 'https://fortuneclouddevapi.azurewebsites.net/v1/configuration',
    fxauth : 'https://qafxauthentication.azurewebsites.net/api',
    fxadminapi: 'https://localhost:44358/api/v1',
    fxdocumentuploadapi: 'https://fortunecloudqaapi.idsnext.live/v1/configuration'
  };

  constructor() {
    this.setURL();
  }

  setURL() {
    let host = window.location.host;
    if (host.includes('localhost')) {
      host = 'productsdev.idsnext.com';
      // host = 'products.idsnext.com';
    }

    if (host == 'products.idsnext.com') {
      this.URL = {
        // Production
        fx1adminapi: 'https://fortunecloudapi.idsnext.com/v1/configuration',
        fxauth : 'https://qafxauthentication.azurewebsites.net/api'
      };
    }
  }

  /**
   * @return URL
   */
  getURL(): string {
    return this.URL;
  }
  getConfigURL(): string {
    return this.URL.getConfigURL;
  }
}
