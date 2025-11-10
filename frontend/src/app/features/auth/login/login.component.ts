import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/components/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = new User();
  erreur = 0;

  constructor(private authService: AuthService, private router: Router) {}

  onLoggedin() {
    console.log('Utilisateur saisi:', this.user);

    const isValidUser = this.authService.SignIn(this.user);

    if (isValidUser) {
      this.erreur = 0;
      this.router.navigate(['/']);
    } else {
      this.erreur = 1;
    }
  }
}
