import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }
  queryData: any = this.queryParam(window.top.location.href);
  opAccountDate: any;
  getLoginName() {
    return this.getUserDetails().Username;
  }

  /**
   * Sets Access Token
   */
  setAccessToken(data: string) {
    localStorage.setItem('access_token', JSON.stringify(data));
  }

  /**
   * Gets Access Token
   */
  getAccessToken() {
    return JSON.parse(localStorage.getItem('access_token'));
  }

  /**
   * Sets Login ID
   */
  setLoginId(data: string) {
    localStorage.setItem('login_id', JSON.stringify(data));
  }


  setCookie(key: string, value: string) {
    document.cookie = key + '=' + value + '; path=/;';
  }
  /**
   * Gets Login ID
   */
  getLoginId() {
    return JSON.parse(localStorage.getItem('login_id'));
  }

  /**
   * Sets User Data to Local Storage
   */
  setUserDetails(json) {
    localStorage.setItem('user_details', JSON.stringify(json));
  }

  /**
   * Gets User Data from Local Storage
   */
  getUserDetails() {
    return JSON.parse(localStorage.getItem('user_details'));
  }
  getAcrDetails() {
    return JSON.parse(localStorage.getItem('ACR_Details'))
  }
  /**
   * Sets User Data to Local Storage
   */
  setViewAppDashboard(data) {
    localStorage.setItem('view_app_dashboard', data);
  }

  /**
   * Gets User Data from Local Storage
   */
  getAppDashboard() {
    return localStorage.getItem('view_app_dashboard');
  }

  hideAppDashboard() {
    localStorage.removeItem('view_app_dashboard');
  }
  /**
   * Gets UTC from Local Storage
   */
  getUTCOffset() {
    return this.getUserDetails().UTCOffset;
  }

  /**
   * Gets Login ID from Local Storage
   */
  getLoginID() {
    return this.getUserDetails().LoginID;
  }

  /**
   * Gets Date Format
   */
  getDateFormat() {
    return this.getUserDetails().DateFormat;
  }

  /**
   * Gets Time Format
   */
  getTimeFormat() {
    return this.getUserDetails().TimeFormat;
  }

  /**
   * Gets DateTime Format
   */
  getDateTimeFormat() {
    return 'dd-mm-yyyy hh:mm'; //this.getUserDetails().DateFormat + ' ' + this.getUserDetails().TimeFormat;
  }

  /**
  * Gets default Group id
  */
  getDefaultGroupID() {
    return this.getUserDetails().DefaultGroupID;
  }

  /**
  * Gets default property id
  */
  getPropertyId() {
    return this.getUserDetails().DefaultPropertyID;
  }

  getPropertyDetails() {
    // return this.getAcrDetails()[0].PropertyName;
   // return this.getSelectedHotelDetails().HotelName;
   return JSON.parse(localStorage.getItem('property_details'));
  }

  // Product Licence Starts

  /**
   * Sets Subscribed Product Details
   */
  setSubscribedProductDetails(data: string) {
    localStorage.setItem('subscribed_products', JSON.stringify(data));
  }

  /**
   * Gets Subscribed Product Details
   */
  getSubscribedProductDetails() {
    return JSON.parse(localStorage.getItem('subscribed_products'));
  }

  /**
   * Gets Subscribed Product ID
   */
  getSubscribedProductID() {
    return this.getSubscribedProductDetails().ProductID;
  }

  /**
   * Sets Selected Hotel Details
   */
  setSelectedHotelDetails(data: any): void {
    window.localStorage.setItem('selected_hotel', JSON.stringify(data));
  }

  /**
   * Gets Selected Hotel Details
   */
  getSelectedHotelDetails(): any {
    if (!localStorage.getItem('selected_hotel')) return ''
    return JSON.parse(window.localStorage.getItem('selected_hotel'));
  }

  // Product Licence Ends

  /**
   * @return Accounting Date
   */

  getAccountingDate() {
    if (this.queryData == null) {
      this.opAccountDate = this.getSelectedHotelDetails().AccountingDate;
    }
    else {
      this.opAccountDate = this.queryData.uaccdate ? this.queryData.uaccdate : this.getSelectedHotelDetails().AccountingDate;
    }
    return this.opAccountDate;
  }

  getAccountingDateForAvailability() {
    this.opAccountDate = this.getSelectedHotelDetails().AccountingDate;
    return this.opAccountDate;
  }

  /**
   * @return Accounting Status
   */
  getAccountingStatus() {
    return "Pending";
  }

  /**
   * @return Pending Date
   */
  getPendingDate() {
    return new Date();
  }

  /**
   * Clears All Local Storages
   */
  clearAllLocalStorages() {
    window.localStorage.clear();
  }

  /**
  * Gets Holding Company Code from Local Storage
  */
  getHoldingCompanyCode() {
    return this.getUserDetails().HoldingCompanyCode;
  }

  /**
  * Gets Holding Company Code from Local Storage
  */
  getUserType() {
    return this.getUserDetails().UserType;
  }


  /**
  * Gets Holding Company Code from Local Storage
  */
  getFOMEnabled() {
    return this.getUserDetails().IsFOMEnabled ? this.getUserDetails().IsFOMEnabled : true;
  }

  /**
  * Gets Holding Company Code from Local Storage
  */
  getCRSEnabled() {
    return this.getUserDetails().IsCRSEnabled ? this.getUserDetails().IsCRSEnabled : false;
  }

  /**
  * Gets Holding Company Code from Local Storage
  */
  getPrimarySave() {
    return this.getUserDetails().PrimarySave ? this.getUserDetails().PrimarySave : 'FOM'
  }
  /**
 * Sets User Role to Local Storage
 */
  setUserRoles(json) {
    localStorage.setItem('user_roles', JSON.stringify(json));
  }

  /**
   * Gets User Role from Local Storage
   */
  getUserRoles() {
    if (localStorage.getItem('user_roles') == undefined || localStorage.getItem('user_roles') == "undefined" || localStorage.getItem('user_roles') == null || localStorage.getItem('user_roles') == '')
      return [];
    else
      return JSON.parse(localStorage.getItem('user_roles'));
  }

  /**
 * Sets default group to Local Storage
 */
  setDefaultGroupCode(json) {
    localStorage.setItem('default_groupcode', JSON.stringify(json));
  }
  setSelectedDefaultGroupCode(param) {
    localStorage.setItem('sub_default_groupcode', param);
  }
  /**
   * Gets default group from Local Storage
   */
  getDefaultGroupCode() {
    return JSON.parse(localStorage.getItem('default_groupcode')) * 1;
    // return localStorage.getItem('sub_default_groupcode') ? JSON.parse(localStorage.getItem('sub_default_groupcode')) : JSON.parse(localStorage.getItem('default_groupcode'));
  }

  /**
   * Sets default Property  to Local Storage
   */
  setDefaultPmsCustCode(json) {
    localStorage.setItem('default_pmscustcode', JSON.stringify(json));
  }
  setSelectedDefaultPmsCustCode(param: string = "") {
    localStorage.setItem('sub_default_pmscustcode', param);
  }

  /**
   * Gets default Property from Local Storage
   */
  getDefaultPmsCustCode() {
    // if(this.queryData==null)
    if (!localStorage.getItem('default_pmscustcode')) return ''
    return localStorage.getItem('sub_default_pmscustcode') ? JSON.parse(localStorage.getItem('sub_default_pmscustcode')) : JSON.parse(localStorage.getItem('default_pmscustcode'));
    // else 
    // return this.queryData.pms
  }

  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    return parts.pop().split(";").shift();
  }

  getlocale() {
    if (this.queryData == null) {
      try {
        let x = this.getCookie('locale');
        if (x && x.includes('-'))
          return x.split('-')[0];
        return 'en';
      }
      catch (e) {
        return 'en';
      }
    }
    else
      return this.queryData.ln
  }
  queryParam(myvar) {
    let urls = myvar;
    let myurls = urls.split("?");
    let queryString = myurls[1];
    if (queryString)
      return JSON.parse('{"' + queryString.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    else
      return null;
  }


  getSkyresConnectionString() {
    return JSON.parse(localStorage.getItem('connection_string'));
  }

  getThousandSeparator() {
    if (this.getPropertyDetails().ThousandSeparator)
      return this.getPropertyDetails().ThousandSeparator;
    return ',';
    // return this.getPropertyDetails().ThousandSeparator;
  }
  getRateDecimal() {
    if (this.getPropertyDetails().RateDecimal)
      return this.getPropertyDetails().RateDecimal;
    return 2;
    // return this.getPropertyDetails().RateDecimal;
  }

  getNumberFormat() {
    if (this.getPropertyDetails().NumberFormat)
      return this.getPropertyDetails().NumberFormat;
    return '###,###,###';
    //return this.getPropertyDetails().NumberFormat;
  }
  getShortLogo() {
    if (this.getPropertyDetails().ShortLogo)
      return this.getPropertyDetails().ShortLogo;
      else
      return '';
  }
}
