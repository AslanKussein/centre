import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {NgxUiLoaderService} from "ngx-ui-loader";

@Injectable({
  providedIn: 'root'
})
export class PaymentDaysService {

  constructor(private configService: ConfigService,
              private ngxLoader: NgxUiLoaderService,
              private http: HttpClient) {
  }

  public getMaxPayMonth(): Observable<any> {
    return this.http.get(`${this.configService.apiUrl}/payment-days/getMaxPayMonth`, {})
      .pipe(
        tap(data => {
        }),
        catchError(PaymentDaysService.handleError)
      );
  }

  public getPaymentDays(date: any): Observable<any> {
    return this.http.post(`${this.configService.apiUrl}/payment-days/getPaymentDaysList`, {date: date})
      .pipe(
        tap(data => {
        }),
        catchError(PaymentDaysService.handleError)
      );
  }

  public sendGraphicToEnpf(date: any): Observable<any> {
    return this.http.post(`${this.configService.apiUrl}/payment-days/sendGraphicToEnpf`, {date})
      .pipe(
        tap(data => {
        }),
        catchError(PaymentDaysService.handleError)
      );
  }

  public deletePayDay(date: any): Observable<any> {
    return this.http.post(`${this.configService.apiUrl}/payment-days/deletePayDay`, {date})
      .pipe(
        tap(data => {
        }),
        catchError(PaymentDaysService.handleError)
      );
  }

  public lockUnlockPayDay(date: any): Observable<any> {
    return this.http.post(`${this.configService.apiUrl}/payment-days/lockUnlockPayDay`, {
      date: date,
      status: status,
    })
      .pipe(
        tap(data => {
        }),
        catchError(PaymentDaysService.handleError)
      );
  }

  public addNewPayDay(data: any): Observable<any> {
    return this.http.post(`${this.configService.apiUrl}/payment-days/addNewPayDay`, {
      payDay: data.payDayChoose,
      stageBegin: data.stageBegin,
      stageEnd: data.stageEnd
    })
      .pipe(
        tap(data => {
        }),
        catchError(PaymentDaysService.handleError)
      );
  }

  public changeLevel(data: any): Observable<any> {
    return this.http.post(`${this.configService.apiUrl}/payment-days/changeLevel`, {
      payDay: data.payDayChoose,
      stageBegin: data.stageBegin,
      stageEnd: data.stageEnd
    })
      .pipe(
        tap(data => {
        }),
        catchError(PaymentDaysService.handleError)
      );
  }

  private static handleError(error: HttpErrorResponse) {
    return throwError(
      error);
  }
}
