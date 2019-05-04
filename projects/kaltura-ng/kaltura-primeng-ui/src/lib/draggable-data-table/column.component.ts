import {Component, ContentChild, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'v-column',
  template: ''
})
export class ColumnComponent {
  @Input() field: string;
  @Input() style: string;
  @Input() header: string;
  @ContentChild(TemplateRef) template: TemplateRef<any>;
}
