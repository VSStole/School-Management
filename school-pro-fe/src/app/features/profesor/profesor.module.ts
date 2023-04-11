import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesorComponent } from './profesor.component';
import { ProfesorRoutingModule } from './profesor-routing.module';
 import { SharedModule } from 'src/app/shared/shared.module'; 
@NgModule({
  declarations: [ProfesorComponent],
  imports: [
    CommonModule,
    ProfesorRoutingModule,
    SharedModule
  ]
})
export class ProfesorModule { }
