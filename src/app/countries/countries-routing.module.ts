import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectorComponent } from './pages/selector-page.component';

const routes = [
    {
        path: "",
        children: [
            { path: "selector", component: SelectorComponent },
            { path: "**", redirectTo: "selector" }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CountriesRoutingModule { }
