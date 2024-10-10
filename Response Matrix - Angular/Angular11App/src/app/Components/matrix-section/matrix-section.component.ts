import { Component } from '@angular/core';

@Component({
  selector: 'app-matrix-section',
  templateUrl: './matrix-section.component.html',
  styleUrls: ['./matrix-section.component.scss']
})
export class MatrixSectionComponent {
  columns: string[] = ['Column 1', 'Column 2', 'Column 3'];
  rows: string[] = ['Row 1', 'Row 2'];

  addColumn() {
    const newColumn = `Column ${this.columns.length + 1}`;
    this.columns.push(newColumn);
  }

  removeColumn() {
    if (this.columns.length > 3) {
      this.columns.pop();
    }
  }

  addRow() {
    const newRow = `Row ${this.rows.length + 1}`;
    this.rows.push(newRow);
  }

  removeRow() {
    if (this.rows.length > 2) {
      this.rows.pop();
    }
  }
}