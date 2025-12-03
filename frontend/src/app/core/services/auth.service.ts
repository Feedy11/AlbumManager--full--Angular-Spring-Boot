import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../shared/components/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL: string = 'http://localhost:8083/users';
  token!: string;

  public loggedUser: string | null = null;
  public isloggedIn: boolean = false;
  public roles: string[] | null = null;
  public regitredUser: User = new User();
  private helper = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient) { }
  registerUser(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(this.apiURL + '/register', user, { observe: 'response' });
  }

  setRegistredUser(user: User): void {
    this.regitredUser = user;
  }

  getRegistredUser(): User {
    return this.regitredUser;
  }

  validateEmail(code: string): Observable<User> {
    return this.http.get<User>(this.apiURL + '/verifyEmail/' + code);
  }
  login(user: User): Observable<HttpResponse<any>> {
    return this.http.post(this.apiURL + '/login', user, { observe: 'response' });
  }

  saveToken(jwt: string): void {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  decodeJWT(): void {
    if (this.token == undefined)
      return;

    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
    this.isloggedIn = true;
  }

  loadToken(): void {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.token = jwt;
      this.decodeJWT();
    }
  }

  getToken(): string {
    return this.token;
  }

  isAdmin(): Boolean {
    if (!this.roles)
      return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  logout(): void {
    this.loggedUser = null;
    this.roles = null;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
