import { Component, booleanAttribute } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TemanService } from 'src/app/services/teman.service';
import { Teman } from 'src/app/model/teman.model';
import { HasilscanComponent } from '../hasilscan/hasilscan.component';
import { HasilscanDataService } from '../splitbill/hasilscan-data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-summarybill',
  templateUrl: './summarybill.component.html',
  styleUrls: ['./summarybill.component.scss'],
})
export class SummarybillComponent {
  showDetailBill: boolean = false;
  data: any[] = [];
  tempat = '';
  tanggal = '';
  jam = '';
  total: number = 0;
  daftarteman: Teman[] = [];
  // dataTemandanItem: Teman[] = [];

  //Simpan Teman dan Item, hitung total per orang
  dataTemandanItem: {
    [id_user: number]: {
      id_item: number;
      name: string;
      quantity: number;
      price: number;
    }[];
  } = {};
  totalPrice = 0;
  totalPrices: { [id_user: number]: number } = {};
  itemStatus: { [id_user: number]: { [id_item: number]: boolean } } = {};

  //PopUp Adjust Qty
  showPopup: boolean = false;
  adjustQuantity: number = 1;

  qtyNow: number[] = [0];
  selectedItemForAdjustment: any;
  showAdjustqty = false;
  qtyhasilscan: number[] = [];
  count: number = 1;
  lastCount: { [userId: number]: { [itemId: number]: number } } = {};

  showLastCount: boolean[] = [false];
  initialCount: number = 1;

  currentDate: string = '';
  currentTime: string = '';

  availableItemsForAllUsers: any[] = [];

  constructor(
    public dataService: DataService,
    public temanService: TemanService,
    public hasilscanDataService: HasilscanDataService,
    private datePipe: DatePipe
  ) {}
  toggleDetailBill() {
    this.showDetailBill = !this.showDetailBill;
    console.log('sudah diklik');
  }

  // closePopup() {
  //   // Set showPopup to false to close the popup
  //   this.showPopup = false;
  // }

  ngOnInit(): void {
    // this.data = this.dataService.getData();
    this.hasilscanDataService.getSelectedItem().subscribe(
      data => {
        console.log("DATANYA", data);
        this.data = data;  // Setelah mendapatkan data, inisialisasikan variabel data
      },
      error => {
        console.error("Error retrieving selected item:", error);
      }
    );
    this.daftarteman = this.temanService.getSelectedFriendsToShow();

    const currentDateTransform = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    const currentTimeTransform = this.datePipe.transform(new Date(), 'HH:mm');

    this.currentDate = currentDateTransform !== null ? currentDateTransform : '';
    this.currentTime = currentTimeTransform !== null ? currentTimeTransform : '';

    //Filter berdasarkan quantity
    this.availableItemsForAllUsers = this.data.filter(
      (item) => item.quantity > 0
    );

    // Initialize itemStatus for each user
    this.daftarteman.forEach((teman) => {
      this.lastCount[teman.id_user] = {};
      this.availableItemsForAllUsers.forEach((item) => {
        this.lastCount[teman.id_user][item.id_item] = 0; // Initialize count to 0
      });
    });

    //console.log()

    console.log('toshow', this.temanService.getSelectedFriendsToShow());
    console.log('jumlahteman', this.temanService.getJumlahTeman());
    console.log('temenlist', this.temanService.getTemanList());

    // this.tempat = this.dataService.tempat;
    // this.tanggal = this.dataService.tanggal;
    // this.jam = this.dataService.jam;
    this.total = this.dataService.total;
    this.qtyNow = this.data.map((item) => item.quantity)
    console.log("QUANTITY NOW", this.qtyNow)
    console.log("LAST COUNT", this.lastCount)
  }

  getTemanName(id_user: number): string {
    const teman = this.daftarteman.find(teman => teman.id_user === id_user);
    return teman ? teman.name : ''; // Mengembalikan nama teman jika ditemukan, atau string kosong jika tidak ditemukan
  }

  removeItem(id_user: number, id_item: number): void {
    // Update the disabledItems status for all friends except the current user
    this.daftarteman.forEach((teman) => {
      if (teman.id_user !== id_user) {
        teman.disabledItems = {
          ...teman.disabledItems,
          [id_item]: false,
        };
      }
    });

    // Hapus item dari dataTemandanItem
    this.dataTemandanItem[id_user] = this.dataTemandanItem[id_user].filter(
      (item) => item.id_item !== id_item
    );

    // Calculate the total price
    this.calculateTotalPrice();
  }

  activateItem(id_user: number, id_item: number): void {
    // Mengaktifkan kembali item yang di-disable oleh user lain
    this.daftarteman.forEach((teman) => {
      if (teman.disabledItems && teman.disabledItems[id_item]) {
        teman.disabledItems[id_item] = false;
      }
    });

    // Calculate the total price
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): { [id_user: number]: number } {
    for (const id_user in this.dataTemandanItem) {
      if (this.dataTemandanItem.hasOwnProperty(id_user)) {
        let totalPrice = 0;

        // Iterate through each item for the user
        this.dataTemandanItem[id_user].forEach((item) => {
          // Calculate the total price for each item and add to the overall total
          totalPrice += item.quantity * item.price;
        });

        // Assign the total price to the user ID
        this.totalPrices[id_user] = totalPrice;
      }
    }
    console.log('Total prices for each user:', this.totalPrices);

    return this.totalPrices;
  }

  addItem(
    userId: number,
    id: number,
    itemName: string,
    quantity: number,
    price: number
  ): void {
    console.log('START ADD ITEM');
    console.log('Quantity Now: ', this.qtyNow[id - 1]);

    // Initialize the user if not exists
    this.dataTemandanItem[userId] = this.dataTemandanItem[userId] || [];

    // Check if the item is already in the list for the current user
    const existingItemIndex = this.dataTemandanItem[userId].findIndex(
      (item) => item.id_item === id
    );

    if (quantity > 1) {
      //jika lebih dari satu maka gunakan POPUP dan proses kalkulasi dilakukan di saveAdjustQtyPopup
      this.showPopup = true;

      // Simpan item yang dipilih untuk diatur quantity-nya
      this.selectedItemForAdjustment = {
        userId: userId,
        id: id,
        itemName: itemName,
        quantity: quantity,
        price: price,
      };

      console.log(
        'selectedItemForAdjustment : ',
        this.selectedItemForAdjustment
      );

      if (existingItemIndex !== -1) {
        // If the item is already in the list, remove it (uncheck)
        this.dataTemandanItem[userId].splice(existingItemIndex, 1);
      } else {
        // If the item is not in the list, add it (check)
        this.dataTemandanItem[userId].push({
          id_item: id,
          name: itemName,
          quantity: quantity,
          price: price,
        });
      }
    } else {
      //Jika sama dengan 1 maka tidak tampil popup dan langsung disable
      this.showPopup = false;
      if (existingItemIndex !== -1) {
        // If the item is already in the list, remove it (uncheck)
        this.dataTemandanItem[userId].splice(existingItemIndex, 1);
      } else {
        // If the item is not in the list, add it (check)
        this.dataTemandanItem[userId].push({
          id_item: id,
          name: itemName,
          quantity: quantity,
          price: price,
        });
      }
      //End Check--//

      //--Start Disable Items--//
      //--Disable Other same item in other user's Checkbox--//
      // Check if the item is disabled (already selected by any user)
      const isItemDisabled = this.daftarteman.some(
        (teman) => teman.disabledItems && teman.disabledItems[id]
      );

      // Update the disabledItems status for all friends except the current user
      this.daftarteman.forEach((teman) => {
        if (teman.id_user !== userId) {
          teman.disabledItems = {
            ...teman.disabledItems,
            [id]: !isItemDisabled, // Update the disabled status based on the checked/unchecked status
          };
          console.log('item disabled(T/F): ', teman.disabledItems);
        }
      });
      console.log('DataTemandanItem: ', this.dataTemandanItem);
      //---End Disable Item---//
    }
    console.log('last count', this.lastCount);
    console.log('END ADD ITEM');
  }

  increment() {
    //Cek object kosong ga?

    if (!this.lastCount[this.selectedItemForAdjustment.userId]) {
      this.lastCount[this.selectedItemForAdjustment.userId] = {};
    }

    //--Cek apabila melebihi qty sekarang atau tidak--//
    //Jika lastCount dibawah item quantity dan selama quantityNow diatas 0 maka masih bisa tambah--//
    if (
      this.lastCount[this.selectedItemForAdjustment.userId][
        this.selectedItemForAdjustment.id
      ] < this.selectedItemForAdjustment.quantity &&
      this.qtyNow[this.selectedItemForAdjustment.id - 1] > 0
    ) {
      this.lastCount[this.selectedItemForAdjustment.userId][
        this.selectedItemForAdjustment.id
      ]++;
      //--Update Qty (QtyNow dikurangi LastCount)--//
      this.qtyNow[this.selectedItemForAdjustment.id - 1] =
        this.qtyNow[this.selectedItemForAdjustment.id - 1] - 1;
    } else {
      console.log(
        'melebihi maksimal!',
        this.qtyNow[this.selectedItemForAdjustment.id - 1]
      );
    }
    //--end cek qty--//

    //--Berapa yang ditambahkan--//
    console.log(
      'tambahin',
      this.lastCount[this.selectedItemForAdjustment.userId][
        this.selectedItemForAdjustment.id
      ]
    );
    console.log('QTY NOW: ', this.qtyNow);
  }

  decrement() {
    //Cek object kosong ga?
    if (!this.lastCount[this.selectedItemForAdjustment.userId]) {
      this.lastCount[this.selectedItemForAdjustment.userId] = {};
    }

    //--Cek apakah diatas 0--//
    if (
      this.lastCount[this.selectedItemForAdjustment.userId][
        this.selectedItemForAdjustment.id
      ] > 0
    ) {
      //--Kurangi nilai LastCount--//
      this.lastCount[this.selectedItemForAdjustment.userId][
        this.selectedItemForAdjustment.id
      ] =
        this.lastCount[this.selectedItemForAdjustment.userId][
          this.selectedItemForAdjustment.id
        ] - 1;
      //--Update Qty (QtyNow dikurangi LastCount)--//
      this.qtyNow[this.selectedItemForAdjustment.id - 1] =
        this.qtyNow[this.selectedItemForAdjustment.id - 1] + 1;

      //--Berapa yang dikurangin--//
      console.log(
        'kurangin: ',
        this.lastCount[this.selectedItemForAdjustment.userId][
          this.selectedItemForAdjustment.id
        ]
      );
    } else {
      console.log('nol!');
    }
    console.log('QTY NOW: ', this.qtyNow);
    //--end cek 0--//
  }

  //SIMPAN QUANTITY BARU (fungsi utk tombol 'simpan' di popup)//
  saveAdjustQtyPopup() {
    console.log('Start Save Adjusment');

    // Set quantity dari item yang dipilih dengan nilai yang diatur dgn INCREMENT() dan DECREMENT()
    this.selectedItemForAdjustment.quantity =
      this.selectedItemForAdjustment.quantity -
      this.lastCount[this.selectedItemForAdjustment.userId][
        this.selectedItemForAdjustment.id
      ];

    // Update atau tambahkan item ke dalam dataTemandanItem[userId]
    const existingItemIndex = this.dataTemandanItem[
      this.selectedItemForAdjustment.userId
    ].findIndex((item) => item.id_item === this.selectedItemForAdjustment.id);

    if (existingItemIndex !== -1) {
      // Jika item sudah ada, update quantity
      this.dataTemandanItem[this.selectedItemForAdjustment.userId][
        existingItemIndex
      ].quantity =
        this.lastCount[this.selectedItemForAdjustment.userId][
          this.selectedItemForAdjustment.id
        ];
      // Hitung harga sesuai quantity yang telah di adjust
      this.dataTemandanItem[this.selectedItemForAdjustment.userId][
        existingItemIndex
      ].price =
        this.lastCount[this.selectedItemForAdjustment.userId][
          this.selectedItemForAdjustment.id
        ] *
        this.dataTemandanItem[this.selectedItemForAdjustment.userId][
          existingItemIndex
        ].price;
    } else {
      // Jika item belum ada, tambahkan item ke dalam dataTemandanItem[userId]
      this.dataTemandanItem[this.selectedItemForAdjustment.userId].push({
        id_item: this.selectedItemForAdjustment.id,
        name: this.selectedItemForAdjustment.itemName,
        quantity:
          this.lastCount[this.selectedItemForAdjustment.userId][
            this.selectedItemForAdjustment.id
          ],
        price:
          this.selectedItemForAdjustment.price *
          this.lastCount[this.selectedItemForAdjustment.userId][
            this.selectedItemForAdjustment.id
          ],
      });
    }

    // //--Start Disable Items--//
    // //--Disable Other same item in other user's Checkbox--//
    // // Check if the item is disabled (already selected by any user)
    // const isItemDisabled = this.daftarteman.some(
    //   (teman) =>
    //     teman.disabledItems &&
    //     teman.disabledItems[this.selectedItemForAdjustment.id-1]
    // );
    // if (this.selectedItemForAdjustment.quantity === 0) {
    //   // Update the disabledItems status for all friends except the current user
    //   this.daftarteman.forEach((teman) => {
    //     if (teman.userId !== this.selectedItemForAdjustment.userId) {
    //       teman.disabledItems = {
    //         ...teman.disabledItems,
    //         [this.selectedItemForAdjustment.id]: !isItemDisabled, // Update the disabled status based on the checked/unchecked status
    //       };
    //       console.log('item disabled(T/F): ', teman.disabledItems);
    //     }
    //   });
    // }

    //---End Disable Item---//

    //--tutup Popup--//
    this.closePopup();

    //--Recap Data--//
    console.log('DataTemandanItem: ', this.dataTemandanItem);
    //--ID User sekarang--//
    console.log('ID Now: ', this.selectedItemForAdjustment.id);
    //--Data tiap user ambil berapa?--//
    console.log('LastCount: ', this.lastCount);
    //--Data jumlah item yang bisa diambil--//
    console.log('Qty Now / Sisa Qty: ', this.qtyNow);
    //--Data user dan itemnya--//
    console.log('DataTemandanItem: ', this.dataTemandanItem);

    console.log('End Save Adjusment');
  }

  closePopup() {
    this.showPopup = false;
  }

  next() {
    this.dataService.setDataTemandanItem(this.dataTemandanItem);
    console.log(this.dataService.dataTemandanItem$);
  }

  closeAdjustQtyPopup() {
    //Fungsi untuk tombol BATAL
    this.closePopup();
  }
}
