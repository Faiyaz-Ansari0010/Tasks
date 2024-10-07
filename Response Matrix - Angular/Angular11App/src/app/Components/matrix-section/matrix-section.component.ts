import { Component } from '@angular/core';

@Component({
  selector: 'app-matrix-section',
  templateUrl: './matrix-section.component.html',
  styleUrls: ['./matrix-section.component.scss']
})
export class MatrixSectionComponent {
  // Default columns and rows for the matrix
  columns: string[] = ['Column 1', 'Column 2', 'Column 3'];
  rows: string[] = ['Column 1', 'Row 2'];


}
