
// login.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { Login } from '../model/login.model';
import { Router } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://192.168.0.21:8080/api/auth';
  private currentUser: any;

  constructor(private router: Router, private userService: UserService) {}

  loginByHash(usernameOrEmail: string, mpin: string): Observable<Login> {
    const data = {
      usernameOrEmail: usernameOrEmail,
      mpin: mpin
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    return new Observable<Login>(observer => {
      axios.post<Login>(`${this.baseUrl}/login`, data, { headers: headers })
        .then(response => {
          // Save the token in localStorage
          const token = response.data.accessToken;
          localStorage.setItem('token', token);

          const id = response.data.id;
          localStorage.setItem('id', id);
          

          // const id_user = localStorage.setItem('id', response.data.id);
          // console.log('id_user:', id_user);
  


          const notificationEnabled = response.data.notificationEnabled.toString();
          localStorage.setItem('notificationEnabled', notificationEnabled);


          const userId = response.data.id.toString();
          localStorage.setItem('userId', userId);

          // Set user information in UserService
          this.userService.setUser(response.data);
          this.currentUser = response.data;


          observer.next(response.data);
          observer.complete();
          console.log('LoginService - Current User:', this.currentUser);
        })
        .catch(error => {
          observer.error(error);
          console.log(error.response.data);
          console.error('LoginService - Login error:', error.response?.data || error.message);
        });
    });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Return true if token exists
  }

  getUserInfo(): any | null {
    const token = localStorage.getItem('token');
    
    // Implement logic to verify token and get user information
    // Adjust this logic based on your token verification implementation

    return token; // Return null for now, you need to implement this logic
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token in localStorage:', token);
    } else {
      console.log('No token found in localStorage');
    }
  }

  

  getCurrentUser(): any {
    return this.currentUser;
  }



}

