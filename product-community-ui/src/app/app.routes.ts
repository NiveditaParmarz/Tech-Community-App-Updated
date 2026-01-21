import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { HomeComponent } from './components/home/home';
import { SearchComponent } from './components/search/search';
import { SearchResultsComponent } from './components/search-results/search-results';
import { PostQuestionComponent } from './components/post-question/post-question';
import { QuestionDetailsComponent } from './components/question-details/question-details';
import { MyQuestionsComponent } from './components/my-questions/my-questions';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'search', component: SearchComponent, canActivate: [authGuard] },
  { path: 'search-results', component: SearchResultsComponent, canActivate: [authGuard] },
  { path: 'post-question', component: PostQuestionComponent, canActivate: [authGuard] },
  { path: 'question/:id', component: QuestionDetailsComponent, canActivate: [authGuard] },
  { path: 'my-questions', component: MyQuestionsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
