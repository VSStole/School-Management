import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiteratureComponent } from './literature.component';

const routes: Routes = [
  {path:'literature',component:LiteratureComponent},
  { path: '', pathMatch: 'full', redirectTo: 'literature' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiteratureRoutingModule { }
