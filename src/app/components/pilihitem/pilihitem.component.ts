// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Teman } from 'src/app/model/teman.model';
// import { TemanService } from 'src/app/services/teman.service';
// import { DataService } from '../../services/data.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ItemService } from 'src/app/services/item.service';

// @Component({
//   selector: 'app-pilihitem',
//   templateUrl: './pilihitem.component.html',
//   styleUrls: ['./pilihitem.component.scss'],
//   providers: [DataService, ItemService],


//   styles: [
//     `
//       .adjustqty-popup {
//         /* Styling for the adjustqty pop-up */
//         width: 300px;
//         height: 200px;
//         background-color: #fff;
//         border: 1px solid #ccc;
//         position: fixed;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//       }
//     `,
//   ],

// })
// export class PilihitemComponent implements OnInit {
//   owner: [] = []
//   selectedFriends: Teman[] = [];
//   data: { id: number, name: string; quantity: number; price: number }[] = [];
//   idItem: string = '';
//   submitted: boolean = false;
//   yourImageSrc: string = './assets/owner.svg';
//   isYourImageClicked: boolean = false;
//   isfriendImageClicked: { [id: number]: boolean }  = {}; // atau { [key: string]: boolean } 

//   yourSelectedItems: {
//     id: number;
//     name: string;
//     quantity: number;
//     price: number;
//   }[] = [];
//   temanSelectedItems: {
//     id: number;
//     name: string;
//     quantity: number;
//     price: number;
//   }[] = [];
//   ownerSelectedItems: { name: string; quantity: number; price: number }[] =

//     [];
//   ownerSelectedItem: {
//     name: string;
//     quantity: number;
//     price: number;
//   } | null = null;


//   userSelectedItems: {
//     [id_user: string]:  {id_item:number, name: string; quantity: number; price: number }[]
//   } = {};

//   userSelectedItem: {
//     [id_user: string]: {
//       name: string;
//       quantity: number;
//       price: number;
//     } | null;
//   } = {};
//   selectedFriendsInfo: { [id_user: number]: Teman } = {};
//   clickedItem: string = '';
//   id_user: number = 0;
//   // temanListByUserId : Teman[] = [];

//   temanListByUserId: Teman[] = [];
//   showAdjustqty = false;

//   qtyhasilscan: number[] = [];
//   selectedItemForAdjustment: any;

//   count: number = 1;
//   lastCount: number = 1;
//   showLastCount: boolean = false;
//   initialCount: number = 1;

//   imagePaths: string[] = [
//     '../../../assets/karakter/gambar_4.svg',
//     '../../../assets/karakter/gambar_2.svg',
//     '../../../assets/karakter/gambar_2.svg',
//     '../../../assets/karakter/gambar_3.svg',
//     '../../../assets/karakter/gambar_1.svg',
//     '../../../assets/karakter/gambar_2.svg',
//   ];

//   constructor(
//     private temanService: TemanService,
//     private dataService: DataService,
//     private route: ActivatedRoute,
//     private router: Router,
//     private itemService: ItemService,
//   ) {}

//   ngOnInit(): void {
//     this.selectedFriends = this.temanService.getSelectedFriendsToShow();
//     // this.itemService.getOwnerSelectedItems()
//     // this.temanService.resetState()
//     this.data = this.dataService.getData();
//     this.route.params.subscribe((params) => {
//       this.idItem = params['idItem'] || '';
//     });
  
//     // Set a unique user identifier, or get it from somewhere else
  
//     // or, if you want to use a unique identifier from the first friend in the list
//     if (this.selectedFriends.length > 0) {
//       this.id_user = this.selectedFriends[0].id_user;
//     } else {
//       console.error('No selected friends available.');
//     }
  
//     // Initialize userSelectedItems for each friend
//     this.selectedFriends.forEach((friend) => {
//       friend.userSelectedItems = { [friend.id_user]: [] };
//     });
  
//     // Get temanList filtered by id_user
//     // this.temanListByUserId = this.temanService.getTemanListByUserId(this.id_user);
//     // console.log("temanListByUserId", this.temanListByUserId);
  
//     console.log("teman", this.selectedFriends);
//     // Get temanList filtered by userId

//     this.temanListByUserId = this.temanService.getTemanListByUserId(
//       this.id_user
//     );
//     console.log('temanListByUserId', this.temanListByUserId);

//     console.log('teman', this.selectedFriends);
//     this.dataService.initializeQtyhasilscan();
//     this.qtyhasilscan = this.dataService.getQtyhasilscan();
//     // console.log(this.qtyhasilscan);

