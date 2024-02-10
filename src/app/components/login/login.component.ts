import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('imageAnimation', [
      state('initial', style({ transform: 'translateY(0)' })),
      state('up', style({ transform: 'translateY(-100%)' })),
      transition('initial => up', animate('7s ease-out')),
      // transition('initial => animateBackground', animate('3s ease-out')), 
    ]),
    trigger('fadeOut', [
      state('initial', style({ opacity: 1 })),
      state('fadeOut', style({ opacity: 0 })),
      transition('initial => fadeOut', animate('2s')),
      transition('fadeOut => initial', animate('2s')),
    ]),
    trigger('fadeIn', [
      state('initial', style({ opacity: 0 })),
      state('fadeIn', style({ opacity: 1 })),
      transition('initial => fadeIn', animate('0.5s')),
      transition('fadeIn => initial', animate('0.5s')),
    ])
  ],
  providers: [LoginService]
})

export class LoginComponent implements OnInit, AfterViewInit {
  
  animationState = 'initial';
  fadeOutState = 'initial';
  fadeInState = 'initial';

  username: string = '';
  mpin: string = '';
  loggedIn: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    // You can keep ngOnInit empty or add any other initialization logic here
  }

  ngAfterViewInit() {
    this.toggleImageAnimation();
  }

  toggleImageAnimation() {
      this.animationState = 'up';  // Ganti 'final' dengan nama status animasi yang sesuai
      this.fadeOutState = 'fadeOut';   // Ganti 'final' dengan nama status animasi yang sesuai
      this.fadeInState = 'fadeIn';
  }

  submitLogin() {
    // Make a POST request to your Spring Boot backend
    this.loginService.loginByHash(this.username, this.mpin).subscribe(
      (response) => {
        // Store the token in the localStorage
        console.log("respons",response);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/home']);
      },
      (error) => {
        // Handle error
        console.log(error);
      }
    );
  }
  

  onSubmit(): void {
    if (this.isFormEmpty()) {
      alert('Please fill in all the required fields');
    } else {
      this.submitLogin();
    }
  }

  isFormEmpty(): boolean {
    return !this.username.trim() || !this.mpin.trim();
  }
}