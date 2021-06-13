import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DemandCalcService {

  constructor(private configService: ConfigService,
              private http: HttpClient) {
  }

  public getCalcData(): Observable<any> {
    return this.http.post(`${this.configService.apiUrl}/calc/getCalcData`, {})
      .pipe(
        tap(data => {
        }),
        catchError(DemandCalcService.handleError)
      );
  }

  private static handleError(error: HttpErrorResponse) {
    if (error instanceof ErrorEvent) {
      console.error('An error occurred:', error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    return throwError(
      error);
  }
}
