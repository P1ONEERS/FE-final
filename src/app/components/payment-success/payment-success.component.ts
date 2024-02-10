// payment-success.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { PaymentInfoService } from '../dashboard/payment-info.service';
import { PaymentInfoService } from '../splitbill/payment-info.service';
@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
})
export class PaymentSuccessComponent implements OnInit {
  paymentInfo: any;

  constructor(private route: ActivatedRoute, private paymentInfoService: PaymentInfoService) {}

  ngOnInit(): void {
    // Retrieve payment information from the service
    this.paymentInfo = this.paymentInfoService.getPaymentInfo();

    // If not found in the service, try to get it from the query parameter
    if (!this.paymentInfo) {
      this.route.queryParams.subscribe(params => {
        const info = params['info'];
        if (info) {
          try {
            this.paymentInfo = JSON.parse(decodeURIComponent(info));
          } catch (error) {
            console.error('Error parsing payment info:', error);
          }
        }
      });
    }
  }
}