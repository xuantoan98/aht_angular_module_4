import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  remember: boolean = false;
  errorMessages: {[key: string]: string} = {
    email: '',
    password: '',
    general: ''
  };

  constructor(private readonly authService: AuthService) {}

  private isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  ngOnInit(): void {
    const rememberStored = localStorage.getItem('remember');

    if (rememberStored) {
      const storedUser = JSON.parse(rememberStored);
      this.email = storedUser['email'];
      this.password = storedUser['password'];
      this.remember = true;
    }
  }

  public onKeyUp(event: any): void {
    const inputValue = event.target.value;
    if (!this.isEmailValid(inputValue)) {
      this.errorMessages['email'] = 'Please enter a valid email address.';
    } else {
      this.errorMessages['email'] = '';
    }
  }

  public onLogin(): void {
    this.errorMessages['email'] = !this.email ? 'Please enter email.' : '';
    this.errorMessages['password'] = !this.password ? 'Please enter password.' : '';

    if (!this.email || !this.password) {
      return;
    }

    if (!this.isEmailValid(this.email)) {
      this.errorMessages['email'] = 'Please enter a valid email address.';
      return;
    }
    
    this.authService.login(this.email, this.password).subscribe(
      (success) => {
        if (!success) {
          this.errorMessages['general'] = 'Invalid email or password';
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.errorMessages['general'] = 'An error occurred during login';
      }
    )
  }

}
