// selected-friends.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http'; // Tambahkan HttpParams
import { Teman } from '../model/teman.model';

@Injectable({
  providedIn: 'root'
})
export class SelectedFriendsService {
  private selectedFriendsSubject = new BehaviorSubject<Teman[]>([]);
  selectedFriends$ = this.selectedFriendsSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedFriends = sessionStorage.getItem('selectedFriends');
    if (storedFriends) {
      this.selectedFriendsSubject.next(JSON.parse(storedFriends));
    }
  }

  getSelectedFriends(): Teman[] {
    return this.selectedFriendsSubject.value;
  }

  setSelectedFriends(selectedFriends: Teman[]): void {
    this.selectedFriendsSubject.next(selectedFriends);
    sessionStorage.setItem('selectedFriends', JSON.stringify(selectedFriends));
  }

  clearSelectedFriends(): void {
    // Clear selected friends and remove from session storage
    this.selectedFriendsSubject.next([]);
    sessionStorage.removeItem('selectedFriends');
  }


  getFriendsByIds(id_users: number[]): Observable<Teman[]> { // Ubah nama metode dan parameter
    
    // Menggunakan HttpParams untuk menangani multiple id_user
    const params = new HttpParams().set('id_user', id_users.join(','));
    const url = `http://192.168.0.21:8080/api/teman/multiple`;
    
    return this.http.get<Teman[]>(url, { params });
  }

  // Metode ini untuk mendapatkan satu teman berdasarkan ID
  getFriendById(id_user: number): Observable<Teman> {
    const url = `http://192.168.0.21:8080/api/teman/${id_user}`;
    return this.http.get<Teman>(url);
  }
}
