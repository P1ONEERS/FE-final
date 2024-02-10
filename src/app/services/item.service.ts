import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teman } from '../model/teman.model';
import { TemanService } from './teman.service';
import Axios,{ AxiosInstance } from 'axios';
import { from } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseUrl = "http://192.168.0.21:8080";
  private axios: AxiosInstance;
  private dataTemandanItem: { [id_user: number]: any[] } = {};

  constructor(private http: HttpClient) {
    this.axios = Axios.create({
      baseURL: this.baseUrl,
      timeout: 5000,
    });
  }

  tambahItem(item: { id_item: number; name: string; quantity: number; price: number }): Observable<any> {
    return from(this.axios.post('/calculateAndSaveTotals', item));
  }

  setSelectedItems(id_user: number, items: { id_item: number; name: string; quantity: number; price: number }[]): void {
    // Assuming dataTemandanItem is an object with keys as id_user and values as arrays of items
    this.dataTemandanItem[id_user] = items;
  }

  // Retrieve selected items for a specific user
  getSelectedItems(id_user: number): { id_item:number, name: string; quantity: number; price: number }[] | undefined {
    return this.dataTemandanItem[id_user];
  }

  getDataTemandanItem(id_user: number): any[] | undefined {
    return this.dataTemandanItem[id_user];
  }
  
  // add this method
  getAllDataTemandanItem(): { [id_user: number]: any[] } {
    return this.dataTemandanItem;
  }
  //tambahan naufal
  getItemByIds(id_items: number[]): Observable<Teman[]> { // Ubah nama metode dan parameter
    
    // Menggunakan HttpParams untuk menangani multiple id_item
    const params = new HttpParams().set('id_item', id_items.join(','));
    const url = `http://192.168.0.21:8080/api/item/multiple`;
    return this.http.get<Teman[]>(url, { params });
  }

  //
}