//   }
  
//   back(){
//     this.selectedFriends = this.temanService.clearSelectedFriends()
//   }

//   ngOnDestroy() {

//     // this.selectedFriends = this.temanService.clearSelectedFriends()
//     this.temanListByUserId = []

//   }

//   navigateToAdjustQty(name: string): void {
//     this.router.navigate(['/adjustqty', { idItem: name }]);
//   }

//   toggleYourImageClick() {
//     this.isYourImageClicked = !this.isYourImageClicked;

//     console.log('KLIK ANDA');
   


//     if (this.isYourImageClicked) {
//       // Jika gambar pemilik diklik, pilih item yang diceklis
//       this.ownerSelectedItems = this.data.filter((item) =>
//         this.ownerSelectedItems.some(
//           (selectedItem) => selectedItem.name === item.name
//         )
//       );
//     } else {
//       // Jika gambar pemilik tidak diklik, deseleksi item yang tidak diceklis
//       // this.ownerSelectedItems = [];
//     }
//     console.log('YOUR SELECTED ITEMS', this.yourSelectedItems);
//   }


//   toggleFriendImageClick(id: number) {
//     this.isfriendImageClicked[id] = !this.isfriendImageClicked[id];
//     console.log('KLIK FRIEND');
//     //cara akses userId
//     console.log('ini userid:  ',this.selectedFriends[id].id_user)

//     const selectedFriend = this.selectedFriends[id];

//     if (selectedFriend) {
//       if (this.isfriendImageClicked[id]) {
//         // If friend's image is clicked, update userSelectedItems for the specific user (userId)
//         this.userSelectedItems[selectedFriend.id_user] = this.data.filter(
//           (item) =>
//             this.userSelectedItems[selectedFriend.id_user]?.some(
//               (selectedItem) => selectedItem.name === item.name
//             )
//         );
//       } else {
//         // If friend's image is unclicked, remove userSelectedItems for the specific user (userId)
//         delete this.userSelectedItems[selectedFriend.id_user];
//       }
//     }

//     console.log('FRIEND', selectedFriend);
//     console.log('TEMAN[id] SELECTED ITEMS', this.temanSelectedItems);
//   }

//   toggleAndaItemSelection(item: {
//     id: number;
//     name: string;
//     quantity: number;
//     price: number;
//   }): void {
//     if (this.isYourImageClicked) {
//       const name = item.name;
//       const selectedItemAndaIndex = this.yourSelectedItems.findIndex(
//         (selectedItem) => selectedItem.name === name
//       );

//       if (selectedItemAndaIndex !== -1) {
//         this.yourSelectedItems.splice(selectedItemAndaIndex, 1);
//       } else {
//         const selectedItem = this.data.find(
//           (dataItem) => dataItem.name === name
//         );
//         if (selectedItem) {
//           this.yourSelectedItems.push({
//             id: selectedItem.id,
//             name: selectedItem.name,
//             quantity: selectedItem.quantity,
//             price: selectedItem.price,
//           });
//         }
//       }

//       // Update ownerSelectedItems for the owner
//       if (this.isYourImageClicked) {
//         this.ownerSelectedItems = this.data.filter((dataItem) =>
//           this.yourSelectedItems.some(
//             (selectedItem) => selectedItem.name === dataItem.name
//           )
//         );
//       } else if (this.isfriendImageClicked) {
//         // Update userSelectedItems for each friend
//         this.selectedFriends.forEach((friend) => {

//           if (friend.id_user && this.userSelectedItems[friend.id_user]) {
//             this.userSelectedItems[friend.id_user] = this.temanSelectedItems;
//           }
//         });
//       }
//     }

//     console.log('PUNYA ANDA', this.ownerSelectedItems);
//     console.log('PUNYA TEMAN', this.userSelectedItems);
//   }

//   // toggleTemanItemSelection(item: {
//   //   id: number;
//   //   name: string;
//   //   quantity: number;
//   //   price: number;
//   // }): void {
//   //   if (this.isfriendImageClicked) {
//   //     const name = item.name;
//   //     const selectedItemTemanIndex = this.temanSelectedItems.findIndex(
//   //       (selectedItem) => selectedItem.name === name
//   //     );

