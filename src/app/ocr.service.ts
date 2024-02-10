// ocr.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  private apiUrl = 'https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict';
  private apiKey = 'Token 40bb303fff283756d11de2ad791fbf7c';

  constructor() {}

  scanImage(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append('document', file, file.name);

      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            resolve(JSON.parse(this.responseText));
          } else {
            reject(new Error('Failed to scan image.'));
          }
        }
      });

      xhr.open('POST', this.apiUrl);
      xhr.setRequestHeader('Authorization', this.apiKey);
      xhr.send(data);
    });
  }
}
