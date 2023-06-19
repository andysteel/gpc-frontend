export class Paginacao {
  constructor(
      public last?: boolean,
      public totalPages?: number,
      public totalElements?: number,
      public size?: number,
      public number?: number,
      public sort?: any,
      public first?: boolean,
      public numberOfElements?: number
  ) { }
}
