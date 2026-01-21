import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log('Login form submitted');
    console.log('Form valid:', this.loginForm.valid);
    console.log('Form values:', this.loginForm.value);
    
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login error:', error);
          console.error('Error error type:', typeof error.error);
          console.error('Error error value:', error.error);
          console.error('Error error keys:', error.error ? Object.keys(error.error) : 'No error.error');
          this.isLoading = false;
          
          // Parse error message from backend
          let errorMessage = 'Login failed. Please try again.';
          
          // Handle different error response formats
          if (error.error) {
            if (typeof error.error === 'string') {
              try {
                const errorObj = JSON.parse(error.error);
                errorMessage = errorObj.error || errorMessage;
              } catch (e) {
                // If JSON parsing fails, the string itself might be the error
                errorMessage = error.error;
              }
            } else if (typeof error.error === 'object') {
              errorMessage = error.error.error || errorMessage;
            }
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          console.error('Final error message:', errorMessage);
          this.errorMessage = errorMessage;
          this.cdr.detectChanges(); // Force UI update
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
