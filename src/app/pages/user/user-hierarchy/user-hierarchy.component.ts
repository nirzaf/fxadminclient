import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { WebService } from 'src/app/shared/services/web.service';
import { ToastService } from 'src/app/shared/services/toast.service';
export interface CompanyData {
  holdingCompanyID: string;
  holdingCompanyName: string;
}
export interface HierarchyData {
  userID: number;
  holdingCompanyID: string;
 
}

export class HierarchyNode {
  children: BehaviorSubject<HierarchyNode[]>;
  constructor(public item: string, children?: HierarchyNode[]) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
  }
}
const TREE_DATA = [
  new HierarchyNode(`Sarovar Hotels G1`, [
    new HierarchyNode(`Sarovar Hotels SG1`, [
      new HierarchyNode(`Sarovar Hotels P2`),
      new HierarchyNode(`Sarovar Hotels P3`),
      new HierarchyNode(`Sarovar Hotels P4`),
    ]),
    new HierarchyNode(`Sarovar Hotels SG2`, [
      new HierarchyNode(`Sarovar Hotels P2`),
      new HierarchyNode(`Sarovar Hotels P3`),
      new HierarchyNode(`Sarovar Hotels P4`),
      new HierarchyNode(`Sarovar Hotels P5`),
    ]),
    new HierarchyNode(`Sarovar Hotels P2`),
    new HierarchyNode(`Sarovar Hotels P3`),
    new HierarchyNode(`Sarovar Hotels P4`),
    new HierarchyNode(`Sarovar Hotels P5`),
    new HierarchyNode(`Sarovar Hotels P6`),
    new HierarchyNode(`Sarovar Hotels P7`),
    new HierarchyNode(`Sarovar Hotels P8`),
  ]),
  new HierarchyNode(`Sarovar Hotels G2`, [
    new HierarchyNode(`Sarovar Hotels P1`),
    new HierarchyNode(`Sarovar Hotels P2`),
    new HierarchyNode(`Sarovar Hotels P3`),
    new HierarchyNode(`Sarovar Hotels P4`),
    new HierarchyNode(`Sarovar Hotels P5`),
    new HierarchyNode(`Sarovar Hotels P6`),
    new HierarchyNode(`Sarovar Hotels P7`),
    new HierarchyNode(`Sarovar Hotels P8`),
  ]),
  new HierarchyNode(`Sarovar Hotels G3`, [
    new HierarchyNode(`Sarovar Hotels P1`),
    new HierarchyNode(`Sarovar Hotels P2`),
    new HierarchyNode(`Sarovar Hotels P3`),
    new HierarchyNode(`Sarovar Hotels P4`),
    new HierarchyNode(`Sarovar Hotels P5`),
    new HierarchyNode(`Sarovar Hotels P6`),
    new HierarchyNode(`Sarovar Hotels P7`),
    new HierarchyNode(`Sarovar Hotels P8`),
  ])
];

@Component({
  selector: 'app-user-hierarchy',
  templateUrl: './user-hierarchy.component.html',
  styleUrls: ['./user-hierarchy.component.scss']
})
export class UserHierarchyComponent  {

  public isProgressing: boolean = false;
  public loaderMessage: string = "Loading...";
  hierarchyData: HierarchyData;
  recursive: boolean = false;
  levels = new Map<HierarchyNode, number>();
  treeControl: NestedTreeControl<HierarchyNode>;


  dataSource: MatTreeNestedDataSource<HierarchyNode>;

  constructor(private changeDetectorRef: ChangeDetectorRef, public dialogRef: MatDialogRef<UserHierarchyComponent>,
    private webService: WebService,@Inject(MAT_DIALOG_DATA) public _hierarchyData: HierarchyData, private toast: ToastService
  ) {
    this.hierarchyData = _hierarchyData;
    this.treeControl = new NestedTreeControl<HierarchyNode>(this.getChildren);
    this.dataSource = new MatTreeNestedDataSource();
    this.dataSource.data = TREE_DATA;
    this.getHierarchyData(this._hierarchyData.holdingCompanyID);



  }
  getChildren = (node: HierarchyNode) => {
    return node.children;
  };

  hasChildren = (index: number, node: HierarchyNode) => {
    return node.children.value.length > 0;
  }
  onNoClick(): void {
    this.dialogRef.close({ event: 'close', data: {holdingCompanyID: this._hierarchyData.holdingCompanyID, userID: this._hierarchyData.userID} });
  }
  getHierarchyData(holdingCompanyID: string) {
    this.webService.commonMethod('holdingcompany/gethierarchy/' + holdingCompanyID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          var hierarrchyData = [];
          data.data.groups.map(function (group) {

            var subGroupData = [];
            group.subGroups.map(function (subgroup) {
              var propertyData = [];
              subgroup.properties.map(function (property) {
                propertyData.push(new HierarchyNode(property.propertyName));


              });
              subGroupData.push(new HierarchyNode(subgroup.subGroupName, propertyData));

            });
            
            group.properties.map(function (property) {
              subGroupData.push(new HierarchyNode(property.propertyName));


            });
           
            var groupData = new HierarchyNode(group.groupName, subGroupData);
            hierarrchyData.push(groupData);



          });
       


          this.dataSource.data = hierarrchyData;
          this.isProgressing=false;
        }
        else {
          this.toast.error(data.errors);
        }


      });
  }

  /**
 * Toggle the node, remove from display list
 */
  toggleNode(node) {
    
    let index = this.dataSource.data.findIndex(x => x.item == node.item);

    if (!this.treeControl.isExpanded(node)) {
      this.treeControl.expand(this.dataSource.data[index])
      //this.treeControl.collapseAll();

    } else {
      this.treeControl.collapse(this.dataSource.data[index]);
    }





  }

}
