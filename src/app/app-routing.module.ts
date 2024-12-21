import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProjectHomeComponent } from './project-home/project-home.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'projects', component: ProjectHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
