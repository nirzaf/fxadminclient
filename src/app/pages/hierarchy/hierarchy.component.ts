import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject} from 'rxjs';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {WebService} from 'src/app/shared/services/web.service';
import {ToastService} from 'src/app/shared/services/toast.service';

export interface CompanyData {
  holdingCompanyID: string;
  holdingCompanyName: string;
}
export class HierarchyNode {
  children: BehaviorSubject<HierarchyNode[]>;
  constructor(public item: string, children?: HierarchyNode[], public parent?: HierarchyNode) {
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
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class HierarchyComponent {
  public isProgressing: boolean = true;
  public loaderMessage: string = "Loading...";
  holdingCompanyData: CompanyData;
  recursive: boolean = false;
  levels = new Map<HierarchyNode, number>();
  treeControl: NestedTreeControl<HierarchyNode>;


  dataSource: MatTreeNestedDataSource<HierarchyNode>;

  constructor(private changeDetectorRef: ChangeDetectorRef, public dialogRef: MatDialogRef<HierarchyComponent>, @Inject(MAT_DIALOG_DATA) public _holdingCompanyData: CompanyData,
    private webService: WebService, private toast: ToastService
  ) {
    this.holdingCompanyData = _holdingCompanyData;
    this.treeControl = new NestedTreeControl<HierarchyNode>(this.getChildren);
    this.dataSource = new MatTreeNestedDataSource();
    this.dataSource.data = [];
    this.getHierarchyData(_holdingCompanyData.holdingCompanyID);
  }

  getChildren = (node: HierarchyNode) => {
    return node.children;
  };

  hasChildren = (index: number, node: HierarchyNode) => {
    return node.children.value.length > 0;
  }

  onNoClick(): void {
    this.dialogRef.close({ event: 'close', data: null });
  }
  getHierarchyData(holdingCompanyID: string) {
    this.webService.commonMethod('holdingcompany/gethierarchy/' + holdingCompanyID, null, 'GET', null)
      .subscribe(data => {
        if (data.succeeded) {
          let hierarchyData = [];
          data.data.groups.map(function (group) {

            let subGroupData = [];
            group.subGroups.map(function (subgroup) {
              let propertyData = [];
              subgroup.properties.map(function (property) {
                propertyData.push(new HierarchyNode(property.propertyName));
              });
              subGroupData.push(new HierarchyNode(subgroup.subGroupName, propertyData));
            });

            group.properties.map(function (property) {
              subGroupData.push(new HierarchyNode(property.propertyName));
            });

            let groupData = new HierarchyNode(group.groupName, subGroupData);
            hierarchyData.push(groupData);
          });
          this.dataSource.data = hierarchyData;
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
