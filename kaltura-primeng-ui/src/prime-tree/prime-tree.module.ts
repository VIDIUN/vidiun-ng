import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTreeDataProvider } from './prime-tree-data-provider.service';
import { PrimeTreePropagation } from './prime-tree-propagation.directive';
import { TreeModule } from 'primeng/primeng';

@NgModule({
    imports: [CommonModule, TreeModule],
    declarations: [
        PrimeTreePropagation],
    exports: [
        PrimeTreePropagation]
})
export class PrimeTreeModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PrimeTreeModule,
            providers: <any[]>[
                PrimeTreeDataProvider
            ]
        };
    }
}