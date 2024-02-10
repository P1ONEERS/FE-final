import { Injectable } from '@angular/core';
import { Teman } from 'src/app/model/teman.model';
import { ActiveBill } from '../model/activeBill.model';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  // public activeBill: Teman[] = [];
  // public history: Teman[] = [];

  // constructor() {}

  // getActiveBill(): Teman[] {
  //   return this.activeBill;
  // }

  // getHistory(): Teman[] {
  //   return this.history;
  // }

  // setActiveBillData(data: Teman[]) {
  //   this.activeBill = data;
  // }

  // moveActiveBillToHistory() {
  //   this.history.push(...this.activeBill);
  //   this.activeBill = [];
  // }

  // clearActiveBillData() {
  //   // Fungsi ini akan mengosongkan data di activeBill
  //   this.activeBill = [];
  // }

  public activeBill: ActiveBill[] = [];
  public history: ActiveBill[] = [];

  constructor() {}

  getActiveBill(): ActiveBill[] {
    return this.activeBill;
  }

  getHistory(): ActiveBill[] {
    console.log('history' + this.history);
    return this.history;
  }

  addNewBill(billData: ActiveBill) {
    // Tambahkan sharing bill baru ke dalam activeBill
    this.activeBill.push(billData);
    console.log('ini bill data baru' + billData);
  }

  moveActiveBillToHistory(index: number) {
    // this.history.push(this.activeBill[index]);
    // this.activeBill.splice(index, 1);
    const movedBill = this.activeBill[index];

    // Tambahkan objek tersebut ke dalam history
    this.history.push(movedBill);

    // Hapus objek dari activeBill berdasarkan index
    this.activeBill.splice(index, 1);
  }

  clearActiveBillData() {
    // Fungsi ini akan mengosongkan data di activeBill
    this.activeBill = [];
  }
}
