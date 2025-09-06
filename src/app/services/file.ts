import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { open } from '@tauri-apps/plugin-dialog';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  async openFileDialog(): Promise<string | null> {
    try {
      console.log('Opening file dialog...');
      
      const selected = await open({
        multiple: false,
        filters: [{
          name: 'Text Files',
          extensions: ['txt', 'js', 'ts', 'html', 'css', 'scss', 'json', 'md', 'xml', 'yaml', 'yml', 'py', 'java', 'c', 'cpp', 'h', 'hpp', 'php', 'rb', 'go', 'rs', 'swift', 'kt', 'dart', 'vue', 'jsx', 'tsx', 'less', 'sass', 'styl', 'coffee', 'sh', 'bat', 'ps1', 'sql', 'r', 'scala', 'clj', 'elm', 'fs', 'hs', 'lua', 'pl', 'pm', 'tcl', 'vb', 'cs', 'fsx', 'ml', 'pas', 'asm', 's', 'f90', 'f95', 'for', 'ada', 'vhd', 'v', 'sv', 'svh', 'vhdl']
        }, {
          name: 'All Files',
          extensions: []
        }]
      });
      console.log('File dialog result:', selected);
      return selected as string;
    } catch (error) {
      console.error('Error opening file dialog:', error);
      alert(`Error opening file dialog: ${error}`);
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
