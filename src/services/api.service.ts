import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, Observable, ReplaySubject, retry, tap } from 'rxjs';

import { IPriceList } from '../shared/models';
import { RETRY } from '../shared/constats';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public priceLists$: ReplaySubject<IPriceList[]> = new ReplaySubject(1);
  public isError: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  public getPriceLists(searchTerm: string, ERPCompanyIds: number[]): Observable<IPriceList[]> {
    const url: string = `${URL}/someurl`;

    const params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('ERPCompanyIds', ERPCompanyIds.join());

    return this.http.get<IPriceList[]>(url, { params }).pipe(
      retry(RETRY),
      tap((data: IPriceList[]) => {
        this.priceLists$.next(data);
        this.isError.next(false);
      }),
      catchError((error: unknown) => {
        console.error(error);
        this.isError.next(true);
        return EMPTY;
      }),
    );
  }

  // I assume that there is a method on a backend side that gives an PriceList object by id
  // in order to get actual data
  public getPriceList(id: number): Observable<IPriceList> {
    const url: string = `${URL}/someurl`;
    const params = new HttpParams().set('priceListID', id)

    return this.http.get<IPriceList>(url, { params }).pipe(
      retry(RETRY),
      catchError((error: unknown) => {
        console.error(error);
        return EMPTY;
      }),
    );
  }

  public updatePriceList(priceList: IPriceList) {
    const url: string = `${URL}/someurl`;
    const body: unknown = priceList;

    return this.http.post<IPriceList>(url, body);
  }
}
