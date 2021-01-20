import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
export interface DialogData {
  animal: string;
  name: string;
}
export class GameNode {
  children: BehaviorSubject<GameNode[]>;
  constructor(public item: string, children?: GameNode[], public parent?: GameNode) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
  }
}
const TREE_DATA = [
  new GameNode(`Sarovar Hotels G1`, [
    new GameNode(`Sarovar Hotels P1`),
    new GameNode(`Sarovar Hotels P2`),
    new GameNode(`Sarovar Hotels P3`),
    new GameNode(`Sarovar Hotels P4`),
    new GameNode(`Sarovar Hotels P5`),
    new GameNode(`Sarovar Hotels P6`),
    new GameNode(`Sarovar Hotels P7`),
    new GameNode(`Sarovar Hotels P8`),
  ]),
  new GameNode(`Sarovar Hotels G2`, [
    new GameNode(`Sarovar Hotels P1`),
    new GameNode(`Sarovar Hotels P2`),
    new GameNode(`Sarovar Hotels P3`),
    new GameNode(`Sarovar Hotels P4`),
    new GameNode(`Sarovar Hotels P5`),
    new GameNode(`Sarovar Hotels P6`),
    new GameNode(`Sarovar Hotels P7`),
    new GameNode(`Sarovar Hotels P8`),
  ]),
  new GameNode(`Sarovar Hotels G3`, [
    new GameNode(`Sarovar Hotels P1`),
    new GameNode(`Sarovar Hotels P2`),
    new GameNode(`Sarovar Hotels P3`),
    new GameNode(`Sarovar Hotels P4`),
    new GameNode(`Sarovar Hotels P5`),
    new GameNode(`Sarovar Hotels P6`),
    new GameNode(`Sarovar Hotels P7`),
    new GameNode(`Sarovar Hotels P8`),
  ])
];
@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent {

  recursive: boolean = false;
  levels = new Map<GameNode, number>();
  treeControl: NestedTreeControl<GameNode>;


  dataSource: MatTreeNestedDataSource<GameNode>;

  constructor(private changeDetectorRef: ChangeDetectorRef, public dialogRef: MatDialogRef<HierarchyComponent>) {

    this.treeControl = new NestedTreeControl<GameNode>(this.getChildren);
    this.dataSource = new MatTreeNestedDataSource();
    this.dataSource.data = TREE_DATA;
  }
  getChildren = (node: GameNode) => {
    return node.children;
  };

  hasChildren = (index: number, node: GameNode) => {
    return node.children.value.length > 0;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
 * Toggle the node, remove from display list
 */
  toggleNode(node) {
    console.log(node);
    let index = this.dataSource.data.findIndex(x => x.item == node.item);
    if(!this.treeControl.isExpanded(node)){
      this.treeControl.collapseAll();
      this.treeControl.expand(this.dataSource.data[index])
    }else{
      this.treeControl.collapseAll();
    }
    
    
    
   
   
  }
}
