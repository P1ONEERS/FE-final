import { Component ,OnInit} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { PaymentInfoService } from './payment-info.service';
import { Router } from '@angular/router'; // Import the Router service
import { Input } from '@angular/core';
import { HasilscanDataService } from './hasilscan-data.service';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { TemanService } from 'src/app/services/teman.service';
import { DataService } from 'src/app/services/data.service';
import { BillService } from 'src/app/services/bill.service';
import { ActiveBill } from 'src/app/model/activeBill.model';
@Component({
  selector: 'app-splitbill',
  templateUrl: './splitbill.component.html',
  styleUrls: ['./splitbill.component.scss'],
  animations: [
    trigger('imageAnimation', [
      state('initial', style({ transform: 'translateY(0)' })),
      state('up', style({ transform: 'translateY(-100%)' })),
      transition('initial => up', animate('7s ease-out')),
    ]),
    trigger('fadeOut', [
      state('initial', style({ opacity: 1 })),
      state('fadeOut', style({ opacity: 0 })),
      transition('initial => fadeOut', animate('2s')),
      transition('fadeOut => initial', animate('2s')),
    ]),
    trigger('fadeIn', [
      state('initial', style({ opacity: 0 })),
      state('fadeIn', style({ opacity: 1 })),
      transition('initial => fadeIn', animate('0.5s')),
      transition('fadeIn => initial', animate('0.5s')),
    ]),
    trigger('popupAnimation', [
      state('hidden', style({ transform: 'translateY(100%)' })),
      state('visible', style({ transform: 'translateY(0)' })),
      transition('hidden => visible', animate('0.5s ease-in')),
      transition('visible => hidden', animate('0.5s ease-out'))
    ])
  ],
})
export class SplitbillComponent implements OnInit {
  loading: boolean = false;
  isBillAktif: boolean = true;
  isNotificationVisible = false;
  notificationTimeout: any;
  isNotification: boolean = false;
  isPopupVisible: boolean = false;
  popupAnimationState: string = 'hidden';
  // isBillClosed: boolean = false;
  @Input() scannedResult: any;

  tempat : string = ''
  tanggal : string = ''
  jam : string = ''
  total : number = 0
  jumlahMenu : number = 0
  jumlahTeman : number = 0


  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'initial';
  animationCompleted = false;

  showConfirmation: boolean = false;
  showConfirmationNotification: boolean = false;

  activeBillIndex: number = 0;
  usertampil: any = {};
  // dataTemandanItem: any = {};
  dataTemandanItem: { [id_user: number]: any[] } = {};
 
  imagePaths: string[] = [
    '../../../assets/karakter/gambar_4.svg',
    '../../../assets/karakter/gambar_2.svg',
    '../../../assets/karakter/gambar_2.svg',
    '../../../assets/karakter/gambar_3.svg',
    '../../../assets/karakter/gambar_1.svg',
    '../../../assets/karakter/gambar_2.svg',
  ];
  isSwitchActive: boolean[] = Array(this.imagePaths.length).fill(false);

  activeBill:ActiveBill[]=[]

  constructor(
    public httpClient: HttpClient,
    public billService: BillService,
    public paymentInfoService: PaymentInfoService,
    public router: Router, // Inject the Router service
    public hasilscanDataService: HasilscanDataService,
    public temanService: TemanService,
    public dataService: DataService, // Inject the service

  ) {}
  ngOnInit() {
    // You can keep ngOnInit empty or add any other initialization logic here
    // this.tempat = this.dataService.tempat;
    // this.tanggal = this.dataService.tanggal;
    // this.jam = this.dataService.jam;
    // this.total = this.dataService.calculateTotal();

    this.jumlahMenu = this.dataService.calculateJumlahMenu();
    this.jumlahTeman = this.temanService.getJumlahTeman();
    // this.selectedFriendsToShow = this.temanService.getTemanList();
    console.log('TEMANLIST', this.temanService.getTemanList());
    console.log('toshow', this.temanService.getSelectedFriendsToShow());
    console.log('jumlahteman', this.temanService.getJumlahTeman());
    // console.log('isi aktivebill : ', this.billService.getActiveBill());
    console.log('isi history : ', this.billService.getHistory());
    this.dataService.dataTemandanItem$.subscribe((data) => {
    this.dataTemandanItem = data;
      // Lakukan apa pun yang perlu Anda lakukan dengan data tersebut di sini
      console.log('Data dari DataService:', this.dataTemandanItem);
    });
    console.log("usertampil",this.usertampil = this.temanService.getSelectedFriendsToShow());
    console.log('isi aktivebill : ', this.activeBill=this.billService.getActiveBill())
  }

  ngAfterViewInit() {
    this.toggleImageAnimation();
  }

  toggleImageAnimation() {
    this.animationState = (this.animationState === 'initial') ? 'up' : 'initial';
    this.fadeOutState = (this.fadeOutState === 'initial') ? 'fadeOut' : 'initial';
    this.fadeInState = (this.fadeInState === 'initial') ? 'fadeIn' : 'initial';
  }

