import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherListComponent } from './weather-list/weather-list.component';

@NgModule({
  declarations: [WeatherListComponent],
  imports: [CommonModule],
  exports: [WeatherListComponent],
})
export class WeatherModule {}
