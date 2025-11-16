import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/services/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideToastr({
      // 🎯 Position
      positionClass: 'toast-top-right',

      // ⏱️ Durée
      timeOut: 4000,
      extendedTimeOut: 1000,

      // 🎨 Animations
      easeTime: 300, // Durée de l'animation (ms)
      progressBar: true, // Barre de progression
      progressAnimation: 'decreasing', // Animation de la barre: 'decreasing' ou 'increasing'

      // 🔔 Comportement
      closeButton: true, // Bouton de fermeture
      tapToDismiss: true, // Cliquer pour fermer
      preventDuplicates: true, // Éviter les doublons
      resetTimeoutOnDuplicate: true, // Reset le timer sur doublon

      // 📱 Options avancées
      newestOnTop: true, // Nouveau toast en haut
      maxOpened: 5, // Nombre max de toasts affichés
      autoDismiss: true, // Fermeture auto des anciens si maxOpened atteint

      // 🎭 Classe CSS personnalisée
      toastClass: 'ngx-toastr custom-toast', // Classe pour personnalisation

      // 🎬 Animations d'entrée/sortie
      easing: 'ease-in-out',

      // 📝 Messages
      enableHtml: true, // Permettre HTML dans les messages

      // 🖼️ Icônes
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
    }),
  ]
};
