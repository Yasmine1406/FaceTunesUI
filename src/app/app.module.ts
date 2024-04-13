import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';

import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { CameraComponent } from './popup/camera/camera.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    CameraComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
