import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: any;
  temp_weather: any;
  location_coordinate: {
    latitude: number;
    longitude: number;
  }
  latitude: number;
  longitude: number;
  location: {
    city: string,
    locationKey: string
  }

  weatherConditions:any;

  constructor(public navCtrl: NavController, private weatherProvider:WeatherProvider, private geolocation: Geolocation, private storage:Storage) {

  }

  updateWeather() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // console.log(resp.coords);
      // resp.coords.latitude
      // resp.coords.longitude

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

       this.weatherProvider.getGeoPosition(this.latitude, this.longitude).subscribe(weather => {
        // console.log('in the new function... GEOPOSITION...');
        // console.log(weather);
        this.weather = weather;
        this.location.locationKey = this.weather['Key'];
        this.location.city = this.weather['EnglishName'];

        // console.log('location.locationKey is: ' + this.weather['Key']);
        // console.log('location.city is: ' + this.location.city);

        this.storage.set('location', JSON.stringify(this.location));

         this.weatherProvider.getCurrentConditions(this.location.locationKey).subscribe(theweatherConditions => {
          this.weatherConditions = theweatherConditions;
          // console.log('These are the weather conditions.......');
          // console.log(this.weatherConditions);
        });

      });
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  resetWeatherConditions() {

    this.location = {
      city: 'Johannesburg',
      locationKey: '305448'
    }

    this.weatherProvider.getLocationKey(this.location.city).subscribe(weather => {
      // console.log(weather);
      this.weather = weather[0];
      this.location.locationKey = this.weather['Key'];


      this.weatherProvider.getCurrentConditions(this.location.locationKey).subscribe(theweatherConditions => {
        this.weatherConditions = theweatherConditions;
      });
    });
    this.storage.clear();
  }

  ionViewWillEnter() {
    this.storage.get('location').then( (val) => {
      if(val != null) {
        this.location = JSON.parse(val);
      }
      else {
        this.location = {
          city: 'Johannesburg',
          locationKey: '305448'
        }
      }

      this.weatherProvider.getLocationKey(this.location.city).subscribe(weather => {
        // console.log(weather);
        this.weather = weather[0];
        this.location.locationKey = this.weather['Key'];


        this.weatherProvider.getCurrentConditions(this.location.locationKey).subscribe(theweatherConditions => {
          this.weatherConditions = theweatherConditions;
          // console.log('These are the weather conditions.......');
          // console.log(this.weatherConditions);
        });
      });

    });

  }

}
