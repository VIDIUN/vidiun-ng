import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalturaLogger, KalturaDefaultLogger } from './kaltura-logger.service';
import { JL } from 'jsnlog';
import { KalturaLoggerRecordService } from './kaltura-logger-record.service';


var consoleAppender=JL.createConsoleAppender('consoleAppender');

JL().setOptions({"appenders": [consoleAppender]});
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
export class KalturaLoggerModule {

    // TODO check why this doesn't work with AOT
    // static forRoot(name: string): ModuleWithProviders {
    //     return {
    //         ngModule: KalturaLoggerModule,
    //         providers: [
    //             {
    //                 provide: KalturaLogger,
    //                 useFactory(parentLogger)
    //                 {
    //                     const logger = new KalturaLogger(name, parentLogger);
    //
    //                     KalturaDefaultLogger.set(logger.subLogger('general'));
    //
    //                     return logger;
    //                 },
    //                 deps: [[new Optional(), new SkipSelf(), KalturaLogger]]
    //             }
    //         ]
    //     };
    // }
    static forRoot(): ModuleWithProviders {
        return {
          ngModule: KalturaLoggerModule,
          providers: [
            KalturaLoggerRecordService
          ]
        }
    }
}

