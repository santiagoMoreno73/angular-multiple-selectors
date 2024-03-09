import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../services/countries.service';
import { Region, SmallCountry } from '../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
    selector: 'selector-page',
    templateUrl: 'selector-page.component.html'
})

export class SelectorComponent implements OnInit {
    public countriesByRegion: SmallCountry[] = [];
    public borders: SmallCountry[] = [];
    public myform: FormGroup = this.fb.group({
        region: ['', Validators.required],
        country: ['', Validators.required],
        border: ['', Validators.required],
    });

    constructor(private fb: FormBuilder, private countriesService: CountriesService) { }

    ngOnInit(): void {
        this.onRegionChanges();
        this.onCountryChange();
    }

    get regions(): Region[] {
        return this.countriesService.regions;
    }

    onRegionChanges(): void {
        this.myform.get("region")!.valueChanges
            .pipe(
                // switchMap(this.countriesService.getCountriesByRegion)
                tap(() => this.myform.get("country")!.setValue("")),
                tap(() => this.borders = []),
                switchMap((region) => this.countriesService.getCountriesByRegion(region))
            )
            .subscribe((countries) => {
                this.countriesByRegion = countries;
            })
    }

    onCountryChange() {
        this.myform.get("country")!.valueChanges
            .pipe(
                tap(() => this.myform.get("border")!.setValue("")),
                filter((value: string) => value.length > 0),
                switchMap((alphaCode) => this.countriesService.getCountryByAlphaCode(alphaCode)),
                switchMap((country) => this.countriesService.getCountryBordersByCodes(country.borders))
            )
            .subscribe((countries) => {
                this.borders = countries;
            })
    }
}