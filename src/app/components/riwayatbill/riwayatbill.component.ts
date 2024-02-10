import { Component } from '@angular/core';
import { TemanService } from 'src/app/services/teman.service';
import { DataService } from 'src/app/services/data.service';
import { ItemService } from 'src/app/services/item.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-riwayatbill',
  templateUrl: './riwayatbill.component.html',
  styleUrls: ['./riwayatbill.component.scss'],
})
export class RiwayatbillComponent {
  private currentImageIndex: number = 0;

  constructor(    private datePipe: DatePipe, public temanService: TemanService, private itemService: ItemService, private dataService:DataService) {}

  dataTemandanItem: { [id_user: number]: { id_item: number, name: string; quantity: number; price: number }[] } = {};
  // dataTemandanItem: Teman[]=
  showDetailBill: boolean = false;
  selectedItemIndex: number | null = null;
  imagePaths: string[] = [
    '../../../assets/karakter/gambar_4.svg',
    '../../../assets/karakter/gambar_2.svg',
    '../../../assets/karakter/gambar_2.svg',
    '../../../assets/karakter/gambar_3.svg',
    '../../../assets/karakter/gambar_1.svg',
    '../../../assets/karakter/gambar_2.svg',
  ];
  usertampil:any={};
  currentDate: string = '';
  currentTime: string = '';
  loading: boolean = false;
  showSuccessPopup: boolean = false;


  ngOnInit() {
    console.log(this.temanService.getTemanList());

    this.dataService.dataTemandanItem$.subscribe((data) => {
      this.dataTemandanItem = data;
      console.log("DATA", this.dataTemandanItem)
      // Lakukan apa pun yang perlu Anda lakukan dengan data tersebut di sini
      console.log('Data dari DataService:', this.dataTemandanItem);
    });
    this.usertampil = this.temanService.getSelectedFriendsToShow();
    const currentDateTransform = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    const currentTimeTransform = this.datePipe.transform(new Date(), 'HH:mm');

    this.currentDate = currentDateTransform !== null ? currentDateTransform : '';
    this.currentTime = currentTimeTransform !== null ? currentTimeTransform : '';
    
  }
  
  async shareData() {
    try {
      this.loading=true;
      this.truncateTable();
      console.log('Table truncated successfully');
      await this.delay(3000); 
      this.refreshAllItems();
      console.log('All items refreshed successfully');
      await this.delay(3000); 
      this.sendDataToSpringBoot();
      await this.delay(3000); // Sesuaikan waktu delay sesuai kebutuhan
  
      this.postToWhatsappController();
      this.showSuccessPopup = true; // Menampilkan pop-up setelah proses selesai
      setTimeout(() => {
        this.showSuccessPopup = false; // Menyembunyikan pop-up setelah beberapa detik
      }, 2000);

    } catch (error) {
      console.error('An error occurred:', error);
      // Handle error jika diperlukan
    }finally {
      this.loading = false;
    }

  }
  
  // Fungsi untuk melakukan truncate table
  private truncateTable(): Observable<any> {
    return this.temanService.truncateTable();
  }
  
  // Fungsi untuk melakukan refresh semua items
  private refreshAllItems(): Observable<any> {
    return this.temanService.refreshAllItems();
  }
  
  // Fungsi untuk memberikan delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
 
  sendDataToSpringBoot() {
    // Ambil semua kunci (id_user) dari dataTemandanItem
    const keys = Object.keys(this.dataTemandanItem);
  
    // Pastikan bahwa ada setidaknya satu item untuk dikirim
    if (!keys.length) {
      console.log('Tidak ada data teman dan item untuk dikirim.');
      return;
    }
  
    // Mengirim data untuk setiap id_user
    keys.forEach((key) => {
      const id_user: number = +key; // Konversi kunci menjadi number
      const mergedArray: any[] = this.dataTemandanItem[id_user].map((item: { id_item: number, name: string; quantity: number; price: number }) => ({
        id_user: +id_user,
        id_item: item.id_item,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));
  
      console.log(`Merged Array for id_user ${id_user}:`, mergedArray);
  
      this.temanService.postTemanDataToSpringBoot(id_user, mergedArray).subscribe(
        response => {
          console.log(`Data terkirim ke Spring Boot untuk id_user ${id_user}:`, response);
          // Handle the response as needed
        },
        error => {
          console.error(`Error mengirim data ke Spring Boot untuk id_user ${id_user}:`, error);
          // Handle the error as needed
        }
      );
    });
  }
  
  postToWhatsappController() {
    const keys = Object.keys(this.dataTemandanItem);
    if (!keys.length) {
      console.log('Tidak ada data teman dan item untuk dikirim.');
      return;
    }

    keys.forEach((id_user) => {
      this.temanService.postToWhatsappController(+id_user).subscribe(
        response => {
          console.log(`yang tercetak: ${id_user}`);
          console.log('Pesan WhatsApp terkirim:', response);
          // Handle the response as needed
        },
        error => {
          console.error('Error mengirim pesan WhatsApp:', error);
          // Handle the error as needed
        }
      );
    });
  }

  toggleDetailBill(index: number) {
    this.showDetailBill = !this.showDetailBill;
    this.selectedItemIndex = this.selectedItemIndex === index ? null : index;
    console.log('sudah diklik');
  }

  calculateTotalPerUser(user: any): number {
    let total = 0;

    if (this.dataTemandanItem[user.id_user]) {
      this.dataTemandanItem[user.id_user].forEach((item: any) => {
        total += item.quantity * item.price;
      });
    }

    return total;
  }

  calculateTotalForAllUsers(): number {
    let total = 0;

    this.usertampil.forEach((user: any) => {
      total += this.calculateTotalPerUser(user);
    });

    return total;
  }
}