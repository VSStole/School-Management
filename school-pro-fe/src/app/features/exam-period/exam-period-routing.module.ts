import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamPeriodComponent } from './exam-period.component';
const routes: Routes = [
  {path:'exam-period',component:ExamPeriodComponent},
  {path:'',pathMatch:'full',redirectTo:'exam-period'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamPeriodRoutingModule { }
