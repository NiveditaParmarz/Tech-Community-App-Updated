export interface Question {
  id: number;
  questionText: string;
  tags: string;
  createdBy: string;
  createdDate: string;
  commentsCount?: number;
  views?: number;
}

export interface QuestionRequest {
  questionText: string;
  tags: string;
  createdBy: string;
}

export interface SearchParams {
  text?: string;
  email?: string;
  tag?: string;
  date?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export interface SearchResponse {
  content: Question[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
