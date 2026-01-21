import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionService } from '../../services/question';
import { Question } from '../../models/question.model';
import { AuthService } from '../../services/auth';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  searchQuery = '';
  recentQuestions: Question[] = [];
  currentUser: any;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.loadRecentQuestions();
  }

  loadRecentQuestions(): void {
    this.questionService.searchQuestions({ page: 0, size: 5 }).subscribe({
      next: (response) => {
        this.recentQuestions = response.content;
      },
      error: (error) => {
        console.error('Error loading recent questions:', error);
      }
    });
  }

  performSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search-results'], { 
        queryParams: { text: this.searchQuery } 
      });
    }
  }

  goToSearch(): void {
    this.router.navigate(['/search']);
  }

  goToPostQuestion(): void {
    this.router.navigate(['/post-question']);
  }

  goToMyQuestions(): void {
    this.router.navigate(['/my-questions']);
  }

  viewQuestion(questionId: number): void {
    this.router.navigate(['/question', questionId]);
  }
}
