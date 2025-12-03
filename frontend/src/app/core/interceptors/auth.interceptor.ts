import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

const exclude_array: string[] = ['/login', '/register', '/verifyEmail'];

function toExclude(url: string): boolean {
  const length = exclude_array.length;
  for (let i = 0; i < length; i++) {
    if (url.search(exclude_array[i]) !== -1) {
      return true;
    }
  }
  return false;
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Si l'URL doit être exclue (login, register, verifyEmail)
  if (!toExclude(req.url)) {
    let jwt = authService.getToken();

    if (jwt) {
      let reqWithToken = req.clone({
        setHeaders: { Authorization: "Bearer " + jwt }
      });

      console.log('🔑 Token ajouté à la requête');
      return next(reqWithToken);
    }
  }

  return next(req);
};
