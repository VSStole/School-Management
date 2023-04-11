import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
const routes: Routes = [
  { path: 'student', component: StudentComponent },
  { path: '', pathMatch: 'full', redirectTo: 'student' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
