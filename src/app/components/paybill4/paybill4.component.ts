import { Component } from '@angular/core';
import { TemanService } from 'src/app/services/teman.service';
import { DataService } from 'src/app/services/data.service';
import axios from 'axios';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-paybill4',
  templateUrl: './paybill4.component.html',
  styleUrls: ['./paybill4.component.scss']
})
export class Paybill4Component {
  private currentImageIndex: number = 0;

  constructor(
    public temanService: TemanService,
    private dataService: DataService,
    private datePipe: DatePipe
  ) {}

  showDetailBill: boolean = false;
  selectedItemIndex: number | null = null; // New property to track selected item
  imagePaths: string[] = [
    '../../../assets/karakter/gambar_4.svg',
    '../../../assets/karakter/gambar_2.svg',
    '../../../assets/karakter/gambar_2.svg',
    '../../../assets/karakter/gambar_3.svg',
    '../../../assets/karakter/gambar_1.svg',
    '../../../assets/karakter/gambar_2.svg',
  ];
  dataTemandanItem: any[] = [] ;
  userIds: any[] = [4]; // Array to store user ids
  usertampil: any = {};
  userNames: any[] = [];

  currentDate: string = '';
  currentTime: string = '';

  getKeys(object: any): string[] {
    return Object.keys(object);
  }
  
  async ngOnInit() {
    console.log("TEMAN LIST", this.temanService.getTemanList());
    
    const currentDateTransform = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    const currentTimeTransform = this.datePipe.transform(new Date(), 'HH:mm');

    this.currentDate = currentDateTransform !== null ? currentDateTransform : '';
    this.currentTime = currentTimeTransform !== null ? currentTimeTransform : '';

    this.usertampil = this.temanService.getSelectedFriendsToShow();
    this.fetchUserData();
    
    await this.getUserIds();

    console.log("USER TAMPIL", this.usertampil)
    console.log("INI ITEMNYA DI HTML", this.dataTemandanItem);
    console.log("INI USER", this.userIds);
    console.log("INI USER DI CONSOLE", this.userNames);
  }

  fetchUserData() {
    this.userIds.forEach((id_user: number) => {
      axios.get(`http://192.168.0.21:8080/api/item/user/${id_user}`)
        .then((response) => {
          console.log(`Data for user ${id_user}:`, response.data);
          this.dataTemandanItem = response.data;
          // Calculate total per user after getting data
          this.usertampil.forEach((user: any) => {
            user.total = this.calculateTotalPerUser(user);
          });
        })
        .catch((error) => {
          console.error(`Error fetching data for user ${id_user}:`, error);
        });
    });
  }

  getUserIds() {
    return Promise.all(this.userIds.map(async id_user => {
        try {
            const response = await axios.get(`http://192.168.0.21:8080/api/teman/${id_user}`);
            // Tambahkan nama pengguna ke dalam array userNames
            this.userNames.push(response.data.name);
            console.log('User Name:', response.data.name);
        } catch (error) {
            console.error('Error fetching user ids:', error);
        }
    }));
  }

  toggleDetailBill(index: number) {
    this.showDetailBill = !this.showDetailBill;
    this.selectedItemIndex = this.selectedItemIndex === index ? null : index;
    console.log('sudah diklik');
  }

  calculateTotalPerUser(user: any): number {
    let total = 0;

    this.dataTemandanItem.forEach((item: any) => {
        total += item.quantity * item.price;
    });
    
    console.log("Total quantity:", total);

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
