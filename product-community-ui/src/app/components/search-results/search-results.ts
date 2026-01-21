import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../services/question';
import { Question, SearchParams, SearchResponse } from '../../models/question.model';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResultsComponent implements OnInit {
  searchResults: Question[] = [];
  totalResults = 0;
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  isLoading = false;
  errorMessage = '';
  searchParams: SearchParams = {};
  sortBy = 'newest'; // Add sort property

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private questionService: QuestionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchParams = {
        text: params['text'] || '',
        email: params['email'] || '',
        tag: params['tag'] || '',
        date: params['date'] || '',
        page: parseInt(params['page']) || 0,
        size: parseInt(params['size']) || 10,
        sort: params['sort'] || 'newest' // Add sort parameter
      };
      this.sortBy = this.searchParams.sort || 'newest';
      this.pageSize = this.searchParams.size || 10;
      this.currentPage = this.searchParams.page || 0;
      this.performSearch();
    });
  }

  performSearch(): void {
    console.log('Performing search with params:', this.searchParams);
    this.isLoading = true;
    this.errorMessage = '';
    
    this.questionService.searchQuestions(this.searchParams).subscribe({
      next: (response: SearchResponse) => {
        console.log('Search response:', response);
        this.searchResults = response.content;
        this.totalResults = response.totalElements;
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
        this.pageSize = response.size;
        this.isLoading = false;
        
        // Force change detection
        this.cdr.detectChanges();
        
        console.log('Updated state:', {
          isLoading: this.isLoading,
          resultsLength: this.searchResults.length,
          totalResults: this.totalResults
        });
      },
      error: (error) => {
        console.error('Search error:', error);
        this.errorMessage = 'Failed to load search results. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      const queryParams = { ...this.searchParams, page };
      this.router.navigate(['/search-results'], { queryParams });
    }
  }

  viewQuestion(questionId: number): void {
    this.router.navigate(['/question', questionId]);
  }

  onSortChange(event: any): void {
    this.sortBy = event.target.value;
    this.searchParams.sort = this.sortBy;
    this.searchParams.page = 0; // Reset to first page when sorting
    this.currentPage = 0;
    this.performSearch();
  }

  loadAllQuestions(): void {
    // Clear search parameters to get all questions
    this.searchParams = {
      page: 0,
      size: this.pageSize,
      sort: this.sortBy
    };
    this.currentPage = 0;
    this.performSearch();
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getSearchSummary(): string {
    const parts = [];
    if (this.searchParams.text) parts.push(`text: "${this.searchParams.text}"`);
    if (this.searchParams.email) parts.push(`email: ${this.searchParams.email}`);
    if (this.searchParams.tag) parts.push(`tag: ${this.searchParams.tag}`);
    if (this.searchParams.date) parts.push(`date: ${this.searchParams.date}`);
    
    return parts.length > 0 ? parts.join(', ') : 'All questions';
  }
}