//   //     if (selectedItemTemanIndex !== -1) {
//   //       this.temanSelectedItems.splice(selectedItemTemanIndex, 1);
//   //     } else {
//   //       const selectedItemTeman = this.data.find(
//   //         (dataItem) => dataItem.name === name
//   //       );
//   //       if (selectedItemTeman) {
//   //         this.temanSelectedItems.push({
//   //           id: selectedItemTeman.id,
//   //           name: selectedItemTeman.name,
//   //           quantity: selectedItemTeman.quantity,
//   //           price: selectedItemTeman.price,
//   //         });
//   //       }
//   //     }

//   //     // Update user SelectedItems for the user
//   //     if (this.isYourImageClicked) {
//   //       this.ownerSelectedItems = this.data.filter((dataItem) =>
//   //         this.temanSelectedItems.some(
//   //           (selectedItem) => selectedItem.name === dataItem.name
//   //         )
//   //       );
//   //     } else if (this.isfriendImageClicked) {
//   //       // Update userSelectedItems for each friend
//   //       this.selectedFriends.forEach((friend) => {
//   //         if (friend.id_user && this.userSelectedItems[friend.id_user]) {
//   //           this.userSelectedItems[friend.id_user] = this.temanSelectedItems;
//   //         }
//   //       });
//   //     }
//   //   }

//   //   console.log('PUNYA ANDA', this.ownerSelectedItems);
//   //   console.log('PUNYA TEMAN', this.userSelectedItems);

//   // }
  

//   // isItemSelected(name: string): boolean {
//   //   return (
//   //     this.isYourImageClicked &&
//   //     this.yourSelectedItems.some((item) => item.name === name)
//   //   );
//   // }

//   toggleItemSelectionForOwner(item: {
//     id: number,
//     name: string;
//     quantity: number;
//     price: number;
//   }): void {
//     if (this.isfriendImageClicked) {
//       // Toggle the selection of the item for the active user
//       const selectedItemIndex = this.ownerSelectedItems.findIndex(
//         (selectedItem) => selectedItem.name === item.name
//       );
  
//       if (selectedItemIndex !== -1) {
//         // If the item is already selected, remove it from the list
//         this.ownerSelectedItems.splice(selectedItemIndex, 1);
//       } else {
//         // If the item is not selected, add it to the list and set it as the ownerSelectedItem
//         const selectedItem = this.data.find(
//           (dataItem) => dataItem.name === item.name
//         );
//         if (selectedItem) {
//           this.ownerSelectedItems.push({ ...selectedItem });
//         }
//       }
  
//       // Update userSelectedItems for the owner
//       // if (this.id_user && this.selectedFriendsInfo[this.id_user]) {
//       //   this.selectedFriendsInfo[this.id_user].userSelectedItems[this.id_user] = this.ownerSelectedItems;
//       // }
//     }
//   }

//   isItemSelectedForOwner(name: string): boolean {
//     return (
//       this.isYourImageClicked &&
//       this.ownerSelectedItems.some((item) => item.name === name)
//     );
//   }
  


//   toggleItemSelectionForUser(item: {
//   name: string;
//   quantity: number;
//   price: number;
// }): void {
//   if (this.isYourImageClicked || this.isfriendImageClicked) {
//     const name = item.name;
//     const selectedItemIndex = this.yourSelectedItems.findIndex(
//       (selectedItem) => selectedItem.name === name
//     );

//     if (selectedItemIndex !== -1) {
//       this.yourSelectedItems.splice(selectedItemIndex, 1);
//     } else {
//       const selectedItem = this.data.find(
//         (dataItem) => dataItem.name === name
//       );
//       if (selectedItem) {
//         this.yourSelectedItems.push({ ...selectedItem });
//       }
//     }

//     // Setelah mengubah yourSelectedItems, perbarui juga ownerSelectedItems jika isYourImageClicked true
//     if (this.isYourImageClicked) {
//       this.ownerSelectedItems = this.data.filter(item =>
//         this.yourSelectedItems.some(selectedItem => selectedItem.name === item.name)
//       );
//     } else if (this.isfriendImageClicked) {
//       // Update userSelectedItems for the specific user (id_user)
//       this.selectedFriends.forEach((friend) => {
//         if (friend.id_user && this.userSelectedItems[friend.id_user]) {
//           this.userSelectedItems[friend.id_user] = this.yourSelectedItems;
//         }
//       });
//       }
//     }
//     // this.itemService.setSelectedItems(this.id_user.toString(), this.yourSelectedItems);

//   console.log("PUNYA ANDA", this.ownerSelectedItems);
//   console.log("PUNYA TEMAN", this.userSelectedItems);
// }


