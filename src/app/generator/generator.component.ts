import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent {

  @Input() loading = false;
  form = this.fb.group({
    url: ['', Validators.required]
  });

  @Output() generateFile: EventEmitter<{
    url: string,
    fileType: string
  }> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  submit(fileType: 'image' | 'pdf' = 'pdf'): void {
    if (this.form.invalid) {
      return;
    }
    const { url } = this.form.value;
    this.generateFile.emit({
      url,
      fileType
    });
  }
}
