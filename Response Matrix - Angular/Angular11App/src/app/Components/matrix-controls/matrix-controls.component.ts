import { Component } from '@angular/core';

@Component({
  selector: 'app-matrix-controls',
  templateUrl: './matrix-controls.component.html',
  styleUrls: ['./matrix-controls.component.scss']
})
export class MatrixControlsComponent {
  isLocked: boolean = true;

  toggleLock() {
    this.isLocked = !this.isLocked; 
  }

  handleSaveClk(){
    alert("Document saved!")
  }
}
