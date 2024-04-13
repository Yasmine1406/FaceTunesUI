import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  private trigger: Subject<any> = new Subject();
  webcamImage: any;
  private nextWebcam: Subject<any> = new Subject();

  sysImage = '';

  ngOnInit() {}


  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
  }

  public saveImageToFile(): void {
    this.trigger.next(void 0);
    if (this.webcamImage) {
      try {
        // Convert Base64 to a Blob
        const base64Image = this.webcamImage.imageAsBase64;
        const blob = this.base64ToBlob(base64Image);
        if (blob) {
          // Save Blob to a local file using FileSaver.js
          saveAs(blob, 'webcam_image.jpg');
        } else {
          console.error('Failed to convert base64 to blob');
        }
      } catch (error) {
        console.error('Error occurred while saving image:', error);
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
  

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }
}



