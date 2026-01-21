import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from '../../services/question';
import { CommentService } from '../../services/comment';
import { AuthService } from '../../services/auth';
import { Question } from '../../models/question.model';
import { Comment, CommentRequest } from '../../models/comment.model';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-question-details',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './question-details.html',
  styleUrl: './question-details.css',
})
export class QuestionDetailsComponent implements OnInit {
  question: Question | null = null;
  comments: Comment[] = [];
  isLoading = true;
  errorMessage = '';
  commentForm: FormGroup;
  isSubmittingComment = false;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private commentService: CommentService,
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.commentForm = this.fb.group({
      commentText: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    console.log('QuestionDetailsComponent initialized');
    this.currentUser = this.authService.currentUserValue;
    const questionId = this.route.snapshot.paramMap.get('id');
    
    console.log('Question ID from route:', questionId);
    
    if (questionId) {
      const id = parseInt(questionId);
      console.log('Parsed question ID:', id);
      this.loadQuestionDetails(id);
      this.loadComments(id);
    } else {
      console.error('Question ID not found in route');
      this.errorMessage = 'Question ID not found';
    }
  }

  loadQuestionDetails(questionId: number): void {
    console.log('Loading question details for ID:', questionId);
    this.isLoading = true;
    
    this.questionService.getQuestionById(questionId).subscribe({
      next: (question) => {
        console.log('Question received:', question);
        console.log('Question type:', typeof question);
        console.log('Question keys:', question ? Object.keys(question) : 'null');
        console.log('isLoading before setting false:', this.isLoading);
        this.question = question;
        this.isLoading = false;
        console.log('isLoading after setting false:', this.isLoading);
        console.log('Final question object:', this.question);
        this.cdr.detectChanges(); // Force change detection
      },
      error: (error) => {
        console.error('Error loading question:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error error:', error.error);
        this.errorMessage = 'Failed to load question details';
        this.isLoading = false;
      }
    });
  }

  loadComments(questionId: number): void {
    console.log('Loading comments for question ID:', questionId);
    
    this.comments = []; // Start with empty comments
    
    this.commentService.getCommentsByQuestionId(questionId).subscribe({
      next: (comments) => {
        console.log('Comments loaded:', comments);
        this.comments = comments;
      },
      error: (error) => {
        console.log('Comments endpoint not available, using empty comments');
        this.comments = [];
      }
    });
  }

  onSubmitComment(): void {
    if (this.commentForm.valid && this.question && this.currentUser) {
      this.isSubmittingComment = true;
      
      const commentRequest: CommentRequest = {
        questionId: this.question.id,
        commentText: this.commentForm.value.commentText,
        commentedBy: this.currentUser.email
      };

      this.commentService.addComment(commentRequest).subscribe({
        next: (newComment) => {
          this.comments.push(newComment);
          this.commentForm.reset();
          this.isSubmittingComment = false;
        },
        error: (error) => {
          console.error('Error adding comment:', error);
          this.errorMessage = 'Failed to add comment';
          this.isSubmittingComment = false;
        }
      });
    }
  }

  likeComment(commentId: number): void {
    this.commentService.likeComment(commentId).subscribe({
      next: (updatedComment) => {
        const index = this.comments.findIndex(c => c.id === commentId);
        if (index !== -1) {
          this.comments[index] = updatedComment;
        }
      },
      error: (error) => {
        console.error('Error liking comment:', error);
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  goBack(): void {
    this.router.navigate(['/search-results']);
  }
}
