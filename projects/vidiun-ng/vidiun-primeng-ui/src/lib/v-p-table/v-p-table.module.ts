import { NgModule } from '@angular/core';
import { VPSortableColumn } from './v-p-sortable-column';

/**
 * @deprecated use separated module for each component
 */
@NgModule({
    imports: <any[]>[

    ],
    declarations: <any[]>[
        VPSortableColumn
    ],
    exports: <any[]>[
        VPSortableColumn
    ],
    providers: <any[]>[
    ]
})
export class VPTableModule {}
