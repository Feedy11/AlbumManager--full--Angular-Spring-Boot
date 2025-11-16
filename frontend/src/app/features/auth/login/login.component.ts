import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
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

  this.authService.login(this.user).subscribe({
    next: (data) => {
      let jwToken = data.headers.get('Authorization')!;
      this.authService.saveToken(jwToken);
      this.router.navigate(['/']);
    },
    error: (err: any) => {
      this.erreur = 1;
    }
  });
}
}
