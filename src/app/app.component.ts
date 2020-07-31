import { Component, OnInit } from '@angular/core';
import { ScreenshotService } from './screenshot.service';
import { Observable, of } from 'rxjs';
import { GenerateFileDto } from './interfaces';
import { switchMap, concatMap } from 'rxjs/operators';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  files = [];
  loading = false;
  constructor(private screenShotService: ScreenshotService) { }

  ngOnInit() {
    this.getFiles();
  }

  getFiles() {
    this.loading = true;
    this.screenShotService.getFiles().subscribe(files => {
      this.files = files;
      this.loading = false;
    });
  }

  generateFile({ url }) {
    this.loading = true;
    this.screenShotService.generateFile(url).subscribe(() => {
      this.getFiles();
      this.loading = false;
    });
  }

  fileClicked(file) {
    this.loading = true;
    this.screenShotService.download(file).then(blob => {
      this.loading = false;
      saveAs(blob, file);
    })
  }
}
