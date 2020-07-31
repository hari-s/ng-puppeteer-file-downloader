import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenerateFileDto } from './interfaces';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ScreenshotService {

  constructor(private http: HttpClient) { }

  getFiles(): Observable<string[]> {
    return this.http.get<string[]>('/api/screenshot/files');
  }

  generateFile(url: string): Observable<GenerateFileDto> {
    return this.http.get<GenerateFileDto>(`/api/screenshot/generate?url=${url}`);
  }

  download(file) {
    return this.http.get(`/api/screenshot/download?file=${file}`, {
      responseType: 'blob'
    }).toPromise();
  }
}
