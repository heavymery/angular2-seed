import { Component, AfterViewInit, ElementRef, Input, Output } from '@angular/core';

declare var componentHandler: any;

enum OrderBySequence {
  Ascending,
  Descending
}

@Component({
  selector: 'sd-data-table',
  templateUrl: 'app/shared/data-table/data-table.component.html',
  styleUrls: ['app/shared/data-table/data-table.component.css'],
  directives: []
})
export class DataTableComponent implements AfterViewInit {

  //------------------------------------------------------------------------------
  //
  //  Properties
  //
  //------------------------------------------------------------------------------

  @Input() data: Array<any>;

  @Input() columns: Array<any>; // FIXME: columns: Array<DataTableColumn>

  get selectedItems(): Array<any> {
    return this.currentSelectedItems.slice();
  }

  //--------------------------------------
  //  Options
  //--------------------------------------

  @Input() selectable: boolean;

  // TODO: @Input() editable: Boolean;

  //------------------------------------------------------------------------------
  //
  //  Fields
  //
  //------------------------------------------------------------------------------

  //--------------------------------------
  //  Select
  //--------------------------------------

  private isSelectAllChecked: boolean = false;

  private currentSelectedItems: Array<any> = [];

  //--------------------------------------
  //  Sort
  //--------------------------------------

  private currentOrderByPropName: string;
  private currentOrderBySequence: OrderBySequence;

  //--------------------------------------
  //  TODO: Edit
  //--------------------------------------

  //------------------------------------------------------------------------------
  //
  //  Constructor
  //
  //------------------------------------------------------------------------------

  constructor(private el: ElementRef) {

  }

  //------------------------------------------------------------------------------
  //
  //  Methods
  //
  //------------------------------------------------------------------------------

  //--------------------------------------
  //  Select
  //--------------------------------------

  isSelected(item: any): boolean {
    if (this.currentSelectedItems.indexOf(item) > -1) {
      return true;
    } else {
      return false;
    }
  }

  toggleSelect(item: any) {
    let itemIndex = this.currentSelectedItems.indexOf(item);

    if (itemIndex > -1) {
      this.currentSelectedItems.splice(itemIndex, 1);
    } else {
      this.currentSelectedItems.push(item);
    }
  }

  toggleSelectAll() {
    let selectAllChecked = !this.isSelectAllChecked;

    for (let item of this.data) {
      let itemIndex = this.currentSelectedItems.indexOf(item);

      if (selectAllChecked && itemIndex < 0) {
        this.currentSelectedItems.push(item);
      } else if (!selectAllChecked && itemIndex > -1) {
        this.currentSelectedItems.splice(itemIndex, 1);
      }
    }
  }

  //--------------------------------------
  //  Sort
  //--------------------------------------

  orderBy(propName: string) {
    if (this.currentOrderByPropName === propName) {
      // Switch current orderBy sequence
      if (this.currentOrderBySequence === OrderBySequence.Ascending) {
        this.currentOrderBySequence = OrderBySequence.Descending;
      } else {
        this.currentOrderBySequence = OrderBySequence.Ascending;
      }
    } else {
      // Set initial orderBy sequence
      this.currentOrderByPropName = propName;
      this.currentOrderBySequence = OrderBySequence.Ascending;
    }

    this.data.sort((a: any, b: any) => {
      if (a[propName] > b[propName]) {
        return this.currentOrderBySequence === OrderBySequence.Ascending ? 1 : -1;
      } else if (a[propName] < b[propName]) {
        return this.currentOrderBySequence === OrderBySequence.Ascending ? -1 : 1;
      } else {
        return 0;
      }
    });
  }

  isSortedAscending(propName: string) {
    if (this.currentOrderByPropName === propName &&
        this.currentOrderBySequence === OrderBySequence.Ascending) {
      return true;
    } else {
      return false;
    }
  }

  isSortedDescending(propName: string) {
    if (this.currentOrderByPropName === propName &&
        this.currentOrderBySequence === OrderBySequence.Descending) {
      return true;
    } else {
      return false;
    }
  }

  //--------------------------------------
  //  TODO: Edit
  //--------------------------------------

  // editDialog: any;
  
  // showEditDialog() {
  //   this.editDialog.showModal();
  // }
  
  // closeEditDialog() {
  //   this.editDialog.close();
  // }

  //------------------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //------------------------------------------------------------------------------

  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();

    // console.debug(this.el.nativeElement);

    // FIXME: Bindings are not work on polyfilled dialog.
    // this.editDialog = this.el.nativeElement.querySelector('dialog');
    // dialogPolyfill.registerDialog(this.editDialog);
  }

}
