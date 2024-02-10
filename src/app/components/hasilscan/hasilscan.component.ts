// hasilscan.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { HasilscanDataService } from '../splitbill/hasilscan-data.service';
import { PaymentInfoService } from '../splitbill/payment-info.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-hasilscan',
  templateUrl: './hasilscan.component.html',
  styleUrls: ['./hasilscan.component.scss'],
})
export class HasilscanComponent implements OnInit {
  scannedResult: any={};
  qrCodeData:string;
  currentDate: string = ''; // Provide an initializer
  currentTime: string = ''; // Provide an initializer
  isButtonDisabled: boolean = false; // Set it to true if you want to disable the button initially
  

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private hasilscanDataService: HasilscanDataService,
    private paymentInfoService: PaymentInfoService,
    private datePipe: DatePipe,
    private router: Router,
    ) {}

  ngOnInit() {
    this.scannedResult = this.hasilscanDataService.getScannedResult();
    console.log('hasil scan after : ',this.scannedResult)
    const currentDateTransform = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    const currentTimeTransform = this.datePipe.transform(new Date(), 'HH:mm');

    this.currentDate = currentDateTransform !== null ? currentDateTransform : '';
    this.currentTime = currentTimeTransform !== null ? currentTimeTransform : '';
  }

  generateQRCode(item: any): string {
    // Access the service to generate the QR code
    return this.hasilscanDataService.generateQRCode(item);
  }

  navigateToEdit() {
    const selectedItem = this.scannedResult.document.inference.pages[0].prediction.line_items[0];

    this.hasilscanDataService.setSelectedItem(selectedItem);
    console.log('Button clicked');

  }
  confirmPayment() {
    const lineItems = this.scannedResult.document.inference.pages[0].prediction.line_items;

    // Map line_items to match the expected format in Spring Boot
    let nextId = 1;
    const formattedItems = lineItems.map(item => ({
      id_item: nextId++,
      name: item.description,
      quantity: item.quantity,
      price: item.total_amount,
    }));
    console.log("ITEMNYA", formattedItems)
    this.hasilscanDataService.setSelectedItem(formattedItems)

    // Move the logic for saving to the MySQL database here
    this.callSpringBootApi(formattedItems);
    //tambahan naufal
    this.router.navigate(['/tambahteman'])
    //
    // Additional logic if needed

    // Redirect or perform other actions
  }


  callSpringBootApi(formattedItems: any) {
    this.httpClient.post('http://localhost:8081/api/ocr/send-json', formattedItems, { responseType: 'text' as 'json' }).subscribe(
      (response: any) => {
        console.log('Data sent to Spring Boot:', response);
        console.log('Data JSON DB:', formattedItems);
      },
      (error) => {
        console.error('Error sending data to Spring Boot:', error);
      }
    );
  }
  
  // Tambahkan fungsi lain yang Anda perlukan
}
