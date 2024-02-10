import { Injectable } from '@angular/core';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Teman } from '../model/teman.model';

@Injectable({
  providedIn: 'root',
})
export class TemanService {
  private baseurl= "http://192.168.0.21:8080/api/teman";
  private selectedFriends: Teman[] = [];
  temanList: Teman[] = [];
  private axios: AxiosInstance;
  teman: any = {};
  // temanList: any[] = [];
  showPopup = false;
  kataKunciPencarian = '';
  filteredTemanList: any[] = [];
  isInputFocused = false;
  // selectedFriends: any[] = [];
  errorMessage: string = '';
  shakeError: boolean = false;
  // selectedFriendsToShow: any[] = [];
  currentImageIndex: number = 0;

  constructor() {
    this.axios = Axios.create({
      baseURL: 'http://192.168.0.21:8080/api/teman', // Update with your API base URL
    });
  }

  
  private selectedFriendsToShow: Teman[] = [];
  
  getTemanListFromBackend(): Observable<Teman[]> {
    return from(this.axios.get<Teman[]>(`${this.baseurl}`)).pipe(
      map(response => response.data)
    );
  }

  simpanTeman(teman: Teman): Observable<any> {
    return from(this.axios.post(`${this.baseurl}`, teman)).pipe(
      map(response => response.data)
    );
  }

  getFriendsByIds(id_users: number[]): Observable<Teman[]> {
    const params = new URLSearchParams({ id_user: id_users.join(',') });
    const url = `${this.baseurl}/multiple?${params.toString()}`;

    return from(this.axios.get<Teman[]>(url)).pipe(
      map(response => response.data)
    );
  }

  resetState(): void {
    this.selectedFriendsToShow = [];
  }

  setSelectedFriendsToShow(selectedFriendsToShow: Teman[]): void {
    this.selectedFriendsToShow = selectedFriendsToShow;
  }

  unselectFriendToShow(teman: any): void {
    const index = this.selectedFriendsToShow.findIndex(
      (friend) => friend === teman
    );
    if (index !== -1) {
      this.selectedFriendsToShow.splice(index, 1);
    }
  }

  getSelectedFriendsToShow(): Teman[] {
    return this.selectedFriendsToShow;
  }

  // Tambahkan metode untuk mengambil temanList
  getTemanList(): Teman[] {
    return this.temanList;
  }

  getTemanListByUserId(userId: number): Teman[] {
    return this.temanList.filter((friend) => friend.id_user === userId);
  }

  // Tambahkan metode untuk menyimpan temanList
  setTemanList(temanList: Teman[]): void {
    this.temanList = temanList;
  }

  getJumlahTeman(): number {
    return this.selectedFriendsToShow.length;
  }

  clearSelectedFriends(): Teman[] {
    return (this.selectedFriendsToShow = []);
  }

  getSelectedFriends(): Teman[] {
    return this.selectedFriends;
  }

  postTemanDataToSpringBoot(id_user: number, convertedMergedArray: any[]): Observable<any> {
    // Mengatur parameter permintaan (id_user)
    const params = new URLSearchParams({ id_user: id_user.toString() });

    return from(this.axios.post(`http://192.168.0.21:8080/api/item/multiple`, convertedMergedArray, { params })).pipe(
      map(response => response.data)
    );
  }

  postToWhatsappController(id_user: number): Observable<any> {
    return from(this.axios.post(`http://192.168.0.21:8080/api/send-whatsapp/${id_user}`)).pipe(
      map(response => response.data)
    );
  }

  refreshAllItems(): Observable<any> {
    return from(this.axios.post(`http://192.168.0.21:8080/api/item/refresh`)).pipe(
      map((response) => response.data)
    );
  }

  truncateTable(): Observable<any> {
    return from(this.axios.post(`http://192.168.0.21:8080/api/item/truncate-table`, {})).pipe(
      map(response => response.data)
    );
  }

  getRandomImage(): string {
    const jumlah_gambar = 4;
    const nomor_acak = this.currentImageIndex % jumlah_gambar + 1;
    const imagePath = `./assets/karakter/gambar_${nomor_acak}.svg`;
    this.currentImageIndex = (this.currentImageIndex + 1) % jumlah_gambar;
    return imagePath;
  } 
  
}


export const imageAnimation = trigger('imageAnimation', [
  state('initial', style({ transform: 'translateY(0)' })),
  state('up', style({ transform: 'translateX(10%)' })),
  transition('initial => up', animate('1.5s ease-out')),
  // transition('up => initial', animate('0.5s ease-out')),
]);

export const fadeOut = trigger('fadeOut', [
  state('initial', style({ opacity: 1 })),
  state('fadeOut', style({ opacity: 0 })),
  transition('initial => fadeOut', animate('0.5s')),
  transition('fadeOut => initial', animate('2s')),
]);

export const fadeIn = trigger('fadeIn', [
  state('initial', style({ opacity: 0 })),
  state('fadeIn', style({ opacity: 1 })),
  transition('initial => fadeIn', animate('1s')),
  transition('fadeIn => initial', animate('1.5s')),
]);