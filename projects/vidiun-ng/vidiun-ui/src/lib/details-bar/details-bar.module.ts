import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsBarComponent } from './details-bar.component';
import { DetailInfoComponent } from "./detail-info.component";
import { TooltipModule } from "../tooltip/v-tooltip.module";

@NgModule({
    imports: <any[]>[
        CommonModule,
        TooltipModule
    ],
    declarations: <any[]>[
        DetailsBarComponent,
        DetailInfoComponent
    ],
    exports: <any[]>[
        DetailsBarComponent,
        DetailInfoComponent
    ],
    providers: <any[]>[
    ]
})
export class DetailsBarModule {
}