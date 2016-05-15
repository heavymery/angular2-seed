import { Directive, ElementRef, Input } from '@angular/core';

declare var componentHandler: any;

@Directive({
  selector: '[mdlUpgrade]'
})
export class MdlUpgradeDirective {
  constructor(el: ElementRef) {
    // FIXME: Some components are not upgraded correctly.
    componentHandler.upgradeElement(el.nativeElement);
  }
}