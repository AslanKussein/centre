import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private configService: ConfigService,
              private http: HttpClient) {
  }

  getPaymentTypes(): Observable<any> {
    return this.http.get<any>(`${this.configService.apiUrl}/dic/getPaymentTypes`, {}).pipe(
      tap(),
      catchError(DictionaryService.handleError)
    );
  }

  private static handleError(error: HttpErrorResponse) {
    return throwError(
      error);
  }
}
