import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-buktibayar',
  templateUrl: './buktibayar.component.html',
  styleUrls: ['./buktibayar.component.scss'],
})
export class BuktibayarComponent implements OnInit {
  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'hidden'; // Change initial state to 'hidden'
  animationCompleted = false;
  isBillAktif: boolean = true;
  idpel: string = '';
  latestPaidBill: any;;
  logoPaths: string[] = [
    './assets/bni.svg',
    './assets/bni.svg',
    './assets/bni.svg',
    './assets/bni.svg',
    './assets/bni.svg'
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID tidak ditemukan di localStorage');
      return;
    }

    // Mengirim permintaan GET ke backend menggunakan Axios
    axios.get(`http://192.168.0.21:8080/api/bills/latest-paid-bills/${userId}/single`)
      .then(response => {
        // Tanggapan sukses dari backend
        this.latestPaidBill = response.data;
        console.log('Latest paid bill:', this.latestPaidBill);
      })
      .catch(error => {
        // Tanggapan error dari backend
        console.error('Failed to fetch latest paid bill:', error.response.data);
      });
  
  }


  toggleImageAnimation() {
    this.animationState = this.animationState === 'initial' ? 'up' : 'initial';
    this.fadeOutState = this.fadeOutState === 'initial' ? 'fadeOut' : 'initial';
    this.fadeInState = this.fadeInState === 'hidden' ? 'fadeIn' : 'hidden';
  }

  animationDone() {
    this.animationCompleted = true;
  }
  getCurrentDateTime(): Date {
    return new Date();
  }

  generateRandomReference(): string {
    const length = 15; // Adjust the length of the reference number as needed
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }
}