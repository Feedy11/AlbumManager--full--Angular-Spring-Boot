import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/components/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-verif-email',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './verif-email.component.html',
  styleUrl: './verif-email.component.css'
})
export class VerifEmailComponent implements OnInit {
  code: string = '';
  user: User = new User();
  err = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.regitredUser;
  }

  onValidateEmail() {
    if (!this.code || this.code.trim() === '') {
      this.toastr.warning('Veuillez entrer le code de vérification');
      return;
    }

    this.isLoading = true;
    this.err = '';

    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        this.toastr.success('Email vérifié avec succès !', 'Vérification réussie');
        this.authService.login(this.user).subscribe({
          next: (data) => {
            let jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.toastr.success('Connexion réussie', 'Bienvenue !');
            this.isLoading = false;
            this.router.navigate(['/']);
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
            console.error('Erreur de connexion:', err);

            if (err.error && err.error.errorCause === 'disabled') {
              this.toastr.error(
                'Votre compte est désactivé. Veuillez contacter l\'administrateur',
                'Compte désactivé'
              );
            } else if (err.status === 401) {
              this.toastr.error(
                'Nom d\'utilisateur ou mot de passe incorrect',
                'Erreur d\'authentification'
              );
            } else {
              this.toastr.error(
                'Une erreur s\'est produite lors de la connexion',
                'Erreur'
              );
            }
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        console.error('Erreur de validation:', err);

        if (err.status === 400) {
          this.err = err.error.message || 'Code de vérification invalide';
          this.toastr.error(this.err, 'Erreur de validation');
        } else if (err.status === 404) {
          this.err = 'Code de vérification introuvable ou expiré';
          this.toastr.error(this.err, 'Code invalide');
        } else {
          this.err = 'Une erreur s\'est produite lors de la vérification';
          this.toastr.error(this.err, 'Erreur');
        }
      }
    });
  }
}
