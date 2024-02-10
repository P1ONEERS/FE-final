import { Component } from '@angular/core';

@Component({
  selector: 'app-camera-scanner',
  templateUrl: './camera-scanner.component.html',
  styleUrls: ['./camera-scanner.component.scss']
})
export class CameraScannerComponent {
  scannedText: string = '';

  startScanning() {
    // Implementasi logika pemindaian kamera dan OCR di sini
    // Misalnya, menggunakan Tesseract.js atau pustaka OCR lainnya.
    // Setelah mendapatkan hasil OCR, simpan dalam variable scannedText.
  }
}
