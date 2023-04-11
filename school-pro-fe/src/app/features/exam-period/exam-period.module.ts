import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExamPeriodRoutingModule } from './exam-period-routing.module';
import { ExamPeriodComponent } from './exam-period.component';

@NgModule({
  declarations: [ExamPeriodComponent],
  imports: [
    CommonModule,
    ExamPeriodRoutingModule,
    SharedModule
  ]
})
export class ExamPeriodModule { }
