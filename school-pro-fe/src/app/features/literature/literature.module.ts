import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiteratureComponent } from './literature.component';
import { LiteratureRoutingModule } from './literature-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LiteratureComponent],
  imports: [
    CommonModule,
    LiteratureRoutingModule,
    SharedModule
  ]
})
export class LiteratureModule { }
