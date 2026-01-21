import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../services/question';
import { SearchParams } from '../../models/question.model';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'app-search',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class SearchComponent {
  searchForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      text: [''],
      email: [''],
      tag: [''],
      date: [''],
      size: [10]
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const searchParams: SearchParams = this.searchForm.value;
      
      // Navigate to search results with query parameters
      const queryParams: any = {};
      if (searchParams.text) queryParams.text = searchParams.text;
      if (searchParams.email) queryParams.email = searchParams.email;
      if (searchParams.tag) queryParams.tag = searchParams.tag;
      if (searchParams.date) queryParams.date = searchParams.date;
      if (searchParams.size) queryParams.size = searchParams.size;
      
      this.router.navigate(['/search-results'], { queryParams });
    }
  }

  resetForm(): void {
    this.searchForm.reset({
      text: '',
      email: '',
      tag: '',
      date: '',
      size: 10
    });
  }
}
