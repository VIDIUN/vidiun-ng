import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VidiunLogger, VidiunLoggerName } from './vidiun-logger.service';
import { JL } from 'jsnlog';
import { VidiunLoggerRecordService } from './vidiun-logger-record.service';

if (window && window.onerror) {
    window.onerror = null;
}

@NgModule({
    imports: <any[]>[
        CommonModule
    ],
    declarations: <any[]>[

    ],
    exports: <any[]>[
    ],
    providers: <any[]>[
    ]
})
export class VidiunLoggerModule {


    static forRoot(name: string): ModuleWithProviders {
        return {
          ngModule: VidiunLoggerModule,
          providers: [
	          VidiunLogger,
	          {
		          provide: VidiunLoggerName, useValue: name
	          },
            VidiunLoggerRecordService
          ]
        }
    }
}

