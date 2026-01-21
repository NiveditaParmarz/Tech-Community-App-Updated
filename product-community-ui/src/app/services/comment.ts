import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, CommentRequest } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) {}

  addComment(request: CommentRequest): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, request);
  }

  likeComment(commentId: number): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${commentId}/like`, {});
  }

  getCommentsByQuestionId(questionId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/by-question?questionId=${questionId}`);
  }
}