//   isItemSelectedForUser(id_user: number, name: string): boolean {
//     return (
//       this.isfriendImageClicked && // Pastikan isfriendImageClicked sudah diinisialisasi
//       // this.isfriendImageClicked[id_user] && // Pastikan isfriendImageClicked[id_user] terdefinisi
//       // this.userSelectedItems && // Pastikan userSelectedItems terdefinisi
//       this.userSelectedItems[id_user] && // Pastikan userSelectedItems[id_user] terdefinisi
//       this.userSelectedItems[id_user]?.some((item) => item.name === name)
//     );
//   }
  
//   isItemClickedForUser(item: {
//     name: string;
//     quantity: number;
//     price: number;
//   }): boolean {
//     return this.clickedItem === item.name;
//   }

//   // isItemClicked(item: {
//   //   name: string;
//   //   quantity: number;
//   //   price: number;
//   // }): boolean {
//   //   return this.clickedItem === item.name;
//   // }

//   onConfirmButtonClicked() {
//     this.submitted = true; // Set submitted to true when the form is submitted

//     if (this.idItem) {
//       // Perform actions when both idpel and password are present
//       this.router.navigate(['/adjustqty', { idItem: this.idItem }]);
//     } else {
//       // Handle the case when either idpel or password is missing
//       console.log('Please fill in both IDPEL and Password.');
//     }
//   }

//   updateSelectedFriends(): void {
//     // Update selectedFriends based on the latest data from TemanService
//     this.selectedFriends = this.temanService.getSelectedFriendsToShow();
//   }


//   togglePopupAdjustQty(item: any) {
//     this.selectedItemForAdjustment = item;
//     this.showAdjustqty = !this.showAdjustqty;

//   }

//   increment() {
//     this.count++;
//   }

//   decrement() {
//     if (this.count > 1) {
//       this.count--;
//     }
//   }

//   save() {
//     this.lastCount = this.count;
//     this.showLastCount = true;
//     this.dataService.setCount(
//       this.selectedItemForAdjustment.id,
//       this.lastCount
//     );
//     console.log(this.lastCount);
//   }

//   close() {
//     this.showLastCount = false;
//     this.count = this.dataService.getCount(this.selectedItemForAdjustment.id);
//   }

//   saveQuantityAdjustment() {
//     // Find the item by name in the corresponding array
//     const findItemByItemName = (items: any[], name: string) => {
//       return items.find((item) => item.name === name);
//     };

//     // Update the quantity in ownerSelectedItem or userSelectedItems based on the adjustment
//     if (this.isYourImageClicked) {
//       const ownerSelectedItem = findItemByItemName(
//         this.ownerSelectedItems,
//         this.selectedItemForAdjustment.name
//       );
//       if (ownerSelectedItem) {
//         ownerSelectedItem.quantity = this.count;
  
//         // Update the quantity in the DataService

//         this.dataService.updateData(ownerSelectedItem.id, {
//           id: ownerSelectedItem.id,
//           name: ownerSelectedItem.name,
//           quantity: this.count,
//           price: ownerSelectedItem.price
//         });
  
//         if (!this.showLastCount) {
//           this.count = this.initialCount;
//           this.dataService.setCount(this.selectedItemForAdjustment.id, this.initialCount);

//         }
//       }
//     } else if (this.isfriendImageClicked) {
//       if (this.id_user && this.userSelectedItems[this.id_user]) {
//         const selectedItem = findItemByItemName(
//           this.userSelectedItems[this.id_user],
//           this.selectedItemForAdjustment.name
//         );
//         if (selectedItem) {
//           selectedItem.quantity = this.count;
  
//           // Update the quantity in the DataService

//           this.dataService.updateData(selectedItem.id, {
//             id: selectedItem.id,
//             name: selectedItem.name,
//             quantity: this.count,
//             price: selectedItem.price
//           });

//         }
//       }
//     }

//     // Close the Adjust Quantity popup
//     this.togglePopupAdjustQty(null);
//   }

//   closebill() {
//     this.showAdjustqty = false; // Menutup popup adjustqty
//     this.count = this.lastCount; // Mengembalikan nilai count ke nilai terakhir yang disimpan
//   }


//   closeAdjustQtyPopup() {
//     this.showAdjustqty = false;
//     // If you want to discard changes and reset the count to the initial value
//     this.count = this.initialCount;
//     // If you want to discard changes and reset the count to the last saved value
//     // this.count = this.lastCount;
//   }

// }
