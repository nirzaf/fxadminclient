import { Component, OnInit } from '@angular/core';
import { TRANSLATE } from 'src/app/shared/constant/translate';
export interface PeriodicElement {
  name: string;
  productName:string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1,productName:"Fx Front Office Desk", name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, productName:"Fx Front Office Desk",name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, productName:"Fx Front Office Desk",name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, productName:"Fx Front Office Desk",name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5,productName:"Fx Front Office Desk", name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6,productName:"Fx Front Office Desk", name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7,productName:"Fx Front Office Desk", name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, productName:"Fx Front Office Desk",name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, productName:"Fx Front Office Desk",name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, productName:"Fx Front Office Desk", name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-db-connection',
  templateUrl: './db-connection.component.html',
  styleUrls: ['./db-connection.component.scss']
})
export class DbConnectionComponent implements OnInit {
  hide = true;
  TRANSLATE: any = TRANSLATE['en'];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  public breadCrumb: string[] = [];
 
  
  constructor(){}

  ngOnInit() {
    this.breadCrumb = ["Admin", "DB Connection Access"];
  }

  onDelete(traineeId: string)
  {
    
  }

  ngOnDestroy() {

  }
}
