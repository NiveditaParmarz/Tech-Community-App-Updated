import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from '../../services/question';
import { AuthService } from '../../services/auth';
import { QuestionRequest } from '../../models/question.model';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-post-question',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './post-question.html',
  styleUrl: './post-question.css',
})
export class PostQuestionComponent implements OnInit {
  questionForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  currentUser: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private questionService: QuestionService,
    private authService: AuthService
  ) {
    this.questionForm = this.fb.group({
      questionText: ['', [Validators.required, Validators.minLength(20)]],
      tags: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
  }

  onSubmit(): void {
    if (this.questionForm.valid && this.currentUser) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const questionRequest: QuestionRequest = {
        questionText: this.questionForm.value.questionText,
        tags: this.questionForm.value.tags,
        createdBy: this.currentUser.email
      };

      this.questionService.postQuestion(questionRequest).subscribe({
        next: (response) => {
          this.successMessage = 'Question posted successfully!';
          this.isLoading = false;
          
          // Redirect to search results after a short delay
          setTimeout(() => {
            this.router.navigate(['/search-results']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error posting question:', error);
          this.errorMessage = 'Failed to post question. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/search-results']);
  }

  // Helper methods for form validation
  get questionText() {
    return this.questionForm.get('questionText');
  }

  get tags() {
    return this.questionForm.get('tags');
  }
}
