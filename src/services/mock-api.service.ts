import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { IPriceList } from 'src/shared/models';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  public mockData: IPriceList[] = [
    {
        priceListID: 111,
        priceListName: 'namenamename',
        extErpPriceListID: 2222,
    },
    {
        priceListID: 1112,
        priceListName: 'mynamenamename',
        extErpPriceListID: 223322,
    },
    {
        priceListID: 1113,
        priceListName: 'newnamenamename',
        extErpPriceListID: 223222,
    },
    {
        priceListID: 1114,
        priceListName: 'trnamenamename',
        extErpPriceListID: 225522,
    },
  ];

  public getPriceLists(): Observable<IPriceList[]> {
    return of(this.mockData);
  }

  public getPriceListsError(): Observable<IPriceList[]> {
    return of(this.mockData).pipe(
      map(() => {
        throw new Error('err');
      }),
      catchError((error: unknown) => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }

  public getPriceList(id: number): Observable<IPriceList> {
    const priceList: IPriceList | undefined = this.mockData.find((item: IPriceList) => item.priceListID === id);
    return priceList ? of(priceList) : throwError(() => new Error('err'));
  }
}
