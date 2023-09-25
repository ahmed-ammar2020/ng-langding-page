import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  switchMap,
  map,
  filter,
  mergeMap,
  toArray,
  share,
  tap,
  catchError,
} from 'rxjs/operators';
import { NotificationsService } from '../notifications/notifications.service';

interface WeatherResponse {
  list: {
    main: {
      temp: string;
    };
    dt_txt: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseURL = 'https://api.openweathermap.org/data/2.5/forecast';
  private appid = '8128e39c4dfe4c6c48d097593f7581a5';

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  getWeather() {
    return this.getLocation().pipe(
      map(({ coords: { latitude, longitude } }) => {
        return new HttpParams()
          .set('appid', this.appid)
          .set('lat', latitude)
          .set('lon', longitude)
          .set('units', 'metric');
      }),
      switchMap((params) => {
        return this.http.get<WeatherResponse>(this.baseURL, { params }).pipe(
          tap(() => {
            this.notificationsService.addSuccess('Got the wather');
          })
        );
      }),

      map((res) => res.list),
      // mergeMap doesn't delete the old observables
      mergeMap((list) => of(...list)),
      filter((obj, index) => index % 8 === 0),
      map((obj) => {
        return {
          temp: obj.main.temp,
          date: obj.dt_txt,
        };
      }),
      toArray(),
      share()
    );
  }

  getLocation() {
    // observable emitting whether the coords or  the error
    return new Observable<GeolocationPosition>((observer) => {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          observer.next(res);
          this.notificationsService.addSuccess('Got your location');
          // you must complete the observable as complete otherwise, the data will not come as you want
          observer.complete();
        },
        (err: GeolocationPositionError) => {
          observer.error(err);
          // in case of  denying user location

          this.notificationsService.addError("Can't access your location");
        }
      );
    });
  }
}
