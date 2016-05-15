import { Component, AfterViewInit } from '@angular/core';

declare var componentHandler: any;

@Component({
  selector: 'sd-dashboard',
  templateUrl: 'app/+dashboard/dashboard.component.html',
  styleUrls: ['app/+dashboard/dashboard.component.css'],
  directives: []
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }
}
