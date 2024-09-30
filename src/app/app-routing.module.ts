// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';

const routes: Routes = [
  { path: 'create', component: CreateTaskComponent },
  { path: 'list', component: ListTasksComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
