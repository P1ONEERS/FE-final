import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HasilscanDataService {
    private scannedResult: any;
    private qrCodeData: string;
    private paymentInfo: any;
    private selectedItem: any;
    private selectedItemSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    setScannedResult(result: any): void {
      this.scannedResult = result;
    }
  
    getScannedResult(): any {
      return this.scannedResult;
    }

    generateQRCode(item: any): string {
        // Customize the QR code data based on your requirements
        const paymentInfo = {
          description: item.description,
          quantity: item.quantity,  
          totalAmount: item.total_amount,
          paymentStatus: 'success',
        };
    
        // Access the service to set the paymentInfo
        this.setPaymentInfo(paymentInfo);
    
        // Encode the paymentInfo for the URL
        const encodedPaymentInfo = encodeURIComponent(JSON.stringify(paymentInfo));
    
        // Use a publicly accessible image hosting service or your server to host the QR code image
        return `http://192.168.0.21:4200/payment-success?info=${encodedPaymentInfo}`;
      }
    
      private setPaymentInfo(paymentInfo: any): void {
        // You can enhance this method if needed (e.g., store in a subject for observables)
        // For simplicity, I'm directly setting the paymentInfo in this example
        this.paymentInfo = paymentInfo;
      }

      setSelectedItem(item: any): void {
        this.selectedItem = item;
        this.selectedItemSubject.next(item); // Notify subscribers
      }
    
      getSelectedItem(): Observable<any> {
        return this.selectedItemSubject.asObservable(); // Return observable
      }
  

}