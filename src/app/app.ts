import { Component, signal, ViewChild } from '@angular/core';
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
  @ViewChild(DiffViewerComponent) diffViewer!: DiffViewerComponent;
  
  protected readonly title = signal('DiffSuite');
  protected readonly file1Path = signal<string | null>(null);
  protected readonly file2Path = signal<string | null>(null);
  protected readonly file1Name = signal<string>('Select File 1');
  protected readonly file2Name = signal<string>('Select File 2');
  
  constructor(private fileService: FileService) {}

  async selectFile1() {
    try {
      console.log('selectFile1 clicked');
      const filePath = await this.fileService.openFileDialog();
      if (filePath) {
        this.file1Path.set(filePath);
        this.file1Name.set(this.getFileName(filePath));
        console.log('Selected file 1:', filePath);
        await this.compareFilesIfBothSelected();
      } else {
        console.log('No file selected for file1');
      }
    } catch (error) {
      console.error('Error selecting file 1:', error);
      alert(`Error selecting file 1: ${error}`);
    }
  }

  async selectFile2() {
    try {
      console.log('selectFile2 clicked');
      const filePath = await this.fileService.openFileDialog();
      if (filePath) {
        this.file2Path.set(filePath);
        this.file2Name.set(this.getFileName(filePath));
        console.log('Selected file 2:', filePath);
        await this.compareFilesIfBothSelected();
      } else {
        console.log('No file selected for file2');
      }
    } catch (error) {
      console.error('Error selecting file 2:', error);
      alert(`Error selecting file 2: ${error}`);
    }
  }

  private async compareFilesIfBothSelected() {
    const file1 = this.file1Path();
    const file2 = this.file2Path();
    
    if (file1 && file2) {
      try {
        const { file1Content, file2Content } = await this.fileService.compareFiles(file1, file2);
        const language = this.getLanguageFromExtension(file1);
        this.diffViewer.loadFiles(file1Content, file2Content, language);
      } catch (error) {
        console.error('Error comparing files:', error);
      }
    }
  }

  private getFileName(filePath: string): string {
    return filePath.split('/').pop() || filePath;
  }

  private getLanguageFromExtension(filePath: string): string {
    const ext = this.fileService.getFileExtension(filePath);
    const languageMap: { [key: string]: string } = {
      'js': 'javascript',
      'ts': 'javascript',
      'html': 'html',
      'css': 'css',
      'scss': 'css',
      'json': 'json'
    };
    return languageMap[ext] || 'text';
  }
}
