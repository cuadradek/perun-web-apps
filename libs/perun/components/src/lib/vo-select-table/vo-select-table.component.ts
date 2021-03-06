import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Vo } from '@perun-web-apps/perun/openapi';
import { SelectionModel } from '@angular/cdk/collections';
import {
  customDataSourceFilterPredicate,
  customDataSourceSort,
  TABLE_ITEMS_COUNT_OPTIONS
} from '@perun-web-apps/perun/utils';
import { GuiAuthResolver } from '@perun-web-apps/perun/services';

@Component({
  selector: 'perun-web-apps-vo-select-table',
  templateUrl: './vo-select-table.component.html',
  styleUrls: ['./vo-select-table.component.scss']
})
export class VoSelectTableComponent implements OnChanges, AfterViewInit {

  constructor(private authResolver: GuiAuthResolver) { }

  @Input()
  vos: Vo[] = [];

  @Input()
  recentIds: number[];

  @Input()
  filterValue: string;

  @Input()
  selection: SelectionModel<Vo>;

  @Input()
  displayedColumns: string[] = [];

  @Input()
  pageSize = 10;

  @Input()
  disableRouting = false;

  @Input()
  pageSizeOptions = TABLE_ITEMS_COUNT_OPTIONS;

  @Output()
  page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @ViewChild(MatSort, { static: true }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSource();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private sort: MatSort;

  dataSource: MatTableDataSource<Vo>;
  exporting = false;

  ngOnChanges(changes: SimpleChanges) {
    if (!this.authResolver.isPerunAdmin()){
      this.displayedColumns = this.displayedColumns.filter(column => column !== 'id');
    }
    this.dataSource = new MatTableDataSource<Vo>(this.vos);
    this.setDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getDataForColumn(data: Vo, column: string, otherThis: VoSelectTableComponent): string{
    switch (column) {
      case 'id':
        return data.id.toString();
      case 'shortName':
        return data.shortName;
      case 'name':
       return data.name;
      case 'recent':
        if (otherThis.recentIds) {
          if (otherThis.recentIds.indexOf(data.id) > -1) {
            return '#'.repeat(otherThis.recentIds.indexOf(data.id));
          }
        }
        return data['name'];
      default:
        return data[column];
    }
  }

  setDataSource() {
    if (!!this.dataSource) {
      this.dataSource.filterPredicate = (data: Vo, filter: string) => {
       return customDataSourceFilterPredicate(data, filter, this.displayedColumns, this.getDataForColumn, this)
      };
      this.dataSource.sortData = (data: Vo[], sort: MatSort) => {
       return customDataSourceSort(data, sort, this.getDataForColumn, this);
      };
      this.dataSource.filter = this.filterValue;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  checkboxLabel(row?: Vo): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
