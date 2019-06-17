import { Component, Input, OnInit } from '@angular/core';
import { PopupWidgetXPositions, PopupWidgetYPositions } from '../popup-widget/popup-widget.component';

@Component({
    selector: 'vInputHelper',
    templateUrl: './input-helper.component.html',
    styleUrls: ['./input-helper.component.scss']
})
export class InputHelperComponent implements OnInit {
    @Input() title: string;
    @Input() trigger: 'click' | 'hover' = 'hover';
    @Input() triggerIcon = 'vIconhelp_full';
    @Input() icon: string = 'vIconhelp';
    @Input() width: number = 300;
    @Input() placement: {x: PopupWidgetXPositions, y: PopupWidgetYPositions} = {x: 'right', y: 'top'};

    constructor() {}

    ngOnInit() {}
}
