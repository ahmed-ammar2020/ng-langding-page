import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WeatherModule } from './weather/weather.module';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsModule } from './notifications/notifications.module';
import { NewsModule } from './news/news.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    WeatherModule,
    NotificationsModule,
    NewsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
