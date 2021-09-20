import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {ConfigService} from './config.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PregnancyService {

  constructor(private configService: ConfigService,
              private http: HttpClient) {
  }

  callProc(form: any): Observable<any> {
    return this.http.post<any>(`${this.configService.apiUrl}/pregn/runProc`, {
      dateTime: form?.value.dateTime,
      branch: form?.value.branch,
      level: form?.value.level,
      dicId: form?.value.dicId.value
    }).pipe(
      tap(),
      catchError(PregnancyService.handleError)
    );
  }

  private static handleError(error: HttpErrorResponse) {
    return throwError(
      error);
  }
}
