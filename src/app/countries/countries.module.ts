import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectorComponent } from './pages/selector-page.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, CountriesRoutingModule, ReactiveFormsModule],
    declarations: [SelectorComponent],
    exports: [SelectorComponent],
})
export class CountriesModule { }
