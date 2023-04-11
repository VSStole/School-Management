import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeComponent } from './grade.component';
const routes: Routes = [
  { path: 'grade', component: GradeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'grade' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeRoutingModule { }
