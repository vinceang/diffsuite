import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  async openFileDialog(): Promise<string | null> {
    try {
      const selected = await open({
        multiple: false,
        filters: [{
          name: 'All Files',
          extensions: ['*']
        }]
      });
      return selected as string;
    } catch (error) {
      console.error('Error opening file dialog:', error);
      return null;
    }
  }

  async readFileContent(filePath: string): Promise<string> {
    try {
      return await invoke('read_file', { path: filePath });
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  }

  async compareFiles(file1Path: string, file2Path: string): Promise<{
    file1Content: string;
    file2Content: string;
  }> {
    try {
      const [file1Content, file2Content] = await Promise.all([
        this.readFileContent(file1Path),
        this.readFileContent(file2Path)
      ]);

      return { file1Content, file2Content };
    } catch (error) {
      console.error('Error comparing files:', error);
      throw error;
    }
  }

  getFileExtension(filePath: string): string {
    return filePath.split('.').pop()?.toLowerCase() || '';
  }
}
