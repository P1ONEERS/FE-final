import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { ScanbillComponent } from './components/scanbill/scanbill.component';
import { RiwayatbillComponent } from './components/riwayatbill/riwayatbill.component';
import { AdjustqtyComponent } from './components/adjustqty/adjustqty.component';
import { Paybill1Component } from './components/paybill1/paybill1.component';
import { Paybill2Component } from './components/paybill2/paybill2.component';
import { Paybill3Component} from './components/paybill3/paybill3.component';
import { Paybill4Component } from './components/paybill4/paybill4.component';
import { Paybill5Component } from './components/paybill5/paybill5.component';
import { AuthGuard } from './guard/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';



const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent},
  { path: 'splitbill', component: SplitbillComponent },
  { path: 'pembayaran', component: PembayaranComponent},
  { path: 'home', component: HomescreenComponent},
  { path: 'hasilscan', component: HasilscanComponent,
  data: {
    scannedResult: null, // You can set a default value if needed
  },},
  //tambahan naufal
  { path: 'tambahteman', component: TambahtemanComponent },
  //
  { path: 'coba', component: CobacobaComponent},
  { path: 'pln', component: PlnComponent},
  { path: 'summarypln', component: SummaryplnComponent},
  { path: 'buktibayar', component: BuktibayarComponent},
  { path: 'editbill', component: EditbillComponent},
  { path: 'buktibayar', component: BuktibayarComponent},
  { path: 'summarypln', component: SummaryplnComponent},
  { path: 'summarypln/:idpel', component: SummaryplnComponent },
  { path: 'buktibayar/:idpel', component: BuktibayarComponent },
  { path : 'tambahteman', component:TambahtemanComponent},
  { path : 'summarybill', component:SummarybillComponent},
  // { path : 'pilihitem', component:PilihitemComponent},
  { path : 'scanbill', component:ScanbillComponent},
  { path : 'riwayatbill', component:RiwayatbillComponent},
  { path : 'adjustqty', component:AdjustqtyComponent},
  { path: 'adjustqty/:idItem', component: BuktibayarComponent },
  { path: 'summarypln/:idpel/:rekening', component: SummaryplnComponent },
  { path: 'paybill1', component: Paybill1Component},
  { path: 'paybill2', component: Paybill2Component},
  { path: 'paybill3', component: Paybill3Component},
  { path: 'paybill4', component: Paybill4Component},
  { path: 'paybill5', component: Paybill5Component},
  { path: '**', component: NotFoundComponent}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
