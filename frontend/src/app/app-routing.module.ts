import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemandCalculationComponent} from "./components/demand-calculation/demand-calculation.component";
import {HomeComponent} from "./components/home/home.component";
import {PaymentDaysComponent} from "./components/payment-days/payment-days.component";
import {Form7dComponent} from "./components/form7d/form7d.component";
import {AuthGuard} from "./directives/auth.guard";
import {FormationPaymentsComponent} from "./components/formation-payments/formation-payments.component";
import {CalculationPregnancyComponent} from "./components/calculation-pregnancy/calculation-pregnancy.component";
import {ReportComponent} from "./components/report/report.component";
import {TableOrderComponent} from "./components/table-order/table-order.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'calc', component: DemandCalculationComponent, canActivate: [AuthGuard]},
  {path: 'payment-days', component: PaymentDaysComponent, canActivate: [AuthGuard]},
  {path: 'form7', component: Form7dComponent, canActivate: [AuthGuard]},
  {path: 'formationPayments', component: FormationPaymentsComponent, canActivate: [AuthGuard]},
  {path: 'calculationPregnancy', component: CalculationPregnancyComponent, canActivate: [AuthGuard]},
  {path: 'report', component: ReportComponent, canActivate: [AuthGuard]},
  {path: 'order', component: TableOrderComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
