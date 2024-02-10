import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [
    trigger('imageAnimation', [
      state('initial', style({ transform: 'translateY(0)' })),
      state('up', style({ transform: 'translateY(-100%)' })),
      transition('initial => up', animate('2s ease-out')),
      // transition('initial => animateBackground', animate('3s ease-out')), 
    ]),
    trigger('fadeOut', [
      state('initial', style({ opacity: 1 })),
      state('fadeOut', style({ opacity: 0 })),
      transition('initial => fadeOut', animate('1.5s')),
      transition('fadeOut => initial', animate('1.5s')),
    ]),
    trigger('fadeIn', [
      state('initial', style({ opacity: 0 })),
      state('fadeIn', style({ opacity: 1 })),
      transition('initial => fadeIn', animate('3s')),
      transition('fadeIn => initial', animate('3s')),
    ])
  ],
})

export class LandingComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {}

  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'initial';

  ngOnInit() {
    // You can keep ngOnInit empty or add any other initialization logic here
  }

  ngAfterViewInit() {
    this.toggleImageAnimation();
  }

  toggleImageAnimation() {
    setTimeout(() => {
      this.animationState = 'up';
      this.fadeOutState = 'fadeOut';
      this.fadeInState = 'fadeIn';
  
      // Navigasi ke halaman /login setelah animasi selesai
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000); // Sesuaikan dengan durasi animasi
    }, 1000);
  }
}  