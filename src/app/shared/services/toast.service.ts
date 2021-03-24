import {
  Injectable
} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  success(message: any) {
    let html:string =`<i class="close fa fa-times"></i>
    <i class="success fa fa-check-circle"></i>
    <h4>Success</h4>
    <p>${message} </p>`;
    this.template(html,'success');
  }
  error(message: any) {
    let html:string =`<i class="close fa fa-times"></i>
    <i class="error fa fa-ban"></i>
    <h4>Error</h4>
    <p>${message} </p>`;
    this.template(html,'error');
  }
  warning(message: any) {
    let html:string =`<i class="close fa fa-times"></i>
    <i class="warning fa fa-exclamation-triangle"></i>
    <h4>Warning</h4>
    <p>${message} </p>`;
    this.template(html,'warning');
  }
  info(message: any) {
    let html:string =`<i class="close fa fa-times"></i>
    <i class="info fa fa-info-circle"></i>
    <h4>Info</h4>
    <p>${message} </p>`;
    this.template(html,'info');
  }


  template(innerhtml:string,classname:string){
    let iDiv:any = document.createElement('div');
    iDiv.id = 'toast-popup';
    iDiv.className = classname;
    iDiv.innerHTML = innerhtml;
    document.getElementsByTagName('body')[0].appendChild(iDiv);
    setTimeout(() => {
      (<HTMLElement>document.getElementById('toast-popup')).style.top = "10px";
      (<HTMLElement>document.getElementById('toast-popup')).style.zIndex = "9999999";
      (<HTMLElement>document.querySelector('.close')).addEventListener('click', () => {
        this.closePopup();
      });
      setTimeout(() => {
        this.closePopup();
      }, 4000);
    }, 200);
  }
  closePopup() {
    if((<HTMLElement>document.getElementById('toast-popup'))){
      (<HTMLElement>document.getElementById('toast-popup')).style.top = "-150px";
      setTimeout(()=>{
        this.removeElement('toast-popup');
      },1)

    }
 

  }

  removeElement(id: string) {
    let elem:any = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
  }
}