import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service'


@Injectable()
export class CommonService {

  constructor(

    public _localStorageService: LocalStorageService
  ) { }
  genericSort(data, key) {
    return data.sort((a: any, b: any) => {
      if (a[key] < b[key]) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  genericDuplicateList(data: any, key: string) {
    var valueArr = data.map(function (item) { return item[key] });
    var duplicate: { "id": number, "text": string }[] = [];
    valueArr.some(function (item, idx) {
      if (valueArr.indexOf(item) != idx && JSON.stringify(duplicate).indexOf(JSON.stringify(data[idx])) == -1)
        duplicate.push(data[idx]);
    });
    return duplicate;
  }

  /**
   * Three param
   * 1. elem = id reference then type will be id
   * 2. t = time in millisecond
   * 3. type = id selector or querySelector
   */
  addFocus(elem: string, t?: number, type?: string) {
    if (type == "query") {
      if (t == undefined) {
        (<HTMLElement>document.querySelector(elem)).focus();
      }
      else {
        setTimeout(function () {
          if ((<HTMLElement>document.querySelector(elem))) {
            (<HTMLElement>document.querySelector(elem)).focus();
          }
        }, t);
      }
    }
    else {
      if (t == undefined) {
        if ((<HTMLElement>document.getElementById(elem))) {
          (<HTMLElement>document.getElementById(elem)).focus();
        }
      }
      else {
        setTimeout(function () {
          if ((<HTMLElement>document.getElementById(elem))) {
            (<HTMLElement>document.getElementById(elem)).focus();
          }
        }, t);
      }
    }
  }

  capitalize(name: string) {
    name = name.toLowerCase();
    return name.trim().replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() });
  }

  capitalizenew(name: string) {
    name = name.toLowerCase();
    return name.replace(/\w\S*/g, function (txt) { return txt.toUpperCase() });
  }


  // Convert Date Format
  formatDate(date, format, seperator, isTime?: boolean) { //"Format:dd-mm-yy,mm-dd-yy,dd/mm/yy,dd:mm:yy" & Seperator - '-','/',',',':'
    if (date != "" && date != undefined) {

      if (typeof date == 'string' && date.includes("GMT+")) {
        date = date.split("GMT+")[0];
      }
      else if (typeof date == 'string' && date.includes("+")) {
        date = date.split("+")[0];
      }
      let d = new Date(date),
        mm = '' + (d.getMonth() + 1),
        mmm: any = d.getMonth(),
        dd = '' + d.getDate(),
        yy = d.getFullYear();
      let month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      if (mm.length < 2) mm = '0' + mm;
      if (dd.length < 2) dd = '0' + dd;
      let part = format.split(seperator);
      mmm = month_names[mmm];

      let sHour = d.getHours();
      let sMinute = this.padValue(d.getMinutes());
      let sAMPM = "AM";
      let iHourCheck = Number(sHour);
      if (iHourCheck > 12) {
        sAMPM = "PM";
        sHour = iHourCheck - 12;
      }
      else if (iHourCheck === 0) {
        sHour = 12;
      }
      sHour = this.padValue(sHour);
      try {
        if (isTime) {
          return eval(part[0]) + seperator + eval(part[1]) + seperator + eval(part[2]) + ", " + sHour + ":" + sMinute + " " + sAMPM;
        }
        return eval(part[0]) + seperator + eval(part[1]) + seperator + eval(part[2]);
      }
      catch (e) {
        return '';
      }
    }
  }
  padValue(value): number {
    return (Number(value) < 10) ? "0" + value : value;
  }

  getTimeFromDate(date: any) {
    if (date != "" && date != undefined) {
      if (typeof date == 'string' && date.includes("+")) {
        date = date.split("+")[0];
      }
      let d = new Date(date);
      let hh = d.getHours().toString();
      let mm = d.getMinutes().toString();
      if (hh.length < 2) hh = '0' + hh;
      if (mm.length < 2) mm = '0' + mm;
      return hh + ':' + mm;

    }
  }

  formatDateCalender(date) {
    if (date != "" && date != undefined) {
      let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [month, day, year].join('/');
    }
  }


  formatSQLDate(date) {
    if (date != "" && date != undefined) {
      let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    } else {
      return "";
    }
  }

  uniqueArray(originalArray, prop) {
    let newArray = [];
    let t = {};

    for (let i in originalArray) {
      t[originalArray[i][prop]] = originalArray[i];
    }

    for (let i in t) {
      newArray.push(t[i]);
    }

    return newArray;
  }


  // getAzureStoragePath():string{
  //   return this._configurationMicroService.getAzureStorageURL();
  // }
  getDocumentMimeTypeList() {
    return [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint',
      'application/vnd.ms-powerpoint.presentation.macroenabled.12',
      'application/vnd.ms-excel',
      'application/vnd.ms-excel.sheet.binary.macroenabled.12',
      'application/vnd.ms-excel.sheet.macroenabled.12',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.oasis.opendocument.text',
      'text/plain'
    ]
  }

  imageList() {
    return [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
    ]
  }

  CompareDate(date1: string, date2: string): boolean {
    let dateOne = new Date(date1); //Year, Month, Date
    let dateTwo = new Date(date2); //Year, Month, Date
    if (dateOne > dateTwo) {
      return true;
    } else {
      return false;
    }
  }

  CompareDateEqualTo(date1: string, date2: string): boolean {
    let dateOne = new Date(date1); //Year, Month, Date
    let dateTwo = new Date(date2); //Year, Month, Date
    if (dateOne >= dateTwo) {
      return true;
    } else {
      return false;
    }
  }


  formatDecimal(n, decimal) {
    return n.toFixed(decimal).replace(/./g, function (c, i, a) {
      return i >= 0 && c !== "." ? '' + c : c;
    });
  }

  restrictQuote(elem: any) {
    let v = elem.target.value;
    elem.target.value = v.replace(/\"|\'|<|>/g, "");
    if (elem.charCode == 39 || elem.charCode == 34 || elem.charCode == 60 || elem.charCode == 62)
      return false;
    return true;
  }
  dayOfWeekAsString(dayIndex: number) {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dayIndex];
  }

  timeDiffinMinute(arr, dep) {//sample format 24 hour format arrival="00:01" departure="02:59"
    let part1 = arr.split(':');
    let part2 = dep.split(':');
    let arrmin = Number(part1[0]) * 60 + Number(part1[1]);
    let depmin = Number(part2[0]) * 60 + Number(part2[1]);
    return depmin - arrmin;
  }

  formatNumber(num: number, seperator: string, decimal: number, formater: string) {
    if (formater == "###,###,###,###") {
      return (num).toFixed(decimal).replace(/\d(?=(\d{3})+\.)/g, '$&' + seperator);
    } else if (formater == "##,##,##,###") {
      return (num).toFixed(decimal).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1' + seperator);
    } else {
      return (num).toFixed(decimal).replace(/\d(?=(\d{3})+\.)/g, '$&' + seperator);
    }
  }

}


