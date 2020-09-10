import { AuthenticationGuard } from './core/guards/authentication/authentication.guard';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'naves',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'naves',
        loadChildren: () => import('./views/naves/naves.module').then(m => m.NavesModule),
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'home',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthenticationGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
