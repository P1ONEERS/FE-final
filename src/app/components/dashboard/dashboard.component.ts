import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { OcrService } from 'src/app/ocr.service';
import { HttpClient } from '@angular/common/http';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Router } from '@angular/router'; // Import the Router service
import * as fs from 'fs';

import { PaymentInfoService } from './payment-info.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  scannedResult: any = {};

  constructor(
    public authService: AuthService,
    public ocrService: OcrService,
    private httpClient: HttpClient,
    private paymentInfoService: PaymentInfoService,
    private router: Router // Inject the Router service

  ) {}

  ngOnInit(): void {}

  startScanning(event: Event) {
    event.preventDefault();
    const fileInput = document.getElementById('my-file-input') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('document', file, file.name);

      this.httpClient.post('https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict', formData, {
    headers: {
      Authorization: 'Token 40bb303fff283756d11de2ad791fbf7c',
    },
  }).subscribe(
    (response: any) => {
      this.scannedResult = response;
      console.log('Scanned Result:', this.scannedResult);

      // Assuming there is a specific item you want to use for payment info
      const selectedItem = this.scannedResult.document.inference.pages[0].prediction.line_items[0];

      // Set payment info using the service
      this.paymentInfoService.setPaymentInfo({
        description: selectedItem.description,
        quantity: selectedItem.quantity,
        totalAmount: selectedItem.total_amount,
        paymentStatus: 'success',
      });

      console.log('Scanned Result:', this.scannedResult);
    },
    (error) => {
      console.error('Error during scanning:', error);
    }
  );
    }
  }
  generateQRCodeAndRedirect(scannedResult: any): void {
    if (scannedResult.document && scannedResult.document.inference.pages) {
      for (const page of scannedResult.document.inference.pages) {
        if (page && page.prediction && page.prediction.line_items) {
          for (const item of page.prediction.line_items) {
            // Generate the QR code data
            const qrData = this.generateQRCode(item);
  
            // Redirect to the payment success page with the QR code data
            this.router.navigate(['/payment-success'], {
              queryParams: { qrData },
            });
          }
        }
      }
    }
  }

  generateQRCode(item: any): string {
    // Customize the QR code data based on your requirements
    const paymentInfo = {
      description: item.description,
      quantity: item.quantity,
      totalAmount: item.total_amount,
      paymentStatus: 'success',
    };

    this.paymentInfoService.setPaymentInfo(paymentInfo);

    const codec = new HttpUrlEncodingCodec();
    const encodedPaymentInfo = codec.encodeValue(JSON.stringify(paymentInfo));

    // Use a publicly accessible image hosting service or your server to host the QR code image
    const redirectLink = `http://192.168.0.21:4200/payment-success?info=${encodedPaymentInfo}`;//ubah jadi localhost bisa, di package.json juga

    return redirectLink;
  }

  async sendViaWhatsApp(item: any): Promise<void> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer EAASll7YORvABO5cP8a7KISBSWZBPszPH9aI07kNgX01gKoPlTK7tdj5c0ZAI15pSdyQPAAhffLzQ1YG0ZAVlX359yobI3Y713MNeyJwVr0bw3WLhlIdkwJyHZBsmrYg0ugxDNxCYG6MvbXtiws7X9JcZBx4yVvgmNfNcK135ueuVnex01nfT33U0NEisiwpdKMClT4KTYdgeAjlMwvkAZD");

    const selectedItem = this.scannedResult.document.inference.pages[0].prediction.line_items[0];
    const qrCodeImageLink = this.generateQRCode(selectedItem);
    const paymentInfo = {
      description: item.description,
      quantity: item.quantity,
      totalAmount: item.total_amount,
      paymentStatus: 'success',
    };
    const codec = new HttpUrlEncodingCodec();
    const encodedPaymentInfo = codec.encodeValue(JSON.stringify(paymentInfo));
    const raw = JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: '6281388183491',
      type: 'text',
      text: {
        body: `Redirect Link: http://192.168.0.21/payment-success?info=${encodedPaymentInfo}`
      }
    });

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const response = await fetch("https://graph.facebook.com/v18.0/219092427953174/messages", requestOptions);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('error', error);
    }
}


  
  

  // Call the function


}