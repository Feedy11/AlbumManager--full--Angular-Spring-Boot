import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/components/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [
    { username: "admin", password: "123", roles: ['ADMIN'] },
    { username: "fadi", password: "123", roles: ['USER'] }
  ];

  public loggedUser: string | null = null;
  public isloggedIn: boolean = false;
  public roles: string[] | null = null;

  constructor(private router: Router) { }
  SignIn(user: User): boolean {
    // Recherche l'utilisateur dans la liste
    const curUser = this.users.find(u =>
      u.username === user.username &&
      u.password === user.password
    );

    if (curUser) {
      // Utilisateur trouvé
      this.loggedUser = curUser.username;
      this.isloggedIn = true;
      this.roles = curUser.roles;

      // Sauvegarder dans localStorage (pour garder la connexion après refresh)
      localStorage.setItem('loggedUser', this.loggedUser);
      localStorage.setItem('isloggedIn', String(this.isloggedIn));

      return true;
    }

    return false;
  }

  isAdmin(): boolean {
    if (!this.roles) return false;
    return this.roles.indexOf('ADMIN') > -1;
  }
  logout(): void {
    this.isloggedIn = false;
    this.loggedUser = null;
    this.roles = null;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }
  setLoggedUserFromLocalStorage(login: string): void {
    this.loggedUser = login;
    this.isloggedIn = true;
    this.getUserRoles(login);
  }
  getUserRoles(username: string): void {
    const curUser = this.users.find(u => u.username === username);
    if (curUser) {
      this.roles = curUser.roles;
    }
  }
}
