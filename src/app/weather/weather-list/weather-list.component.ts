import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css'],
})
export class WeatherListComponent {
  weatherReports: { temp: string; date: string }[];

  constructor(private weatherService: WeatherService) {
    this.weatherService.getWeather().subscribe((reports) => {
      this.weatherReports = reports;
    });
  }
}
