import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private configService: ConfigService,
              private http: HttpClient) {
  }

  getAllReportList(): Observable<any> {
    return this.http.get<any>(`${this.configService.apiUrl}/reports/getAllReportList`).pipe(
      tap(),
      catchError(ReportsService.handleError)
    );
  }

  private static handleError(error: HttpErrorResponse) {
    return throwError(
      error);
  }
}
