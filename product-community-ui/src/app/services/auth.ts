import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequest, RegisterRequest, User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = typeof localStorage !== 'undefined' ? localStorage.getItem('currentUser') : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request).pipe(
      map(response => {
        // Handle JWT token response
        if (response && typeof response === 'object' && 'token' in response) {
          const user: User = {
            id: 0,
            name: request.name,
            email: request.email
          };
          
          // Store user and token
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('authToken', (response as any).token);
          }
          this.currentUserSubject.next(user);
        }
        return response;
      })
    );
  }

  login(request: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, request).pipe(
      map(response => {
        // Handle JWT token response
        if (response && typeof response === 'object' && 'token' in response) {
          const user: User = {
            id: 0,
            name: request.email.split('@')[0],
            email: request.email
          };
          
          // Store user and token
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('authToken', (response as any).token);
          }
          this.currentUserSubject.next(user);
        }
        return response;
      })
    );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getAuthToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }
}
