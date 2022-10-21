import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { EditorComponent } from './components/editor/editor.component';
// route guard
import { AuthGuard } from './shared/guard/auth.guard';
//images
import { ImagesComponent } from './components/images/images.component';
import { ImageComponent } from './components/images/image/image.component';
import { ImageListComponent } from './components/images/image.list/image.list.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'editor', component: EditorComponent , canActivate: [AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  
  {
    path: 'image', component: ImagesComponent, canActivate: [AuthGuard], children: [
      { path: 'upload', component: ImageComponent , canActivate: [AuthGuard]},
      { path: 'list', component: ImageListComponent , canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
