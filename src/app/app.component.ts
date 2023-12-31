import { Component,OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  weatherData?: WeatherData;
  cityName: string = 'Raebareli';
  
  constructor(private weatherService: WeatherService) { }
 
  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
 }

 onSubmit(){
  this.getWeatherData(this.cityName);
  this.cityName = '';
 }
 private getWeatherData(cityName:string){
  this.weatherService.getWeatherData(cityName)
    .subscribe({
      next: (response) => {
        this.weatherData = response;
        response.main.temp = ((this.weatherData?.main.temp - 32) * 5/9);  //Converting temperatur from fahrenheit to celsius
        response.main.temp_min = ((this.weatherData?.main.temp_min - 32) * 5/9)
        response.main.temp_max = ((this.weatherData?.main.temp_max - 32) * 5/9)
      }
    });
 }
}