  animationDone() {
    this.animationCompleted = true;
  }

  calculateTotalForAllUsers(): number {
    let total = 0;

    this.usertampil.forEach((user: any) => {
      total += this.calculateTotalPerUser(user);
    });

    return total;
  }

  calculateTotalPerUser(user: any): number {
    let total = 0;

    if (this.dataTemandanItem[user.id_user]) {
      this.dataTemandanItem[user.id_user].forEach((item: any) => {
        total += item.quantity * item.price;
      });
    }

    return total;
  }

  toggleSwitch(index: number) {
    // Toggle nilai boolean di dalam array sesuai dengan index gambar yang diklik
    this.isSwitchActive[index] = !this.isSwitchActive[index];
  }
  onSwitchButtonClick(isBillAktif: boolean) {
    this.isBillAktif = isBillAktif;
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
    this.popupAnimationState = this.isPopupVisible ? 'visible' : 'hidden';
  
    // If the popup is closed, switch between active bill and history views
    if (!this.isPopupVisible) {
      this.isBillAktif = !this.isBillAktif;
    }
  }

  tambahBill() {
    // Ambil data teman yang telah dipilih
    const selectedFriends = this.temanService.getTemanList();
    // let id = 0

    // Persiapkan data sharing bill
    const billData: ActiveBill = {
      tempat: this.dataService.tempat,
      tanggal: this.dataService.tanggal,
      jam: this.dataService.jam,
      total: this.dataService.calculateTotal(),
      selectedFriendsToShow: selectedFriends,
      status: 'active',
      // ... tambahkan properti lain yang dibutuhkan
    };

    // Tambahkan sharing bill baru ke dalam transaksi aktif menggunakan BillService
    this.billService.addNewBill(billData);

    // Reset data teman yang telah dipilih
    this.temanService.clearSelectedFriends();

    // Navigasi ke halaman hasil scan
    // this.router.navigate(['/hasilscan']);
  }

  confirmCloseBill() {
    // Move the list from active bill to history
    // if (this.isBillAktif) {
    //   this.billService.setActiveBillData(this.selectedFriendsToShow);
    //   this.billService.moveActiveBillToHistory();
    //   this.billService.clearActiveBillData();
    //   this.isBillAktif = false; // Set isBillAktif to false to show the history section
    //   //  this.selectedFriendsToShow = [];
    //   this.router.navigate(['/riwayat']);
    // }

    if (this.isBillAktif) {
      const activeBillData: ActiveBill = {
        tempat: this.tempat,
        tanggal: this.tanggal,
        jam: this.jam,
        total: this.total,
        selectedFriendsToShow: this.temanService.getSelectedFriendsToShow(),
        status: 'closed',
        // ... tambahkan properti lain yang dibutuhkan
      };

      this.billService.addNewBill(activeBillData);
      this.billService.moveActiveBillToHistory(this.activeBillIndex);
      this.billService.clearActiveBillData();
      this.isBillAktif = false; // Set isBillAktif to false to show the history section
      this.router.navigate(['/riwayat']);
    }

    // Close the popup or perform other actions
    this.togglePopup();
  }
  
  cancelCloseBill() {
    this.showConfirmationNotification = false;
  }
  
  openConfirmation() {
    this.showConfirmationNotification = true;
  }
  saveScannedResult() {
    localStorage.setItem('scannedResult', JSON.stringify(this.scannedResult));
  }

  startScanning(event: Event) {
    this.loading = true;
    event.preventDefault();
    const fileInput = document.getElementById('my-file-input') as HTMLInputElement;
    const file = fileInput?.files?.[0];
  
    if (file) {
      const formData = new FormData();
      formData.append('document', file, file.name);
  
      this.httpClient.post('https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict', formData, {
        headers: {
          Authorization: 'Token 9c8db4629234c9d1f66d92b83bdcdcc7',
        },
      }).subscribe(
        (response: any) => {
          // Set payment info using the service
          this.scannedResult = response;

          // Assuming there is a specific item you want to use for payment info
          const selectedItem = this.scannedResult.document.inference.pages[0].prediction.line_items[0];

          const lineItems = response.document.inference.pages[0].prediction.line_items;

          // Map line_items to match the expected format in Spring Boot
          const formattedItems = lineItems.map(item => ({
              description: item.description,
              quantity: item.quantity,
              total_amount: item.total_amount,
          }));

          // Send the formattedItems array to Spring Boot
          console.log('Scanned Result:', response);
          this.hasilscanDataService.setScannedResult(response);

          // Programmatically navigate to the 'hasilscan' route with state
          
          this.router.navigate(['/hasilscan']);
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
            const qrCode = this.generateQRCode(item);
  
            // Set the QR code data in the shared service
            this.router.navigate(['/payment-success'], {
              queryParams: { qrData: qrCode },
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
        body: `Redirect Link: http://192.168.0.21:4200/payment-success?info=${encodedPaymentInfo}`
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
}