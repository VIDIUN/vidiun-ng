import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VTooltipDirective } from './v-tooltip.directive';

@NgModule(
  {
    imports: <any[]>[
      CommonModule
    ],
    declarations: <any[]>[
      VTooltipDirective
    ],
    exports: <any[]>[
      VTooltipDirective
    ]
  }
)
export class TooltipModule {

}
