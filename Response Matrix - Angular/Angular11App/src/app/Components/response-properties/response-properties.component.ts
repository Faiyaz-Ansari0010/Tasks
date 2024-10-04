import { Component } from '@angular/core';

@Component({
  selector: 'app-response-properties',
  templateUrl: './response-properties.component.html',
  styleUrls: ['./response-properties.component.scss']
})
export class ResponsePropertiesComponent {
  selectionType: string = 'single';  // Default selection is Single
  singleOption: string = 'perRow';   // Default option for single selection
  maxResponses: number = 1;          // Default value for max responses
  maxResponsesOptions: number[] = Array.from({ length: 20 }, (_, i) => i + 1);  // Numbers 1 to 20

  // Function called when selection type changes
  onSelectionTypeChange() {
    if (this.selectionType === 'single') {
      this.maxResponses = 1;  // Reset max responses when switching back to 'Single'
    } else if (this.selectionType === 'multiple') {
      this.singleOption = ''; // Clear single selection when switching to 'Multiple'
    }
  }
}
