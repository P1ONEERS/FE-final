import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HomescreenComponent } from './components/homescreen/homescreen.component';
import { SplitbillComponent } from './components/splitbill/splitbill.component';
import { PembayaranComponent } from './components/pembayaran/pembayaran.component';
import { LoginComponent } from './components/login/login.component';
import { HasilscanComponent } from './components/hasilscan/hasilscan.component';
import { LandingComponent } from './components/landing/landing.component';
import { CobacobaComponent } from './components/cobacoba/cobacoba.component';
import { PlnComponent } from './components/pln/pln.component';
import { SummaryplnComponent } from './components/summarypln/summarypln.component';
import { BuktibayarComponent } from './components/buktibayar/buktibayar.component';
import { EditbillComponent } from './components/editbill/editbill.component';
import { TambahtemanComponent } from './components/tambahteman/tambahteman.component';
import { SummarybillComponent } from './components/summarybill/summarybill.component';
// import { PilihitemComponent } from './components/pilihitem/pilihitem.component';
import { RiwayatbillComponent } from './components/riwayatbill/riwayatbill.component';
import { AdjustqtyComponent } from './components/adjustqty/adjustqty.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QRCodeModule } from 'angularx-qrcode';
import { LoginService } from './services/login.service';

// components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CameraScannerComponent } from './components/camera-scanner/camera-scanner.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { ThousandSeparatorPipe } from './components/homescreen/thousand-separator.pipe';
// routing
import { AppRoutingModule } from './app-routing.module';
import { isDevMode } from '@angular/core';

// service
import { AuthService } from './shared/services/auth.service';
import { OcrService } from './ocr.service';
import { DataService } from './services/data.service';
import { TemanService } from './services/teman.service';
import { Paybill1Component } from './components/paybill1/paybill1.component';
import { Paybill2Component } from './components/paybill2/paybill2.component';
import { Paybill3Component } from './components/paybill3/paybill3.component';
import { Paybill4Component } from './components/paybill4/paybill4.component';
import { Paybill5Component } from './components/paybill5/paybill5.component';

@NgModule({
  declarations: [
    AppComponent,
    HomescreenComponent,
    SplitbillComponent,
    PembayaranComponent,
    LoginComponent,
    HasilscanComponent,
    LandingComponent,
    CobacobaComponent,
    PlnComponent,
    SummaryplnComponent,
    BuktibayarComponent,
    EditbillComponent,
    TambahtemanComponent,
    SummarybillComponent,
    // PilihitemComponent,
    RiwayatbillComponent,
    AdjustqtyComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    CameraScannerComponent,
    PaymentSuccessComponent,
    ThousandSeparatorPipe,
    Paybill1Component,
    Paybill2Component,
    Paybill3Component,
    Paybill4Component,
    Paybill5Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    QRCodeModule,
  ],
  providers: [DataService, TemanService, DatePipe, LoginService, OcrService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
