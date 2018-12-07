import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  apiKey = 'CB2fefLyOLd9vQOkqHBecnm3jjsGBjdb';
  url;
  locationKeyURL = 'http://dataservice.accuweather.com/locations/v1/cities/search?';
  currentLocationKeyURL = 'http://dataservice.accuweather.com/currentconditions/v1/';

  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
  }

  getWeatherInfo(city, province) {
    return this.http.get(this.url + '/' + province + '/' + city + '.json').map((res: Response) => res.json() );
  }
  getLocationKey(inputLocation) {
    return this.http.get(this.locationKeyURL + 'apikey=' + this.apiKey + '&q=' + inputLocation).map(res => res);
    // update the location key and send it to the next function to use
  }

  getCurrentConditions(locationKey) {
    return this.http.get(this.currentLocationKeyURL + locationKey + '?apikey=' + this.apiKey);
    //
  }

}
