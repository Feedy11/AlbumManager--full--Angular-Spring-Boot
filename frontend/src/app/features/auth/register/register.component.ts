import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/components/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  public user = new User();
  myForm!: FormGroup;
  err: string = '';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  onRegister() {
    if (this.myForm.invalid) {
      Object.keys(this.myForm.controls).forEach(key => {
        this.myForm.get(key)?.markAsTouched();
      });
      this.toastr.warning('Veuillez remplir correctement tous les champs', 'Formulaire invalide');
      return;
    }

    if (this.myForm.hasError('passwordMismatch')) {
      this.err = "Les mots de passe ne correspondent pas";
      this.toastr.error(this.err, 'Erreur de validation');
      return;
    }

    this.loading = true;
    this.err = '';
    this.user.username = this.myForm.get('username')?.value;
    this.user.email = this.myForm.get('email')?.value;
    this.user.password = this.myForm.get('password')?.value;

    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        this.loading = false;
        this.authService.setRegistredUser(this.user);
        this.toastr.success(
          'Un email de confirmation vous a été envoyé',
          'Inscription réussie !',
          { timeOut: 5000 }
        );
        this.router.navigate(['/verifEmail']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        console.error('Erreur d\'inscription:', err);

        if (err.status === 400) {
          this.err = err.error.message || 'Données invalides';
          this.toastr.error(this.err, 'Erreur d\'inscription');
        } else if (err.status === 409) {
          this.err = 'Cet email ou nom d\'utilisateur est déjà utilisé';
          this.toastr.error(this.err, 'Compte existant');
        } else if (err.status === 500) {
          this.err = 'Erreur serveur. Veuillez réessayer plus tard';
          this.toastr.error(this.err, 'Erreur serveur');
        } else {
          this.err = 'Une erreur est survenue lors de l\'inscription';
          this.toastr.error(this.err, 'Erreur');
        }
      }
    });
  }

  togglePassword(inputId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement | null;
    if (!input) return;

    const button = input.nextElementSibling as HTMLElement | null;
    if (!button) return;

    const icon = button.querySelector('i') as HTMLElement | null;
    if (!icon) return;

    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('bi-eye');
      icon.classList.add('bi-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('bi-eye-slash');
      icon.classList.add('bi-eye');
    }
  }
  isFieldInvalid(fieldName: string): boolean {
    const field = this.myForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.myForm.get(fieldName);
    if (!field) return '';

    if (field.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (field.hasError('email')) {
      return 'Email invalide';
    }
    if (field.hasError('minlength')) {
      const minLength = field.getError('minlength').requiredLength;
      return `Minimum ${minLength} caractères requis`;
    }
    return '';
  }
}
