import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  constructor(private http: HttpClient) {}

  private trigger: Subject<void> = new Subject();
  webcamImage: WebcamImage | null = null;
  private nextWebcam: Subject<void> = new Subject();

  sysImage: string = '';

  ngOnInit() {}

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage.imageAsDataUrl;
    console.info('Got webcam image', this.sysImage);
  }

  public async recommendMusic(): Promise<void> {
    this.trigger.next();
    if (this.webcamImage) {
      try {
        const base64Image = this.webcamImage.imageAsBase64;
        const blob = this.base64ToBlob(base64Image);
        if (blob) {
          const url = 'http://127.0.0.1:8000/emotion/';
          const formData = new FormData();
          formData.append('image', blob, 'webcam_image.jpg');

          const response = await this.http.post(url, formData).toPromise();
          console.log(response);
        } else {
          console.error('Failed to convert base64 to blob');
        }
      } catch (error) {
        console.error('Error occurred while sending image:', error);
      }
    } else {
      console.error('No webcam image captured');
    }
  }
  
  private base64ToBlob(base64: string): Blob | null {
    try {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: 'image/jpeg' });
    } catch (error) {
      console.error('Error occurred while decoding base64 string:', error);
      return null;
    }
  }

  public get invokeObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<void> {
    return this.nextWebcam.asObservable();
  }
}



