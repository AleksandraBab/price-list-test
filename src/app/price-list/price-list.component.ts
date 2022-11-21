import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, mergeMap, Observable, Subject, Subscription } from 'rxjs';
import { ApiService } from 'src/services/api.service';
import { ErpLogisticSiteService } from 'src/services/erp-logistic-site.service';
import { IPriceList } from 'src/shared/models';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit, OnDestroy {
  public priceLists$: Observable<IPriceList[]> = this.apiService.priceLists$;
  public isError$: Observable<boolean> = this.apiService.isError;

  public serchTerm: string = '';

  private erpSubscription$!: Subscription;
  private subscription!: Subscription;
  private erpIds: number[] = [];
  private searchTextChanged = new Subject<string>();

  constructor(private apiService: ApiService, private router: Router, private erpLogisticSiteService: ErpLogisticSiteService) {}

  ngOnInit(): void {
    // I assume that erpService returns a BehaviourSebject so I get a value by subscribing
    this.erpSubscription$ = this.erpLogisticSiteService.getErps().subscribe((data: number[]) => {
      this.apiService.getPriceLists(this.serchTerm, data);
      this.erpIds = data;
    });

    this.subscription = this.searchTextChanged.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      mergeMap((search: string) => this.apiService.getPriceLists(search, this.erpIds)),
    ).subscribe(() => { });
  }

  ngOnDestroy(): void {
    this.erpSubscription$.unsubscribe();
    this.subscription.unsubscribe();
  }

  public onItemClick(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  public onSearchTermChange(value: string): void {
    this.searchTextChanged.next(value);
  }
}
