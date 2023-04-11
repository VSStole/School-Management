import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeComponent } from './grade.component';
import { GradeRoutingModule } from './grade-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [GradeComponent],
  imports: [
    CommonModule,
    GradeRoutingModule,
    SharedModule
  ]
})
export class GradeModule { }
