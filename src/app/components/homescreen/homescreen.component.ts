import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { imageAnimation, fadeIn, fadeOut } from 'src/app/services/teman.service';
import { CurrencyPipe } from '@angular/common';
import { ThousandSeparatorPipe } from './thousand-separator.pipe';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss'],
  animations: [imageAnimation, fadeOut, fadeIn],
  providers: [CurrencyPipe, ThousandSeparatorPipe]
})

export class HomescreenComponent {
  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'initial';
  animationCompleted = false;

  constructor(
    private router: Router,
    public loginService: LoginService, 
    private cdr: ChangeDetectorRef,
    private currencyPipe: CurrencyPipe,
    private thousandSeparatorPipe: ThousandSeparatorPipe 
    ) {
    this.currentUser = this.loginService.getCurrentUser();
  }
  showSaldo: boolean = false;
  name: string = '';
  balance: number = 0;
  accountType: string = '';
  accountNumber: string = '';
  currentUser: any;
  balanceFormatted: string = ''; 
  balanceFormattedWithSeparator: string = ''; 

  toggleSaldo() {
    this.showSaldo = !this.showSaldo;
  }

  ngOnInit() {
    const storedUserString = localStorage.getItem('currentUser');
    console.log(storedUserString);

    if (storedUserString) {
      // Parse the stored JSON string to get the user object
      this.currentUser = JSON.parse(storedUserString);

      this.name = this.currentUser.name || 'N/A';
      this.balance = this.currentUser.balance || 0;
      
      // Format balance as currency
      this.balanceFormatted = this.currencyPipe.transform(this.balance, 'Rp ') || 'Rp 0';
      
      // Format balance with thousand separators
      this.balanceFormattedWithSeparator = this.thousandSeparatorPipe.transform(this.balanceFormatted);
      
      this.accountType = this.currentUser.accountType || 'N/A';
      
      this.accountNumber = this.currentUser.accountNumber || 'N/A';
      
      // Trigger change detection after updating data
      this.cdr.detectChanges();
    }
  }
  
  ngAfterViewInit() {
    this.toggleImageAnimation();
  }
  
  toggleImageAnimation() {
    this.animationState = (this.animationState === 'initial') ? 'up' : 'initial';
    this.fadeOutState = (this.fadeOutState === 'initial') ? 'fadeOut' : 'initial';
    this.fadeInState = (this.fadeInState === 'initial') ? 'fadeIn' : 'initial';
    
  }
  animationDone() {
    this.animationCompleted = true;
  }
}