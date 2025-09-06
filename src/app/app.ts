import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DiffViewerComponent } from './diff-viewer/diff-viewer';
import { FileService } from './services/file';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DiffViewerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('DiffSuite');
  
  constructor(private fileService: FileService) {}

  async selectFile1() {
    const filePath = await this.fileService.openFileDialog();
    if (filePath) {
      console.log('Selected file 1:', filePath);
      // TODO: Store file path and load content
    }
  }

  async selectFile2() {
    const filePath = await this.fileService.openFileDialog();
    if (filePath) {
      console.log('Selected file 2:', filePath);
      // TODO: Store file path and load content
    }
  }
}
