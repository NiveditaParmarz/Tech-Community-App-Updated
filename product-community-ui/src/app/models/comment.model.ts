export interface Comment {
  id: number;
  questionId: number;
  commentText: string;
  commentedBy: string;
  likes: number;
}

export interface CommentRequest {
  questionId: number;
  commentText: string;
  commentedBy: string;
}
