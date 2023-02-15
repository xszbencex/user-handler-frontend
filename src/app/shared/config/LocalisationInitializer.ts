import { MatPaginatorIntl } from '@angular/material/paginator';

export class LocalisationInitializer {
  constructor() {}

  paginatorInitializer(): MatPaginatorIntl {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = 'Oldalankénti elemszám:';
    paginatorIntl.nextPageLabel = 'Következő oldal';
    paginatorIntl.previousPageLabel = 'Előző oldal';
    paginatorIntl.firstPageLabel = 'Első oldal';
    paginatorIntl.lastPageLabel = 'Utolsó oldal';
    paginatorIntl.getRangeLabel = LocalisationInitializer.getRangeLabel.bind(this);
    return paginatorIntl;
  }

  private static getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `${length}-ból`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} a ${length}-ból/ből`;
  }
}
