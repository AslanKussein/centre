import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemandCalculationComponent} from "./components/demand-calculation/demand-calculation.component";
import {HomeComponent} from "./components/home/home.component";
import {PaymentDaysComponent} from "./components/payment-days/payment-days.component";
import {Form7dComponent} from "./components/form7d/form7d.component";
import {AuthGuard} from "./directives/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'calc', component: DemandCalculationComponent, canActivate: [AuthGuard]},
  {path: 'payment-days', component: PaymentDaysComponent, canActivate: [AuthGuard]},
  {path: 'form7', component: Form7dComponent, canActivate: [AuthGuard]},
  // {path: 'systems', component: AddSystemComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
