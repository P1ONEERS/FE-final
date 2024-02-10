import { Component, OnInit } from '@angular/core';
import { WebcamInitError, WebcamImage, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-scanbill',
  templateUrl: './scanbill.component.html',
  styleUrls: ['./scanbill.component.scss']
})
export class ScanbillComponent {
    // imagePreview: string | ArrayBuffer | null = null;
    // webcamImage: WebcamImage | null = null;
    // showWebcam = false;
    // trigger: Subject<void> = new Subject<void>();
  
    // ngOnInit() {
    //   // Initially check for available video inputs
    //   WebcamUtil.getAvailableVideoInputs()
    //     .then((mediaDevices: MediaDeviceInfo[]) => {
    //       this.showWebcam = mediaDevices && mediaDevices.length > 0;
    //     })
    //     .catch((error: WebcamInitError) => {
    //       console.error(error);
    //     });
    // }
  
    // openCamera() {
    //   this.showWebcam = true;
    //   this.trigger.next();
    // }
  
    // handleImage(webcamImage: WebcamImage) {
    //   this.webcamImage = webcamImage;
    //   this.imagePreview = webcamImage.imageAsDataUrl;
    // }
  
    // uploadImage(event: any) {
    //   // Implement logic to handle image upload from file input
    // }
}
