import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationMicroService } from '../services/configuration-micro.service';
import { LocalStorageService } from '../services/local-storage.service';

import { forkJoin } from 'rxjs';
import { map,retry } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class WebService {
  optoken: any = "";
  
  constructor(private http: HttpClient, private API_URL: ConfigurationMicroService,
    private localStorageService: LocalStorageService) {
    
  }
  private URL = this.API_URL.getURL();
  private default_url_type = 'fxadminapi';

  commonMethod(url: string, data: any, method?: string, url_type?: string): any {
    method = method ? method : 'POST';
    url_type = url_type ? url_type : this.default_url_type;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'bearer ' + this.optoken
    })
    let endPoint = this.URL[url_type] + "/" + url;
    if (method == 'POST')
      return this.http.post(endPoint, data, { headers });
    else if (method == 'GET')
      return this.http.get(endPoint,{ headers });
    else if (method == 'PUT')
      return this.http.put(endPoint, data, { headers });
    else if (method == 'DELETE') {
      const options = {
        headers: headers,
        body: data
      };
      return this.http.delete(endPoint, options);
    }
  }


  UploadDocument(url: string, data: any) {
    let url_type: string = "Config";
    let headers = {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        'Authorization': 'bearer ' + this.optoken
      })
    };
    return this.http.post(this.URL[url_type] + '/' + url, data, headers);

  } 

}
