import { Component } from '@angular/core';

@Component({
  selector: 'app-checkbox-matrix',
  templateUrl: './checkbox-matrix.component.html',
  styleUrls: ['./checkbox-matrix.component.scss']
})
export class CheckboxMatrixComponent {
  columns: string[] = ['', '100', '50', '20', '9', '7'];
  rows: string[] = ['', '159', '127', '129', '170'];

  addColumn() {
    const newColumn = `${''}`;
    this.columns.push(newColumn);
  }

  removeColumn() {
    if (this.columns.length > 3) {
      this.columns.pop();
    }
  }

  addRow() {
    const newRow = `${''}`;
    this.rows.push(newRow);
  }

  removeRow() {
    if (this.rows.length > 2) {
      this.rows.pop();
    }
  }
}
