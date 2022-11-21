import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, Observable, Subscription, tap } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { IPriceList } from '../../shared/models';

@Component({
  selector: 'app-detail-edit',
  templateUrl: './detail-edit.component.html',
  styleUrls: ['./detail-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailEditComponent implements OnInit, OnDestroy {
  public priceList$: Observable<IPriceList> | undefined;
  public isNameEditabel: boolean = false;
  public isIdEditabel: boolean = false;
  public nameError: boolean = false;
  public idError: boolean = false;

  public listForm!: FormGroup;

  private id: number;
  private priceListsSubscription$!: Subscription;
  private priceLists: IPriceList[] = [];


  constructor(private activeRoute: ActivatedRoute, private apiService: ApiService){
    this.id = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.priceList$ = this.apiService.getPriceList(Number(this.id));
    this.priceListsSubscription$ = this.apiService.priceLists$.subscribe((data: IPriceList[]) => {
      this.priceLists = data;
    });

    this.listForm = new FormGroup({
      listName: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[a-zA-Z]+'),
      ]),
      listId: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+'),
        this.idValidator.bind(this),
      ]),
    })
  }

  ngOnDestroy(): void {
    this.priceListsSubscription$.unsubscribe();
  }

  public editName(): void {
    this.isNameEditabel = !this.isNameEditabel;
    this.listForm.controls['listName'].reset();
  }

  public editId(): void {
    this.isIdEditabel = !this.isIdEditabel;
    this.listForm.controls['listId'].reset();
  }

  public saveName(priceList: IPriceList): void {
    const newPriceList: IPriceList = {
      priceListID: priceList.priceListID,
      priceListName: this.listForm.controls['listName'].value,
      extErpPriceListID: priceList.extErpPriceListID,
    };

    this.apiService.updatePriceList(newPriceList).pipe(
      tap(() => {
        this.nameError = false;
        this.isNameEditabel = false;
      }),
      catchError((err: { message: string }) => {
        this.nameError = true;
        console.error(err.message);
        return EMPTY;
      }),
    );
  }

  public saveId(priceList: IPriceList): void {
    const newPriceList: IPriceList = {
      priceListID: priceList.priceListID,
      priceListName: priceList.priceListName,
      extErpPriceListID: Number(this.listForm.controls['listId'].value),
    };
    this.apiService.updatePriceList(newPriceList).pipe(
      tap(() => {
        this.idError = false;
        this.isIdEditabel = false;
      }),
      catchError((err: { message: string }) => {
        this.idError = true;
        console.error(err.message);
        return EMPTY;
      }),
    );
  }

  private idValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value &&
      this.priceLists &&
      this.priceLists.some((item: IPriceList) => item.priceListID === Number(control.value))
    ) {
      return { listId: true };
    }
    return null;
  }
}
