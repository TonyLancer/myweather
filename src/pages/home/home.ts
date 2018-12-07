import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: any;
  locationKey: any;

  location: {
    city: string,
    province: string
  }

  weatherConditions:any;

  constructor(public navCtrl: NavController, private weatherProvider:WeatherProvider) {

  }

  ionViewWillEnter() {

    this.location = {
      city: 'Johannesburg',
      province: 'Gauteng'
    }


    this.weatherProvider.getLocationKey(this.location.city).subscribe(weather => {
      console.log(weather);
      this.weather = weather;
      this.locationKey = weather[0]['Key'];
      console.log(this.locationKey + ' inside the subscription.');


      this.weatherProvider.getCurrentConditions(this.locationKey).subscribe(theweatherConditions => {
        this.weatherConditions = theweatherConditions;
        console.log('These are the weather conditions.......');
        console.log(this.weatherConditions);
      });
    });
  }

}
