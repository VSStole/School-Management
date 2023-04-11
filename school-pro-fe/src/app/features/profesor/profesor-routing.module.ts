import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfesorComponent } from './profesor.component';


const routes: Routes = [
{path:'profesor',component:ProfesorComponent},
{path:'',pathMatch:'full',redirectTo:'profesor'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesorRoutingModule { }
