import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent {

  @Input() files: string[] = [];

  @Output() fileClicked = new EventEmitter();

  clicked(file) {
    this.fileClicked.emit(file);
  }

}
