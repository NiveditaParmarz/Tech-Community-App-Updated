import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question, QuestionRequest, SearchParams, SearchResponse } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = 'http://localhost:8080/api/questions';

  constructor(private http: HttpClient) {}

  postQuestion(request: QuestionRequest): Observable<Question> {
    return this.http.post<Question>(this.apiUrl, request);
  }

  getQuestionById(id: number): Observable<Question> {
    const url = `${this.apiUrl}/${id}`;
    console.log('QuestionService: getting question by ID:', id, 'URL:', url);
    return this.http.get<Question>(url);
  }

  searchQuestions(params: SearchParams): Observable<SearchResponse> {
    console.log('QuestionService: searching with params:', params);
    
    const queryParams = new URLSearchParams();
    
    if (params.text) queryParams.append('text', params.text);
    if (params.email) queryParams.append('email', params.email);
    if (params.tag) queryParams.append('tag', params.tag);
    if (params.date) queryParams.append('date', params.date);
    if (params.sort) queryParams.append('sort', params.sort);
    queryParams.append('page', (params.page || 0).toString());
    queryParams.append('size', (params.size || 5).toString());

    const url = `${this.apiUrl}/search?${queryParams}`;
    console.log('QuestionService: making request to:', url);

    return this.http.get<SearchResponse>(url);
  }

  getMyQuestions(email: string): Observable<SearchResponse> {
    return this.searchQuestions({ email });
  }
}
