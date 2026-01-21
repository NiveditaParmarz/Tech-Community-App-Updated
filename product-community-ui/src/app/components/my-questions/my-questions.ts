import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../services/question';
import { AuthService } from '../../services/auth';
import { Question } from '../../models/question.model';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-my-questions',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './my-questions.html',
  styleUrl: './my-questions.css',
})
export class MyQuestionsComponent implements OnInit {
  myQuestions: Question[] = [];
  isLoading = true;
  errorMessage = '';
  currentUser: any;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    // Use setTimeout to avoid SSR/hydration issues
    setTimeout(() => {
      this.loadMyQuestions();
    }, 100);
  }

  loadMyQuestions(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.questionService.getMyQuestions(this.currentUser.email).subscribe({
      next: (response) => {
        this.myQuestions = response.content;
        this.isLoading = false;
        
        // Force change detection
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading my questions:', error);
        this.errorMessage = 'Failed to load your questions. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  viewQuestion(questionId: number): void {
    this.router.navigate(['/question', questionId]);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  navigateToPostQuestion(): void {
    this.router.navigate(['/post-question']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getTagsArray(tags: string): string[] {
    return tags.split(',').map(tag => tag.trim());
  }
}
