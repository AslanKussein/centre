import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./directives/auth.guard";
import {DemandCalculationComponent} from "./components/demand-calculation/demand-calculation.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./components/home/home.component";
import {PaymentDaysComponent} from "./components/payment-days/payment-days.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'calc', component: DemandCalculationComponent},
  {path: 'payment-days', component: PaymentDaysComponent},
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
