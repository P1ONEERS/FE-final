import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HasilscanDataService } from '../splitbill/hasilscan-data.service';
import { PaymentInfoService } from '../splitbill/payment-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editbill',
  templateUrl: './editbill.component.html',
  styleUrls: ['./editbill.component.scss']
})
export class EditbillComponent implements OnInit {
  scannedResult: any = {};
  currentDate: string = '';
  currentTime: string = '';

  constructor(private datePipe: DatePipe,private hasilscanDataService: HasilscanDataService) {}

  ngOnInit() {
    this.scannedResult = this.hasilscanDataService.getScannedResult(); // Corrected the service name here
    console.log('hasil scan in edit: ', this.scannedResult);
    const currentDateTransform = this.datePipe.transform(
      new Date(),
      'dd/MM/yyyy'
    );
    const currentTimeTransform = this.datePipe.transform(
      new Date(),
      'HH:mm'
    );

    this.currentDate = currentDateTransform !== null ? currentDateTransform : '';
    this.currentTime = currentTimeTransform !== null ? currentTimeTransform : '';
  }
}