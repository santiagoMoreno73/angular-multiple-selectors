import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../services/countries.service';
import { Region, SmallCountry } from '../interfaces/country.interfaces';
import { switchMap, tap } from 'rxjs';

@Component({
    selector: 'selector-page',
    templateUrl: 'selector-page.component.html'
})

export class SelectorComponent implements OnInit {
    public countriesByRegion: SmallCountry[] = [];
    public myform: FormGroup = this.fb.group({
        region: ['', Validators.required],
        country: ['', Validators.required],
        borders: ['', Validators.required],
    });

    constructor(private fb: FormBuilder, private countriesService: CountriesService) { }

    ngOnInit(): void {
        this.onRegionChanges();
    }

    get regions(): Region[] {
        return this.countriesService.regions;
    }

    onRegionChanges(): void {
        this.myform.get("region")!.valueChanges
            .pipe(
                // switchMap(this.countriesService.getCountriesByRegion)
                tap(() => this.myform.get("country")!.setValue("")),
                switchMap(region => this.countriesService.getCountriesByRegion(region))
            )
            .subscribe((countries) => {
                console.log("countries", countries);
                this.countriesByRegion = countries;
            })
    }
}