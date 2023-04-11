import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './core/services/auth-guard.service';
import { GradeComponent } from './features/grade/grade.component';



const appRoute: Routes = [
  // {path:'',component:HomeComponent},
  {
    path: 'home', component: HomeComponent//,canActivate:[AuthGuard] 
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },


  {
    path: 'city',
    loadChildren: () => import('./features/city/city.module').then(m => m.CityModule,)
  },
  {
    path: 'subject',
    loadChildren: () => import('./features/subject/subject.module').then(m => m.SubjectModule)
  },


  {
    path: 'profesor',
    loadChildren: () => import('./features/profesor/profesor.module').then(m => m.ProfesorModule)
  },

  {
    path: 'student',
    loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'exam',
    loadChildren: () => import('./features/exam/exam.module').then(m => m.ExamModule)
  },
  {
    path: 'exam-period',
    loadChildren: () => import('./features/exam-period/exam-period.module').then(m => m.ExamPeriodModule)
  },
  {
    path: 'grade',
    loadChildren: () => import('./features/grade/grade.module').then(m => m.GradeModule)
  },
  {
    path: 'literature',
    loadChildren: () => import('./features/literature/literature.module').then(m => m.LiteratureModule)
  },


  { path: '', pathMatch: 'full', redirectTo: '/login' },



];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoute)],
  declarations: [],
  exports: [RouterModule],

})
export class AppRoutingModule { }
