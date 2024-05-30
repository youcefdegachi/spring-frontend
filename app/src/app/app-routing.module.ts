import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterProductComponent } from './product/register-product/register-product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { LandingComponent } from './product/landing/landing.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ProfileComponent } from './auth/profile/profile.component';

const routes: Routes = [
  //auth
  { path: 'signin', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent },

  // product
  { path: 'register', component: RegisterProductComponent },
  { path: '', component: LandingComponent },
  {path: 'product/:art_id', component: ProductDetailsComponent},


  //error 
  // { path: '**', component: LandingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
