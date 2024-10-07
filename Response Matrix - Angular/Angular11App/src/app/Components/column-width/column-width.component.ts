import { Component } from '@angular/core';

@Component({
  selector: 'app-column-width',
  templateUrl: './column-width.component.html',
  styleUrls: ['./column-width.component.scss']
})
export class ColumnWidthComponent {
  columnWidth: number | null = null; 

  constructor() { }

}
