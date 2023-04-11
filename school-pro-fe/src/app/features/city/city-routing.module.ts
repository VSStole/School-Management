import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city.component';

const routes: Routes = [  
  {path:'city',component:CityComponent},
  {path:'',pathMatch:'full',redirectTo:'city'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
