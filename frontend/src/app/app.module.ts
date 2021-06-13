import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {MdbModule} from 'mdb-angular-ui-kit';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER} from 'ngx-ui-loader';
import {ToastrModule} from 'ngx-toastr';
import {NotificationService} from "./service/notification.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./directives/auth.guard";
import {ExitDeactivate} from "./directives/exitDeactivate";
import {ErrorInterceptor} from "./directives/error.interceptor";
import {JwtInterceptor} from "./directives/jwt.interceptor";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ModalModule} from "ngx-bootstrap/modal";
import {DemandCalculationComponent} from './components/demand-calculation/demand-calculation.component';
import {HomeComponent} from './components/home/home.component';
import {PaymentDaysComponent} from './components/payment-days/payment-days.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {registerLocaleData} from "@angular/common";
import {defineLocale, ruLocale} from "ngx-bootstrap/chronos";
import localeRu from '@angular/common/locales/ru';
import localeKz from '@angular/common/locales/ru-KZ';

registerLocaleData(localeRu, localeKz);
defineLocale('ru', ruLocale);

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'indigo',
  bgsPosition: POSITION.centerCenter,
  bgsSize: 80,
  bgsType: SPINNER.threeStrings,
  fgsType: SPINNER.threeStrings,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5
};

export function HttpLoaderFactory(httpClient: any) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DemandCalculationComponent,
    HomeComponent,
    PaymentDaysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ExitDeactivate,
    AuthGuard,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
