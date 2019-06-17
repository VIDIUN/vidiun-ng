import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VidiunUtils } from './utils/vidiun-utils';
import { APP_STORAGE_TOKEN, AppStorage } from './app-storage.service';
import { EmptyLogger, VidiunLoggerInjectionToken } from './vidiun-logger';


@NgModule({
    imports: <any[]>[
        CommonModule,
    ],
    declarations: <any[]>[
    ],
    exports: <any[]>[
    ],
    providers: <any[]>[
        ]
})
export class VidiunCommonModule {
    // constructor(@Optional() @SkipSelf() module : VidiunCoreModule, private appBootstrap : AppBootstrap)
    // {
    //     if (module) {
    //         throw new Error("VMCngCoreModule module imported twice.");
    //     }
    // }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: VidiunCommonModule,
            providers: [
                { provide: APP_STORAGE_TOKEN, useClass: AppStorage },
	            VidiunUtils,
                { provide: VidiunLoggerInjectionToken, useClass: EmptyLogger}
            ]
        };
    }
}
