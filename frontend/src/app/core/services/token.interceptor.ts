import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toExclude = "/login";

  // Tester s'il s'agit de login, on n'ajoute pas le header Authorization
  // puisqu'on n'a pas encore de JWT (il est null)
  if (req.url.search(toExclude) === -1) {
    let jwt = authService.getToken();

    // Si le token existe, l'ajouter à la requête
    if (jwt) {
      let reqWithToken = req.clone({
        setHeaders: { Authorization: "Bearer " + jwt }
      });

      console.log('🔑 Token ajouté à la requête:', jwt.substring(0, 20) + '...');
      return next(reqWithToken);
    }
  }

  return next(req);
};
