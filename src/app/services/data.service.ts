// data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  tempat = 'IKKUDO ICHI - Central Park';
  tanggal = '13/01/2024';
  jam = ' 17:07 WIB';
  private data = [
    { id_item: 1, name: 'Tori Karaage Curry', quantity: 1, price: 58000 },
    { id_item: 2, name: 'Tori Katsu Oyakodon', quantity: 12, price: 75000 },
    { id_item: 3, name: 'Tori Miso ( S )', quantity: 1, price: 53000 },
    { id_item: 4, name: 'Tori Karaagemen ( S )', quantity: 4, price: 53000 },
    { id_item: 5, name: 'Yaki Tori Gyoza', quantity: 1, price: 39000 },
    { id_item: 6, name: 'Yaki Tori Ebi Iri Gyoza', quantity: 1, price: 39000 },
    { id_item: 7, name: 'Ice ocha', quantity: 2, price: 14000 },
    { id_item: 8, name: 'Sweet ice tea', quantity: 1, price: 15000 },
  ];

  subTotal: number = 0;
  pajak: number = 0;
  biayaLayanan: number = 0;
  diskon: number = 0;
  total: number = 0;
  jumlahMenu: number = 0;
  private lastCounts: { [id_item: number]: number } = {};

  private qtyhasilscan: number[] = [];

  private counts: { [id_item: string]: number } = {};

  private dataTemandanItemSubject = new BehaviorSubject<any>({});
  dataTemandanItem$ = this.dataTemandanItemSubject.asObservable();

  calculateSubTotal(): number {
    return this.data.reduce((total, item) => total + item.price, 0);
  }

  calculatePajak(): number {
    const subTotal = this.calculateSubTotal(); // atau cara lain untuk mendapatkan nilai subTotal
    return subTotal * 0.1; // 10% dari Sub Total
  }

  calculateBiayaLayanan(): number {
    const subTotal = this.calculateSubTotal();
    const biayaLayanan = subTotal * 0.07; // 7% dari Sub Total
    return +biayaLayanan.toFixed(2);
  }

  calculateDiskon(): number {
    // Logika diskon sesuai kebutuhan aplikasi
    return this.diskon;
  }

  calculateTotal(): number {
    const subTotal = this.calculateSubTotal();
    const pajak = this.calculatePajak();
    const biayaLayanan = this.calculateBiayaLayanan();
    const diskon = this.calculateDiskon();

    // Hitung total keseluruhan
    const total = subTotal + pajak + biayaLayanan - diskon;

    return total;
  }

  calculateJumlahMenu(): number {
    return this.data.length; // Atau implementasikan logika sesuai kebutuhan
  }

  public rekening: { id_item: number; norek: string }[] = [
    { id_item: 1, norek: '1234 5678 90' },
    { id_item: 2, norek: '0987 6543 21' },
  ];

  public favorites: { idpel: string; name: string }[] = [
    { idpel: '461534856813', name: 'Ujang' },
    { idpel: '984651645885', name: 'Badu' },
  ];

  public selectedRekening: string = '';

  setSelectedRekening(value: string): void {
    this.selectedRekening = value;
  }

  getSelectedRekening(): string {
    return this.selectedRekening;
  }

  addToFavorites(newFavorite: { idpel: string; name: string }): void {
    this.favorites.push(newFavorite);
  }

  getFavorites(): { idpel: string; name: string }[] {
    return this.favorites;
  }

  getCount(id_item: string): number {
    return this.counts[id_item] || 1;
  }

  setCount(id_item: string, count: number): void {
    this.counts[id_item] = count;
  }

  getData() {
    return this.data;
  }

  private dataSubject = new BehaviorSubject<
    { name: string; quantity: number; price: number }[]
  >(this.data);
  data$ = this.dataSubject.asObservable();

  updateData(
    id_item: number,
    newData: { id_item: number; name: string; quantity: number; price: number }
  ) {
    const index = this.data.findIndex((item) => item.id_item === id_item);
    if (index !== -1) {
      this.data[index] = newData;
      this.dataSubject.next([...this.data]);
    } else {
      console.error('Invalid index for updateData');
    }
  }

  updateItemQuantity(id_item: number, quantity: number): void {
    const itemIndex = this.data.findIndex((item) => item.id_item === id_item);

    if (itemIndex !== -1) {
      this.data[itemIndex].quantity = quantity;
    }
  }
  // Fungsi untuk menginisialisasi qtyhasilscan berdasarkan data yang ada
  initializeQtyhasilscan(): void {
    this.qtyhasilscan = this.data.map((item) => item.quantity);
  }

  // Fungsi untuk mendapatkan qtyhasilscan
  getQtyhasilscan(): number[] {
    return this.qtyhasilscan;
  }

  getItemInitialQuantity(name: string): number {
    const item = this.data.find((item) => item.name === name);
    return item ? item.quantity : 0;
  }
  setDataTemandanItem(data: any) {
    this.dataTemandanItemSubject.next(data);
  }
}