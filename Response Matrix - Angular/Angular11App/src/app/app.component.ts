import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectionType: string = 'single';  

  onSelectionTypeChange(selectionType: string): void {
    this.selectionType = selectionType;
  }
}
