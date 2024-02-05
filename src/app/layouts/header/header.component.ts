import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  name: string | null = null;
  public isLoggedIn$: Observable<boolean> = new Observable<boolean>;

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.isLoggedIn$.subscribe((isLogged) => {
      if (isLogged) {
        this.authService.getName().subscribe((userName) => {
          this.name = userName;
        });
      }
    });
  }

  public logout(): void {
    this.authService.logout();
  }

  public isAdmin(): boolean {
    return false;
  }
}
