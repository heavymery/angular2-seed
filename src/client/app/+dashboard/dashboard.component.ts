import { Component, AfterViewInit } from '@angular/core';

import { DataTableComponent } from '../shared/index';

declare var componentHandler: any;

@Component({
  selector: 'sd-dashboard',
  templateUrl: 'app/+dashboard/dashboard.component.html',
  styleUrls: ['app/+dashboard/dashboard.component.css'],
  directives: [DataTableComponent]
})
export class DashboardComponent implements AfterViewInit {

  //------------------------------------------------------------------------------
  //
  //  Properties
  //
  //------------------------------------------------------------------------------

  //--------------------------------------
  //  DataTable sample data
  //--------------------------------------

  sampleData: Array<any> = [
    { material: 'Acrylic (Transparent)',   quantity: '25', unitPrice: 2.90 },
    { material: 'Plywood (Birch)',         quantity: '50', unitPrice: 1.25 },
    { material: 'Laminate (Gold on Blue)', quantity: '10', unitPrice: 2.35 },
  ];

  sampleDataColumns: Array<any> = [
    { field: 'material',  label: 'Material',   sortable: true, nonNumeric: true },
    { field: 'quantity',  label: 'Quantity',   sortable: true },
    { field: 'unitPrice', label: 'Unit price', tooltip: 'US Dollar(USD) Today.' }
  ];

  //------------------------------------------------------------------------------
  //
  //  Lifecycle hooks
  //
  //------------------------------------------------------------------------------

  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }

}
