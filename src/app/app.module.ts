import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { CameraComponent } from './popup/camera/camera.component';
import { MusicComponent } from './music/music.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    CameraComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule,
    MusicComponent,
    HttpClientModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
