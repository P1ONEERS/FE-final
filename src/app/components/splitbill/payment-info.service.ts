// payment-info.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentInfoService {
  private paymentInfo: any;

  setPaymentInfo(info: any) {
    this.paymentInfo = info;
  }

  getPaymentInfo() {
    return this.paymentInfo;
  }
}
