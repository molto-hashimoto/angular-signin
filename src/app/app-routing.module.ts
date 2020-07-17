import { TasksComponent } from './tasks/tasks.component';
import { ProjectsComponent } from './projects/projects.component';
import { SignupComponent } from './signup/signup.component';
import { LoggedinGuard } from './guards/loggedin.guard';
import { LoadingComponent } from './loading/loading.component';
import { AuthGuard } from './guards/auth.guard';
import { RoomComponent } from './room/room.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedinGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LoggedinGuard]
  },
  {
    path: 'loading',
    component: LoadingComponent,
    canActivate: [LoggedinGuard]
  },
  {
    path: 'room',
    component: RoomComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/:no',
    component: TasksComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
